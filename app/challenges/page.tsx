"use client";

import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ChallengeDataResponse } from "@/libs/interface";
import "@/styles/challenges.scss";
import Modal from "@/components/Modal";

const page = () => {
  const router = useRouter();
  const { data: session, update }: any = useSession();
  const [challenges, setChallenges] = useState<ChallengeDataResponse>();

  const [validFlag, setValidFlag] = useState({
    status: 0,
    message: "",
  });
  const [challenge_id, setChallengeID] = useState("");
  const [challenge_flag, setChallengeFlag] = useState("");

  if (session) {
    if (!session?.user?.user_team) {
      return redirect("/teams/join");
    }
  }

  const getAllChallenges = async () => {
    await fetch(`/api/challenges/all/${session?.user?.user_team}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setChallenges(data);
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

  const handleVerifyFlag = async (e: any) => {
    e.preventDefault();
    await fetch("/api/challenges/verify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: session?.user?.id,
        challenge_id: challenge_id,
        challenge_flag: challenge_flag,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 400) {
          setValidFlag({
            status: data.status,
            message: data.message,
          });
        }
        getAllChallenges();
      });
  };

  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;

    if (session?.user?.user_team) {
      getAllChallenges();
      checkUserTeam();

      intervalId = setInterval(() => {
        getAllChallenges();
        checkUserTeam();
      }, 5000);
    }

    return () => {
      setChallenges(undefined);
      clearInterval(intervalId);
    };
  }, [session?.user?.user_team]);

  return (
    <div id="challenge-container">
      {challenges?.challenges.map((category, i) => {
        const categoryName = Object.keys(category)[0];
        return (
          <div key={categoryName} id="challenge-container-outer">
            <h2 className="challenge-category">
              {i + 1} &rarr; {categoryName}
            </h2>
            <div className="challenge-container">
              {category[categoryName].map((challenge) => {
                return (
                  <Modal
                    key={challenge._id}
                    closeModal={() => {
                      setValidFlag({
                        status: 0,
                        message: "",
                      });
                    }}
                    trigger={
                      <button
                        type="button"
                        key={challenge._id}
                        className={`challenge-card ${
                          challenge.status == "verified" ? "verified-card" : ""
                        }`}
                        onClick={() => setChallengeID(challenge._id)}
                      >
                        {challenge.status === "verified" && (
                          <div className="verified" title="Verified"></div>
                        )}
                        <span className="challenge-difficulty">
                          {challenge.challenge_difficulty}
                        </span>
                        <div className="challenge-body">
                          <span className="trigger-challenge-title">
                            {challenge.challenge_title}
                          </span>
                          <br />
                          <span
                            className="challenge-description"
                            dangerouslySetInnerHTML={{
                              __html: challenge.challenge_description,
                            }}
                          ></span>
                        </div>
                        <div className="challenge-card-footer">
                          <span className="challenge-points">
                            POINTS: {challenge.challenge_points}
                          </span>
                          <span
                            className="challenge-solves"
                            title={challenge.team_completed_the_challenge
                              .map((team: any) => team)
                              .join(", ")}
                          >
                            solves:
                            {challenge.solve}{" "}
                          </span>
                        </div>
                      </button>
                    }
                  >
                    <div className="challenge-card-body">
                      <span
                        className="modal-challenge-title"
                        style={{ marginRight: "auto" }}
                      >
                        {challenge.challenge_title}
                      </span>
                      <span className="challenge-points">
                        POINTS: {challenge.challenge_points}
                      </span>
                    </div>

                    <p
                      className="modal-challenge-description"
                      dangerouslySetInnerHTML={{
                        __html: challenge.challenge_description,
                      }}
                    ></p>
                    <p className="modal-challenge-flag-format">
                      Flag format: cicsCTF{`${"{flag}"}`}
                    </p>

                    <form
                      method="post"
                      className="modal-challenge-form"
                      onSubmit={handleVerifyFlag}
                    >
                      {challenge.status != "verified" && (
                        <input
                          type="text"
                          name="flag"
                          id="flag"
                          placeholder="cicsCTF{flag}"
                          onChange={(e) => {
                            setChallengeFlag(e.target.value);
                            setValidFlag({
                              status: 0,
                              message: "",
                            });
                          }}
                          required
                        />
                      )}
                      <button
                        type="submit"
                        disabled={challenge.status === "verified"}
                      >
                        {challenge.status === "verified"
                          ? "challenge completed"
                          : "verify"}
                      </button>
                    </form>
                    {validFlag.status == 400 && (
                      <small className="not-valid">{validFlag.message}</small>
                    )}
                    <br />
                    {challenge.team_completed_the_challenge.length > 0 && (
                      <span className="completed-challenge-title">
                        Solve by: [
                        {challenge.team_completed_the_challenge
                          .map((team: any) => team)
                          .join(", ")}
                        ]
                      </span>
                    )}
                  </Modal>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default page;
