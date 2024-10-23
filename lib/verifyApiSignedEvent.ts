import { NextResponse } from 'next/server';
import { verifyEvent } from 'nostr-tools';

export async function verifySignedEvent(authHeader: string|null, expectedMethod: string, expectedUri: string) {
    if (!authHeader || !authHeader.startsWith('Nostr ')) {
        return { error: 'Invalid Authorization header format', status: 401 };
    }

    const base64String = authHeader.slice(6); // Remove 'Nostr ' prefix
    let decodedString;
    let signedEvent;

    try {
        decodedString = atob(base64String);
        signedEvent = JSON.parse(decodedString);
    } catch (error) {
        console.log(error);
        return { error: 'Invalid Base64 or JSON format', status: 400 };
    }

    const isValid = verifyEvent(signedEvent);

    if (!isValid) {
        return { error: 'Invalid signed event', status: 401 };
    }

    // Additional checks
    const currentTime = Math.floor(Date.now() / 1000);
    const tenSecondsAgo = currentTime - 10;

    const hasUTag = signedEvent.tags.some((tag: [string, string]) => tag[0] === 'u' && tag[1] === expectedUri);
    const hasMethodTag = signedEvent.tags.some((tag: [string, string]) => tag[0] === 'method' && tag[1] === expectedMethod);

    if (
        !hasUTag ||
        !hasMethodTag ||
        signedEvent.kind !== 27235 ||
        signedEvent.content !== '' ||
        signedEvent.created_at < tenSecondsAgo
    ) {
        return { error: 'Invalid event data', status: 400 };
    }

    return { success: true, signedEvent };
}