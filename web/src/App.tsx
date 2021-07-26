import axios, { AxiosResponse } from "axios";
import React, { useEffect } from "react";
import "./App.css";

const instance = axios.create({
    baseURL: "http://localhost:3001/",
});

const api = {
    getUser(): Promise<AxiosResponse<Users[]>> {
        return instance.get<Users[]>(`users${window.location.search}`);
    },
    createUser(name: string): Promise<AxiosResponse<Users[]>> {
        return instance.post<Users[]>("users", { name });
    },
    updateUser(id: string, name: string): Promise<AxiosResponse<Users[]>> {
        return instance.put<Users[]>("users", { id, name });
    },
    deleteUser(id: string): Promise<AxiosResponse<Users[]>> {
        return instance.delete<Users[]>(`users/${id}`);
    },
};

interface Users {
    _id: string;
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
    const deleteUser = (id: string) => {
        api.deleteUser(id).then((res) => {
            getUsers();
        });
    };
    const updateUser = (id: string, name: string) => {
        api.updateUser(id, name).then((res) => {
            getUsers();
        });
    };

    return (
        <div>
            <input type="text" ref={userName} />
            <div>
                <button onClick={createUser}>Create User</button>
            </div>
            {users.map((u) => (
                <div>
                    <input
                        defaultValue={u.name}
                        onBlur={(e) => {
                            updateUser(u._id, e.currentTarget.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            deleteUser(u._id);
                        }}
                    >
                        X
                    </button>
                </div>
            ))}
        </div>
    );
}

export default App;
