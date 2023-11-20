import React from 'react';
import axios from "axios";
import getAllUsers from "@/app/lib/getAllUsers";

const Page = async () => {

    const userReq = getAllUsers();
    const users = await userReq;

    return (
        <div>
            SSR

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