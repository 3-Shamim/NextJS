"use client"

import {useEffect, useState} from "react";
import axios from "axios";
import {deleteCookie, getCookie, setCookie} from 'cookies-next';
import {useSessionContext} from "@/contexts/SessionContextProvider";
import Link from "next/link";

const Page = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const {accessToken} = useSessionContext();

    useEffect(() => {

        const getAllUser = async () => {

            try {
                setLoading(true);
                const res = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsers(res.data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }

        }

        getAllUser();

    }, []);

    console.log(getCookie("Auth"))

    return (
        <div>
            CSR
            <br/>
            <br/>
            {accessToken}
            <button onClick={() => setCookie("Auth", "123")}>Set Cookies</button>
            <button onClick={() => deleteCookie("Auth")}>clear Cookies</button>

            <br/>
            <br/>

            <Link
                href="/ssr"
            >
                SSR
            </Link>

            <br/>
            <br/>

            {
                loading && <div>Loading...</div>
            }

            {
                users.map(u => (
                    <div key={u.id}>
                        <p>{u.id}</p>
                        <p>{u.name}</p>
                    </div>
                ))
            }

        </div>
    );
};

export default Page;