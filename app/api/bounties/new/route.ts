import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { nip19 } from 'nostr-tools';
import { verifySignedEvent } from '@/lib/verifyApiSignedEvent';

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        const verificationResult = await verifySignedEvent(authHeader, 'POST', 'https://atliens.atlbitlab.com/api/bounties/new');

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

        // Parse request body for bounty details
        const { coordinates, ecash } = await request.json();

        // Create a new bounty
        const bounty = await prisma.bounty.create({
            data: {
                authorId: user.id,
                amount: 0, // Set amount to 0 for now
                ecash,
                coordinates,
                active: true,
            },
        });

        return NextResponse.json({ status: 'success', bounty });
    } catch (error) {
        console.error('Error in /api/bounties/new:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
