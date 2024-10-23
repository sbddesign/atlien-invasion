"use client";

import React from 'react';

interface InputProps {
  type?: 'text' | 'email' | 'number'; // Supported input types
  placeholder: string;
  value: string|number;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; // Optional className prop
}

const Input: React.FC<InputProps> = ({
  type = 'text', // Default to 'text'
  placeholder,
  value,
  required = false,
  onChange,
  className = '',
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`p-4 border border-gray-200 rounded-lg ${className}`} // Append custom className
    />
  );
};

export default Input;
