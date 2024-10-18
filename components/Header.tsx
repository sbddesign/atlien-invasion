"use client";

export default function Header() {
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
    ]

    return(
        <header>
            <p>ATLien Invasion</p>
            <nav>
                <ul>
                    {menu.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}>{item.text}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}
