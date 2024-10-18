import {prisma} from "@/lib/prisma";

interface RequestBody {
  email: string;
}

export async function POST({email}: RequestBody) {
  try {
    await prisma.user.create({
      data: { email },
    });
    return Response.json({status: 'success'});
  } catch (error) {
    console.error('error: ', error)
    return Response.json({status: 'error'});
  }
}
