"use client";

import { useState, useEffect } from "react";

export default function UsersList() {
    const [users, setUsers] = useState<{ id: number; email: string; name: string | null; createdAt: Date; }[]>([]);

    const fetchUsers = async () => {
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            setUsers(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return(
        <div>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                    {user.name ?? 'No Name'} - {user.email}
                    </li>
                ))}
            </ul>
        </div>
    )
}
