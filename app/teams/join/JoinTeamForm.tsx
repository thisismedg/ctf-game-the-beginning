"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "@/styles/teams.scss";
import Link from "next/link";
import { _JoinTeamRequest } from "@/libs/interface";

const JoinTeamForm = () => {
  const router = useRouter();
  const { data: session, status, update }: any = useSession();
  const [error, setError] = useState("");

  const [team, setTeam] = useState({
    team_name: "",
    team_password: "",
    user_id: "",
  });

  const handleJoinTeamRequest = async (e: any) => {
    e.preventDefault();

    await fetch("/api/team/join-team", {
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
        } else {
          setError(data.message);
        }
      });
  };

  return (
    <form onSubmit={handleJoinTeamRequest} method="post" className="teams-form">
      <div className="teams-form-col">
        <span className="teams-form-heading">Join team</span>
        <span className="teams-form-heading-tag">
          Ask your team leader for the password
        </span>
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
              user_id: session?.user?.id,
            });
            setError("");
          }}
        />
      </div>
      {error && error == "Team not found!" && (
        <span className="error">{error}</span>
      )}
      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Team Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          placeholder="Team Password"
          onChange={(e) => {
            setTeam({
              ...team,
              team_password: e.target.value,
            });
            setError("");
          }}
        />
      </div>
      {error && error == "Wrong team password!" && (
        <span className="error">{error}</span>
      )}
      <div className="form-group">
        <button type="submit" className="teams-form-submit">
          JOIN
        </button>
      </div>
      <div className="form-group">
        <span className="span-link">
          Are you the team leader?{" "}
          <Link href={"/teams/create"}>Create Team</Link>
        </span>
      </div>
    </form>
  );
};

export default JoinTeamForm;
