"use client";

import React from "react";
import "@/styles/teams.scss";
import JoinTeamForm from "./JoinTeamForm";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const JoinTeam = () => {
    const { data: session }: any = useSession();
    
    if(session) {
        if (!session?.user) {
            return redirect("/auth/join");
        } else if (session?.user && session?.user?.user_team != null) {
            return redirect("/teams/current");
        }
    }
    return (
        <div className="teams-form-container">
            <JoinTeamForm />
        </div>
    );
};

export default JoinTeam;
