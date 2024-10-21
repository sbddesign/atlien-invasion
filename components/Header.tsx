"use client";
import { useState } from 'react';
import { MenuIcon } from '@bitcoin-design/bitcoin-icons-react/filled';
import Link from 'next/link';

export default function Header() {
    const [isNavVisible, setIsNavVisible] = useState(false);

    const menu = [
        {
            href: '/',
            text: 'Home'
        },
        {
            href: '/account/',
            text: 'Account'
        },
        {
            href: '/account/new',
            text: 'New Account'
        },
        {
            href: '/bounties',
            text: 'Bounties'
        },
        {
            href: '/bounty/new',
            text: 'New Bounty'
        }
        ,
        {
            href: '/coords',
            text: 'Coords (Dev)'
        }
    ];

    const toggleNav = () => {
        setIsNavVisible(!isNavVisible);
    };

    const closeNav = () => {
        setIsNavVisible(false);
    };

    return (
        <header className="items-center border-b border-gray-200 lg:flex flex-row justify-between">
            <div className="max-md:w-full flex flex-row justify-between p-4 lg:flex-initial">
                <Link href="/" className="font-bold m-0 no-underline text-black">ATLien Invasion</Link>
                <button 
                    title="Show Menu" 
                    aria-hidden="true" 
                    className="lg:hidden" 
                    onClick={toggleNav}
                >
                    <MenuIcon className="w-6 h-6" />
                </button>
            </div>
            <nav className={`lg:flex max-md:border-t lg:w-full lg:flex-1 max-md:border-gray-200 ${isNavVisible ? 'block' : 'hidden'}`}>
                <ul className="flex flex-col lg:flex-row lg:items-center w-full justify-end">
                    {menu.map((item, index) => (
                        <li key={index} className="lg:ml-4">
                            <Link 
                                href={item.href} 
                                className="p-4 block no-underline font-medium text-lg hover:bg-gray-50"
                                onClick={closeNav}
                            >
                                {item.text}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
