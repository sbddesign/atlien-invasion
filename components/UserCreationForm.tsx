"use client";

import { useState } from 'react';

export default function UserCreationForm() {
  const [email, setEmail] = useState('');

  const createUser = async () => {
    try {
      const response = await fetch('/api/users/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert('User created successfully');
      } else {
        alert('Failed to create user');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      alert('Failed to create user');
    }
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter email"
      />
      <button onClick={createUser}>Make New User</button>
    </div>
  );
}
