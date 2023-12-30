import React from "react";
import "@/styles/auth.scss";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AuthFormLogin from "./AuthFormLogin";

const Login = async () => {
    const session = await getServerSession(authOptions);
    if (session) {
        redirect("/");
    }

    return (
        <div className="auth-container">
            <div className="auth-banner">
                <span className="banner-text">
                    GET &rarr; <span className="highlight">READY</span> FOR THE
                    BATTLE!
                </span>
            </div>
            <div className="auth-form-container">
                <div className="auth-form">
                    <div className="auth-form-header">
                        <span className="auth-form-heading">SIGN IN</span>
                        <p className="auth-form-heading-tag">
                            Sign in and get ready for the battle.
                        </p>
                    </div>
                    <AuthFormLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;
