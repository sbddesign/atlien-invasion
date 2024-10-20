"use client";
import { useEffect } from 'react';
import { nip19 } from 'nostr-tools';
import { sign } from 'crypto';

// // Add this declaration at the top of your file or in a separate declaration file
// declare global {
//     interface Window {
//         nostr?: {
//             getPublicKey: () => Promise<string>;
//             signEvent: (event: any) => Promise<any>;
//         };
//     }
// }

export default function NostrAuth() {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.nostr) {

            const nostr = window.nostr;

            let authEvent = {
                kind: 27235,
                created_at: Math.floor(Date.now() / 1000),
                tags: [
                    ["u", "https://atliens.atlbitlab.com"],
                    ["method", "GET"]
                ],
                content: '',
            }


            let signedEvent = nostr.signEvent(authEvent);

            console.log(signedEvent);

            window.nostr.getPublicKey().then(async (publicKey) => {
                console.log(publicKey);
                const npub = nip19.npubEncode(publicKey);
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
