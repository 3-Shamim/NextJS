import React from 'react';
import getAllUsers from "@/lib/getAllUsers";
import {cookies} from "next/headers";
import Link from "next/link";

const Page = async () => {

    const userReq = getAllUsers();
    const users = await userReq;

    const authCookies = cookies().get("Auth");

    return (
        <div>
            SSR
            <br/>
            <div>{JSON.stringify(authCookies)}</div>
            <button>
                Change cookies
            </button>
            <br/>
            <br/>
            <Link
                href="/csr"
            >
                CSR
            </Link>
            <br/>
            <br/>
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