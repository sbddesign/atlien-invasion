"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { FedimintWallet } from '@fedimint/core-web';

type WalletContextType = {
  wallet: FedimintClient | null;
  setWallet: React.Dispatch<React.SetStateAction<FedimintClient | null>>;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [wallet, setWallet] = useState<FedimintClient | null>(null);

  useEffect(() => {
    // Initialize the Fedimint wallet here
    async function initializeWallet() {
      try {
        // Create the Wallet client
        const wallet = new FedimintWallet()

        // Open the wallet (should be called once in the application lifecycle)
        await wallet.open()

        // Join a Federation (if not already open)
        if (!wallet.isOpen()) {
            const inviteCode = 'fed11qgqzc2nhwden5te0vejkg6tdd9h8gepwvejkg6tdd9h8garhduhx6at5d9h8jmn9wshxxmmd9uqqzgxg6s3evnr6m9zdxr6hxkdkukexpcs3mn7mj3g5pc5dfh63l4tj6g9zk4er';
            await wallet.joinFederation(inviteCode)
        }

        // Get Wallet Balance
        const balance = await wallet.balance.getBalance()

        // Subscribe to Balance Updates
        const unsubscribe = wallet.balance.subscribeBalance((balance: number) => {
            console.log('Updated balance:', balance)
        })
        // // Remember to call unsubscribe() when done

        // Create Lightning Invoice
        // await wallet.lightning.createInvoice(10_000, 'description')

        wallet.mint.spendNotes

        setWallet(wallet);
      } catch (error) {
        console.error('Failed to initialize wallet:', error);
      }
    }

    initializeWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, setWallet }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
