"use client";

import React from "react";
import "@/styles/auth.scss";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthFormLogin = () => {
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);
    const [credentials, setCredentials] = React.useState({
        user_name: "",
        user_password: "",
    });

    const handleAuthLoginRequest = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        const login = await signIn("credentials", {
            user_name: credentials.user_name,
            user_password: credentials.user_password,
            redirect: false,
        });

        if (login?.ok) {
            setLoading(false);
            router.push("/teams/join");
        } else {
            alert("Login failed");
        }
    };
    return (
        <>
            <form onSubmit={handleAuthLoginRequest}>
                <div className="form-group">
                    <label className="form-label" htmlFor="user_name">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="user_name"
                        name="user_name"
                        placeholder="Enter your user_name"
                        onChange={(e) => {
                            setCredentials({
                                ...credentials,
                                user_name: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="user_password">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="user_password"
                        name="user_password"
                        placeholder="Enter your user_password"
                        onChange={(e) => {
                            setCredentials({
                                ...credentials,
                                user_password: e.target.value,
                            });
                        }}
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="auth-button auth-submit">
                        CONTINUE
                    </button>
                    <span className="span-link">
                        Don't have an account yet?{" "}
                        <Link href={"/auth/join"}>Join</Link>
                    </span>
                </div>
            </form>
        </>
    );
};

export default AuthFormLogin;
