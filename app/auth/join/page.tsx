import React from "react";
import "@/styles/auth.scss";
import AuthFormJoin from "./AuthFormJoin";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import  { redirect } from 'next/navigation';

const Join = async () => {
    const session = await getServerSession(authOptions);
    
    if (session) {
        redirect("/");
    }
    return (
        <div className="auth-container">
            <div className="auth-banner">
                <span className="banner-text highlight">
                    JOIN &rarr; THE CTF{" "}
                    <div className="highlight-white">CORE</div> 2023.
                </span>
            </div>
            <div className="auth-form-container">
                <div className="auth-form">
                    <div className="auth-form-header">
                        <span className="auth-form-heading">
                            CREATE ACCOUNT
                        </span>
                        <p className="auth-form-heading-tag">
                            Create your account to join.
                        </p>
                    </div>
                    <AuthFormJoin />
                </div>
            </div>
        </div>
    );
};

export default Join;
