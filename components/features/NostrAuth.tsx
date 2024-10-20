"use client";
import { useEffect } from 'react';
import { nip19 } from 'nostr-tools';

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
            window.nostr.getPublicKey().then(async (publicKey) => {
                console.log(publicKey);
                let npub = nip19.npubEncode(publicKey);
                console.log(npub);

                // Make a POST request to /api/nostr/auth
                try {
                    const response = await fetch('/api/nostr/auth', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ npub }),
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        console.log('User data:', userData);
                    } else {
                        console.error('Error fetching user data:', response.statusText);
                    }
                } catch (error) {
                    console.error('Error during authentication:', error);
                }
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
