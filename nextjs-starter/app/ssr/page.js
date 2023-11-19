import React from 'react';
import axios from "axios";

const Page = async () => {

    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    const users = res.data;

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