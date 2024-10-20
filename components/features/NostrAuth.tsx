"use client";
import { useEffect } from 'react';

// Add this declaration at the top of your file or in a separate declaration file
declare global {
    interface Window {
        nostr?: {
            getPublicKey: () => Promise<string>;
        };
    }
}

export default function NostrAuth() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.nostr) {
            window.nostr.getPublicKey().then((publicKey) => {
                console.log(publicKey);
            }).catch((error) => {
                console.error('Error getting public key:', error);
            });
        } else {
            console.log('window.nostr is not available');
        }
    }, []);

    return (
        <>
            Nostr Login
        </>
    );
}
