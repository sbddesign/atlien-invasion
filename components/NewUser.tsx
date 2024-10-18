

"use client";

import { prisma } from '@/lib/prisma';

export default function UsersPage() {
  const createUser = () => {
    prisma.user.create({data: { email: 'stephen@d.elor.me' }});
  }

  return (
    <div>
      <button onClick={createUser}>New User</button>
      </div>
    )
}