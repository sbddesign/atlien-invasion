import {prisma} from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return Response.json(users);
  } catch (error) {
    const noUsers = { error: 'Error fetching users' };
    return Response.json(noUsers);
  }
}