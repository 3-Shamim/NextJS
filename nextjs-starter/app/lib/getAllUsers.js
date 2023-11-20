import axios from "axios";
import {notFound} from "next/navigation";

const GetAllUsers = async () => {

    // notFound();

    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    // const res = await axios.get("http://localhost:8080");

    if (res == null || res.status !== 200) {
        throw new Error("Can not fetch user data");
    }

    return res.data;
};

export default GetAllUsers;