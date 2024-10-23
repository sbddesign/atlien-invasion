"use client";
import { useState, useEffect } from 'react';
import { EventTemplate, nip19 } from 'nostr-tools';

export default function NostrAuth() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check local storage for npub to determine login status
        const npub = localStorage.getItem('atl_user_npub');
        setIsLoggedIn(!!npub);
    }, []);

    const nostrAuth = async () => {
        if (typeof window !== 'undefined' && window.nostr) {
            const nostr = window.nostr;

            const authEvent: EventTemplate = {
                kind: 27235,
                created_at: Math.floor(Date.now() / 1000),
                tags: [
                    ["u", "https://atliens.atlbitlab.com/api/nostr/auth"],
                    ["method", "POST"]
                ],
                content: '',
            };

            try {
                const signedEvent = await nostr.signEvent(authEvent);
                const signedEventBase64 = btoa(JSON.stringify(signedEvent));

                const response = await fetch('/api/nostr/auth', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Nostr ${signedEventBase64}`,
                    },
                    body: '',
                });

                if (response.ok) {
                    const userData = await response.json();
                    console.log('User data:', userData);
                    localStorage.setItem('atl_user_npub', nip19.npubEncode(signedEvent.pubkey));
                    setIsLoggedIn(true); // Update login status
                } else {
                    console.error('Error fetching user data:', response.statusText);
                    logout();
                }
            } catch (error) {
                console.error('Error during authentication:', error);
                logout();
            }
        } else {
            console.log('Can\'t find Nost browser extension');
            logout();
        }
    };

    const logout = () => {
        localStorage.removeItem('atl_user_npub');
        setIsLoggedIn(false); // Update login status
        console.log('Logged out');
    };

    return (
        <div>
            <button onClick={nostrAuth}>Login</button>
            <button onClick={logout}>Logout</button>
            <p>{isLoggedIn ? 'Logged in' : 'Logged out'}</p> {/* Display login status */}
        </div>
    );
}
