"use client";

import { useState } from 'react';
import Input from '../Input';
import Button from '../Button';
import { useWallet } from '@/contexts/WalletContext';

function getRandomCoordinates(): string {
  const randomLatitude = (Math.random() * 180 - 90).toFixed(6); // Latitude between -90 and 90
  const randomLongitude = (Math.random() * 360 - 180).toFixed(6); // Longitude between -180 and 180
  return `@${randomLatitude},${randomLongitude}`;
}

export default function CreateBountyUI() {
    const [responseMessage, setResponseMessage] = useState('');
    const [coordinates, setCoordinates] = useState(getRandomCoordinates());
    const [ecash, setEcash] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const {wallet} = useWallet();

    const createBounty = async () => {
        let thisEcash = await getEcash(amount);

        console.log(thisEcash.notes)
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

                console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^');
                console.log('amount', amount)
                console.log('thisEcash', thisEcash.notes);

                let deezNotes = thisEcash.notes;

                const response = await fetch('/api/bounties/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Nostr ${signedAuthEventBase64}`, // Use Base64 encoded event
                    },
                    body: JSON.stringify({ coordinates, ecash: deezNotes, amount }),
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



    const getEcash = async (amt:number)=>{
        let balance = await wallet.balance.getBalance();
        console.log('got balance: ', balance);

        const notesToSpend = await wallet.mint.spendNotes(amt, 31536000);
        setEcash(notesToSpend);
        console.log(notesToSpend);

        return notesToSpend;
    }

    return (
        <div>
            <Input
                placeholder="Enter coordinates (e.g., @33.759752,-84.364879)"
                value={coordinates}
                onChange={(e) => setCoordinates(e.target.value)}
                required
            />
            <Input
                placeholder="Bounty Amount"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value))}
                type="number"
            />
            <Input
                placeholder="Enter ecash (optional)"
                value={ecash}
                onChange={(e) => setEcash(e.target.value)}
                className="hidden"
            />
            <Button text="Create Bounty" onClick={createBounty} />
            {responseMessage && <p>{responseMessage}</p>}

            {/* <Button text="Get Notes" onClick={getEcash} /> */}
        </div>
    );
}
