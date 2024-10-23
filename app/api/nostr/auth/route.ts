import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifySignedEvent } from '@/lib/verifyApiSignedEvent';
import { nip19 } from 'nostr-tools';

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');

        console.log(authHeader);
        const verificationResult = await verifySignedEvent(authHeader, 'POST', 'https://atliens.atlbitlab.com/api/nostr/auth');

        if (verificationResult.error) {
            return NextResponse.json({ error: verificationResult.error }, { status: verificationResult.status });
        }

        const signedEvent = verificationResult.signedEvent;

        const npub = nip19.npubEncode(signedEvent.pubkey);

        const prisma = new PrismaClient();

        // Check if user exists or create a new one
        let user = await prisma.user.findUnique({
            where: { npub },
        });

        if (!user) {
            console.log('no user found');
            user = await prisma.user.create({
                data: { npub },
            });
        }

        return NextResponse.json({ status: 'success' });
    } catch (error) {
        console.error('Error in /api/nostr/auth:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
