

import { prisma } from '@/lib/prisma';
import NewUser from "@/components/NewUser"

export default async function UsersPage() {
  const users = await prisma.user.findMany();

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name ?? 'No Name'} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
