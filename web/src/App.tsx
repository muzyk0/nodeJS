import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import "./App.css";

const instance = axios.create({
    baseURL: "http://localhost:3001/",
});

const api = {
    getUser(): Promise<AxiosResponse<Users[]>> {
        return instance.get<Users[]>("users");
    },
    createUser(): Promise<AxiosResponse<Users[]>> {
        return instance.post<Users[]>("users");
    },
};

interface Users {
    id: number;
    name: string;
}

function App() {
    const [users, setUsers] = React.useState<Users[]>([]);

    const getUsers = () => {
        api.getUser().then((res) => {
            setUsers(res.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const createUser = () => {
        api.createUser().then((res) => {
            getUsers();
        });
    };

    return (
        <div>
            <div>
                <button onClick={createUser}>Create User</button>
            </div>
            {users.map((u) => (
                <div>{u.name}</div>
            ))}
        </div>
    );
}

export default App;
