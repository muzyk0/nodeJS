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
    createUser(name: string): Promise<AxiosResponse<Users[]>> {
        return instance.post<Users[]>("users", { name });
    },
};

interface Users {
    id: number;
    name: string;
}

function App() {
    const [users, setUsers] = React.useState<Users[]>([]);
    const userName = React.useRef<HTMLInputElement>(null);

    const getUsers = () => {
        api.getUser().then((res) => {
            setUsers(res.data);
        });
    };

    useEffect(() => {
        getUsers();
    }, []);

    const createUser = () => {
        if (userName.current) {
            api.createUser(userName.current.value).then((res) => {
                getUsers();
            });
        }
    };

    return (
        <div>
            <input type="text" ref={userName} />
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
