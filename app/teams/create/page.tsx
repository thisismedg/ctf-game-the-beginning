"use client";

import React from "react";
import "@/styles/teams.scss";
import CreateTeamForm from "./CreateTeamForm";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

const CreateTeam = () => {
    const { data: session } : any = useSession();

    if (!session?.user) {
        return redirect("/auth/login"); 
    } else if (session?.user?.user_team != null) {
        return redirect("/teams/current");
    }

    return (
        <div className="teams-form-container">
            <CreateTeamForm />
        </div>
    );
};

export default CreateTeam;
