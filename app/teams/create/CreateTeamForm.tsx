"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "@/styles/teams.scss";
import Link from "next/link";
import { _CreateTeamResponse } from "@/libs/interface";

const CreateTeamForm = () => {
  const router = useRouter();
  const { data: session, update }: any = useSession();

  const [team, setTeam] = useState({
    team_name: "",
    team_password: "",
    team_leader: "",
    team_members: [""],
  });

  const handleCreateTeamRequest = async (e: any) => {
    e.preventDefault();

    await fetch("/api/team/create-team", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(team),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 201) {
          update({
            ...session,
            user: {
              ...session?.user,
              user_team: data.data._id,
            },
          });
          router.push("/teams/current");
        }
      });
  };

  return (
    <form onSubmit={handleCreateTeamRequest} className="teams-form">
      <div className="teams-form-col">
        <span className="teams-form-heading">
          Create a <br />
          new team
        </span>
        <span className="teams-form-heading-tag">Make a fancy team name</span>
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="name">
          Team Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          name="name"
          placeholder="< / TheUnbreakable >"
          onChange={(e) => {
            setTeam({
              ...team,
              team_name: e.target.value,
              team_leader: session?.user?.id,
              team_members: [session?.user?.id],
            });
          }}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="p4$$w0rd"
          onChange={(e) => {
            setTeam({
              ...team,
              team_password: e.target.value,
            });
          }}
        />
      </div>
      <div className="form-group">
        <button type="submit" className="teams-form-submit">
          CREATE
        </button>
      </div>
      <div className="form-group">
        <span className="span-link">
          Already have a team? <Link href={"/teams/join"}>JOIN</Link>
        </span>
      </div>
    </form>
  );
};

export default CreateTeamForm;
