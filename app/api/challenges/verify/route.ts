import connectDB from "@/server/libs/mongoose";
import Challenge from "@/server/models/ChallengeModel";
import Team from "@/server/models/TeamModel";
import User from "@/server/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (REQUEST: NextRequest) => {
    await connectDB();

    // get the required parameters
    const { challenge_id, user_id, challenge_flag } = await REQUEST.json();


    // find the challenge
    const challenge = await Challenge.findOne({ _id: challenge_id });

    // if challenge is not found, return 404
    if (!challenge) {
        return NextResponse.json({
            status: 404,
            message: "Challenge not found!",
        });
    }

    const user = await User.findOne({ _id: user_id });
    const team = await Team.findOne({ _id: user.user_team });

    // check if the team_challenges array in includes the challenge selected,
    // if it exists, the  return 400.

    if (team.team_challenges_completed.includes(challenge_id)) {
        return NextResponse.json({
            status: 400,
            message: "You team already completed this challenge!",
        });
    } else {

        // start verifying if the flag is correct or not
        if (challenge.challenge_flag !== challenge_flag) {
            return NextResponse.json({
                status: 400,
                message: "Challenge flag is incorrect. Try again :>",
            });
        } else {
            // if flag is correct, find the user using the user_id
            const find_user = await User.findOne({ _id: user_id });

            if (!find_user) {
                return NextResponse.json({
                    status: 404,
                    message: "User not found!",
                });
            } else {
                // update the user's information, adding points and pushing the challenge in the user_challenge_completed array
                const user = await User.findOneAndUpdate(
                    {
                        _id: user_id,
                    },
                    {
                        $inc: {
                            user_points_earned: challenge.challenge_points,
                        },
                        $push: {
                            user_challenges_completed: challenge._id,
                        },
                    }
                );

                // udpate also the team, add points and push the challenge in the team_challenge_completed array
                const team = await Team.findOneAndUpdate(
                    {
                        _id: user.user_team,
                    },
                    {
                        $inc: {
                            team_points_earned: challenge.challenge_points,
                        },
                        $push: {
                            team_challenges_completed: challenge._id,
                        },
                    }
                );
                
                // then return
                return NextResponse.json({
                    status: 200,
                    message: "Challenge verified!",
                });
            }
        }
    }
};
