"use client";

import React from "react";
import "@/styles/nav.scss";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

const NavLinks = ({
    navlinksarr,
}: {
    navlinksarr: Array<{
        label: string;
        href: string;
        authorization: number;
    }>;
}) => {
    const pathname = usePathname();

    const { data: session } = useSession();
    let authorization: number = 0;

    if (session) {
        authorization = 1;
    }

    const handleSignOut = async () => {
        await signOut();
    };

    return (
        <ul id="nav-link-list">
            {navlinksarr.map((link, i) => {
                if (!session && link.authorization != 1) {
                    return (
                        <li key={i}>
                            <Link href={link.href} className={pathname === link.href ? 'nav-link active' : 'nav-link'}>
                                {link.label}
                            </Link>
                        </li>
                    );
                } else if (session && link.authorization != 0) {
                    return (
                        <li key={i}>
                            <Link href={link.href} className={pathname === link.href ? 'nav-link active' : 'nav-link'}>
                            {link.label}
                            </Link>
                        </li>
                    );
                }
            })}
            {session && (
                <li>
                    <button onClick={handleSignOut} className="nav-link">
                        Sign Out
                    </button>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;
