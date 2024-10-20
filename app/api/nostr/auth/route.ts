import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { npub } = await request.json();

        let user = await prisma.user.findUnique({
            where: { npub },
        });

        if (user) {
            // User exists, return user data
            return NextResponse.json(user);
        } else {
            // User does not exist, create a new user
            user = await prisma.user.create({
                data: { npub },
            });
            return NextResponse.json(user);
        }
    } catch (error) {
        console.error('Error in /api/nostr/auth:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
