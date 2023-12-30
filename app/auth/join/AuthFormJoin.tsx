"use client";

import React from "react";
import "@/styles/auth.scss";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const AuthFormJoin = () => {
    const router = useRouter();

    const [loading, setLoading] = React.useState(false);
    const [credentials, setCredentials] = React.useState({
        user_name: "",
        user_password: "",
    });

    const handleAuthJoinRequest = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        await fetch("/api/auth/create-account", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
        })
            .then((res) => res.json())
            .then(async (res) => {
                setLoading(false);
                if (res.status === 201) {
                    await signIn("credentials", {
                        user_name: credentials.user_name,
                        user_password: credentials.user_password,
                        redirect: false,
                    });
                    router.push("/teams/join");
                } else {
                    alert(res.statusText);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    };
    return (
        <>
            <form onSubmit={handleAuthJoinRequest}>
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
                        CREATE ACCOUNT
                    </button>
                    <span className="span-link">
                        Already have an account?{" "}
                        <Link href={"/auth/login"}>Login</Link>
                    </span>
                </div>
            </form>
        </>
    );
};

export default AuthFormJoin;
