import connectDB from "@/server/libs/mongoose";
import Challenge from "@/server/models/ChallengeModel";
import Team from "@/server/models/TeamModel";
import { NextResponse } from "next/server";

export const GET = async (REQUEST: any, { params }: any) => {
    await connectDB();

    const { team_id } = await params;
    const challenges = await Challenge.find({}, { challenge_flag: 0 }).lean();
    const teams = await Team.find({});

    const target_team = await Team.findOne({
        _id: team_id,
    });

    const challenges_completed = await Challenge.find({
        _id: { $in: target_team.team_challenges_completed },
    });

    const updatedChallenges = challenges.map((challenge) => {
        const teamsCompletedChallenge = teams.filter((team) =>
            team.team_challenges_completed.includes(challenge._id)
        );
        const teamNames = teamsCompletedChallenge.map((team) => team.team_name);

        return {
            ...challenge,
            team_completed_the_challenge: teamNames, // Include the team names instead of team_ids
            solve: teamsCompletedChallenge.length, // Count of teams that completed the challenge
            status: challenges_completed.some((completedChallenge) =>
                completedChallenge._id.equals(challenge._id)
            )
                ? "verified"
                : "not_verified",
        };
    });

    const groupedChallenges = updatedChallenges.reduce(
        (acc: any, challenge: any) => {
            if (!acc[challenge.challenge_category]) {
                acc[challenge.challenge_category] = [];
            }
            acc[challenge.challenge_category].push(challenge);
            return acc;
        },
        {}
    );

    const flattenedChallenges = Object.entries(groupedChallenges).map(
        ([category, challenges]) => {
            return {
                [category]: challenges,
            };
        }
    );

    return NextResponse.json({
        status: 200,
        challenges: flattenedChallenges,
    });
};
