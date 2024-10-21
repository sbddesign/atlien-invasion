import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { verifyEvent } from 'nostr-tools';
import { nip19 } from 'nostr-tools';

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');

        if (!authHeader || !authHeader.startsWith('Nostr ')) {
            return NextResponse.json({ error: 'Invalid Authorization header format' }, { status: 401 });
        }

        const base64String = authHeader.slice(6); // Remove 'Nostr ' prefix
        let decodedString;
        let signedEvent;

        try {
            decodedString = atob(base64String);
            signedEvent = JSON.parse(decodedString);
        } catch (error) {
            console.log(error);
            return NextResponse.json({ error: 'Invalid Base64 or JSON format' }, { status: 400 });
        }

        const isValid = verifyEvent(signedEvent);

        if (!isValid) {
            return NextResponse.json({ error: 'Invalid signed event' }, { status: 401 });
        }

        // Additional checks
        const currentTime = Math.floor(Date.now() / 1000);
        const tenSecondsAgo = currentTime - 10;

        const hasUTag = signedEvent.tags.some((tag: [string, string]) => tag[0] === 'u' && tag[1] === 'https://atliens.atlbitlab.com/api/bounties/new');
        const hasMethodTag = signedEvent.tags.some((tag: [string, string]) => tag[0] === 'method' && tag[1] === 'POST');

        if (
            !hasUTag ||
            !hasMethodTag ||
            signedEvent.kind !== 27235 ||
            signedEvent.content !== '' ||
            signedEvent.created_at < tenSecondsAgo
        ) {
            return NextResponse.json({ error: 'Invalid event data' }, { status: 400 });
        }

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
