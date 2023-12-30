import connectDB from "@/server/libs/mongoose";
import Challenge from "@/server/models/ChallengeModel";
import { ChallengeDataType } from "@/server/types/types";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (REQUEST: NextRequest) => {
    await connectDB();
    const {
        challenge_title,
        challenge_description,
        challenge_points,
        challenge_difficulty,
        challenge_category,
        challenge_flag,
    } = await REQUEST.json();

    const challenge = await Challenge.findOne({
        challenge_title,
    });

    if (challenge) {
        return NextResponse.json({
            status: 400,
            message: "Challenge already exists",
        });
    }

    const newChallenge = await Challenge.create({
        challenge_title: challenge_title,
        challenge_description: challenge_description,
        challenge_points: challenge_points,
        challenge_difficulty: challenge_difficulty,
        challenge_category: challenge_category,
        challenge_flag: challenge_flag,
    });

    return NextResponse.json({
        status: 201,
        message: "Challenge created successfully",
        challenge: newChallenge,
    });
};
