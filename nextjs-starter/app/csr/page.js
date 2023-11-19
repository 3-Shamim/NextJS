"use client"

import {useEffect, useState} from "react";
import axios from "axios";

const Page = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {

        const getAllUser = async () => {

            try {
                setLoading(true);
                const res  = await axios.get("https://jsonplaceholder.typicode.com/users");
                setUsers(res.data);
                setLoading(false);
            } catch (e) {
                setLoading(false);
            }

        }

        getAllUser();

    }, []);

    return (
        <div>
            CSR

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