"use client";

import {useSessionContext} from "@/contexts/SessionContextProvider";
import axios from "@/lib/axios";
import {redirect} from "next/navigation";

export const useRefreshToken = () => {

    const {refreshToken, setToken} = useSessionContext();

    return async () => {

        try {

            const res = await axios.post("/auth/refresh", {
                refresh: refreshToken,
            });

            setToken(res.data);

        } catch (e) {
            redirect("/")
        }

    };
};
