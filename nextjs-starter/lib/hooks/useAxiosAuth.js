"use client";

import {useEffect} from "react";
import {useRefreshToken} from "./useRefreshToken";
import {axiosAuth} from "../axios";
import {getCookie} from "cookies-next";
import {useSessionContext} from "@/contexts/SessionContextProvider";

const useAxiosAuth = () => {

    const {accessToken} = useSessionContext();

    const refreshToken = useRefreshToken();

    useEffect(() => {

        const requestIntercept = axiosAuth.interceptors.request.use((config) => {

                if (!config.headers["Authorization"]) {
                    config.headers["Authorization"] = `Bearer ${getCookie("Token")}`;
                }

                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosAuth.interceptors.response.use((response) => {

                return response;
            },
            async (error) => {

                const prevRequest = error?.config;

                if (error?.response?.status === 401 && !prevRequest?.sent) {

                    prevRequest.sent = true;
                    await refreshToken();
                    prevRequest.headers["Authorization"] = `Bearer ${accessToken}`;

                    return axiosAuth(prevRequest);
                }

                return Promise.reject(error);
            }
        );

        return () => {
            axiosAuth.interceptors.request.eject(requestIntercept);
            axiosAuth.interceptors.response.eject(responseIntercept);
        };
    }, [accessToken, refreshToken]);

    return axiosAuth;
};

export default useAxiosAuth;
