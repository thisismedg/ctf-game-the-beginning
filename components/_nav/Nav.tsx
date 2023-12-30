import React from "react";
import "@/styles/nav.scss";
import Link from "next/link";
import Image from "next/image";
import NavLinks from "./NavLinks";

const NavLinksArr = [
    {
        label: "CHALLENGES",
        href: "/challenges",
        authorization: 1,
    },
    {
        label: "LEADERBOARD",
        href: "/leaderboard",
        authorization: 2,
    },
    {
        label: "TEAMS",
        href: "/teams/current",
        authorization: 1,
    },
    {
        label: "LOGIN ",
        href: "/auth/login",
        authorization: 0,
    },
    {
        label: "CREATE ACCOUNT",
        href: "/auth/join",
        authorization: 0,
    },
];

const Nav = async () => {
    return (
        <nav id="nav">
            <Link href={"/"}>
                <Image
                    priority={true}
                    src={"/images/logo.svg"}
                    width={120}
                    height={60}
                    alt="Logo"
                />
            </Link>

            <NavLinks navlinksarr={NavLinksArr} />
        </nav>
    );
};

export default Nav;
