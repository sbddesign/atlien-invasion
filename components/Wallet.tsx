"use client";

import React, { useEffect, useState } from 'react';
import { useWallet } from '@/contexts/WalletContext';

export default function Wallet() {
  const { wallet } = useWallet();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      if (wallet) {
        try {
          const currentBalance = await wallet.balance.getBalance();
          setBalance(currentBalance);
        } catch (error) {
          console.error('Failed to get balance:', error);
        }
      }
    };

    fetchBalance();
  }, [wallet]);

  return (
    <div>
      <p>Wallet Balance: {balance !== null ? balance : 'Loading...'}</p>
    </div>
  );
}
