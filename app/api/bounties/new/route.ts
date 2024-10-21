import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { verifyEvent } from 'nostr-tools';

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

        // Proceed with your logic if the event is valid
        return NextResponse.json({ status: 'success' });
    } catch (error) {
        console.error('Error in /api/bounties/new:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
