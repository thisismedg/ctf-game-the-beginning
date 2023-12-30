"use client";
import { SessionProvider } from "next-auth/react";

export const AuthContextProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    return <SessionProvider>{children}</SessionProvider>;
};
