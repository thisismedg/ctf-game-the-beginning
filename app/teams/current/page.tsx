"use client";

import { _TeamData } from "@/libs/interface";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import "@/styles/teams.scss";
import { redirect, useRouter } from "next/navigation";
import Dropdown from "@/components/Dropdown";
import Image from "next/image";
import Modal from "@/components/Modal";

const Teams = () => {
  const { data: session, update }: any = useSession();
  const router = useRouter();

  if (session) {
    if (!session?.user) {
      return redirect("/auth/join");
    } else if (session?.user && !session?.user?.user_team) {
      return redirect("/teams/join");
    }
  }

  const [currentTeam, setCurrentTeam]: any = useState();

  const removeUserFromTeam = async (id: string) => {
    await fetch("/api/team/remove", {
      method: "PUT",
      body: JSON.stringify({
        team_id: session?.user?.user_team,
        user_id: id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        getAllTeams();
      });
  };

  const checkUserTeam = async () => {
    await fetch(`/api/user/`, {
      method: "POST",
      body: JSON.stringify({
        user_id: session?.user?.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          if (!data.data.user_team) {
            update({
              ...session,
              user: {
                ...session?.user,
                user_team: null,
              },
            });
            router.push("/teams/join");
          }
        }
      });
  };

  const deleteTeam = async () => {
    await fetch("/api/team/delete", {
      method: "PUT",
      body: JSON.stringify({
        team_id: session?.user?.user_team,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          update({
            ...session,
            user: {
              ...session?.user,
              user_team: null,
            },
          });
          getAllTeams();
          router.push("/teams/join");
        }
      });
  };

  const getAllTeams = async () => {
    await fetch(`/api/team/${session?.user?.user_team}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCurrentTeam(data.data);
      });
  };

  useEffect(() => {
    if (session?.user?.user_team) {
      getAllTeams();
      checkUserTeam();

      setInterval(() => {
        getAllTeams();
        checkUserTeam();
      }, 10000);
    }
  }, [session]);

  return (
    <div id="team-information-wrapper">
      {currentTeam && (
        <>
          <div className="team-information-header">
            <div className="title-and-delete">
              <span className="team-heading">{currentTeam?.team_name}</span>
            </div>
            <span className="team-heading">
              {currentTeam?.team_points_earned} PTS
            </span>
          </div>
          {currentTeam?.team_leader._id == session?.user?.id && (
            <Dropdown trigger={<div className="more">More</div>}>
              <div className="dropdown-container">
                <Modal
                  trigger={<button type="button" className="remove-dropdown-btn">Delete Team</button>}
                  className="delete-modal"
                >
                  <span className="team-delete-title">
                    Are you sure you want to delete your team{" "}
                    {`${currentTeam?.team_name}`}?
                  </span>
                  <span>
                    Once deleted, all team points, challenges and rewards will
                    be lost.
                  </span>
                  <br />
                  <br />
                  <div className="modal-footer">
                    <button
                      type="button"
                      onClick={deleteTeam}
                      className="delete-team"
                    >
                      Delete Team
                    </button>
                  </div>
                </Modal>
              </div>
            </Dropdown>
          )}
          <table id="team-table">
            <thead>
              <tr>
                <th>RANK</th>
                <th>USERNAME</th>
                <th>POINTS</th>
                {currentTeam.team_leader._id == session?.user?.id && (
                  <th>ACTION</th>
                )}
              </tr>
            </thead>
            <tbody>
              {currentTeam?.team_mvp_user.map(
                (
                  member: {
                    _id: string;
                    user_name: string;
                    user_points_earned: number;
                    user_challenges_completed: [];
                    user_team: string;
                  },
                  i: number
                ) => (
                  <tr key={i}>
                    <td style={{ position: "relative" }}>
                      <span>{i == 0 && "MVP"}</span> {i + 1}{" "}
                    </td>
                    <td>
                      {member.user_name}{" "}
                      <small className="me">
                        {member._id === session?.user.id ? "(You)" : ""}
                      </small>
                    </td>
                    <td>{member.user_points_earned}</td>
                    <td>
                      {currentTeam.team_leader._id == session?.user?.id &&
                        session?.user?.id != member._id && (
                          <Dropdown trigger={<div className="more">More</div>}>
                            <Modal
                              trigger={
                                <button type="button" className="remove-dropdown-btn">
                                  <Image
                                    src={"/images/trash.svg"}
                                    width={20}
                                    height={20}
                                    alt="trash-remove"
                                  />{" "}
                                  Kick
                                </button>
                              }
                              className="delete-modal"
                            >
                              <p className="team-delete-title">
                                Are you sure you want to kick {member.user_name}{" "}
                                from the team? <br />
                              </p>{" "}
                              <p>
                                {" "}
                                Once kick, all this user points, challenges and
                                rewards will be lost and remove from the teams
                                achievements.
                              </p>
                              <div className="modal-footer">
                                <button
                                  type="button"
                                  className="delete-team"
                                  onClick={() => {
                                    removeUserFromTeam(member._id);
                                  }}
                                >
                                  Continue
                                </button>
                              </div>
                            </Modal>
                          </Dropdown>
                        )}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Teams;
