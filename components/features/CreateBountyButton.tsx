"use client";

import { useState } from 'react';

export default function CreateBountyButton() {
    const [responseMessage, setResponseMessage] = useState('');
    const [coordinates, setCoordinates] = useState('');
    const [ecash, setEcash] = useState('');

    const createBounty = async () => {
        try {
            const authEvent = {
                kind: 27235,
                created_at: Math.floor(Date.now() / 1000),
                tags: [
                    ["u", `https://atliens.atlbitlab.com/api/bounties/new`],
                    ["method", "POST"]
                ],
                content: '',
            };
        
            console.log(authEvent);
        
            const signedAuthEvent = await window.nostr?.signEvent(authEvent);

            if (signedAuthEvent) {
                const signedAuthEventBase64 = btoa(JSON.stringify(signedAuthEvent));
                console.log(signedAuthEventBase64);

                const response = await fetch('/api/bounties/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Nostr ${signedAuthEventBase64}`, // Use Base64 encoded event
                    },
                    body: JSON.stringify({ coordinates, ecash }),
                });

                if (response.ok) {
                    const data = await response.json();
                    setResponseMessage('Bounty created successfully!');
                    console.log('Success:', data);
                } else {
                    setResponseMessage('Failed to create bounty.');
                    console.error('Error:', response.statusText);
                }
            } else {
                setResponseMessage('Failed to sign event.');
                console.error('Error: signedAuthEvent is undefined');
            }
        } catch (error) {
            setResponseMessage('An error occurred.');
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                placeholder="Enter coordinates (e.g., @33.759752,-84.364879)"
                required
            />
            <input
                type="text"
                value={ecash}
                onChange={(e) => setEcash(e.target.value)}
                placeholder="Enter ecash (optional)"
            />
            <button onClick={createBounty}>Create Bounty</button>
            {responseMessage && <p>{responseMessage}</p>}
        </div>
    );
}
