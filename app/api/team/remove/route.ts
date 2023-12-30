import connectDB from "@/server/libs/mongoose";
import Team from "@/server/models/TeamModel";
import User from "@/server/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (REQUEST: NextRequest) => {
    await connectDB();

    const { team_id, user_id } = await REQUEST.json();

    const team = await Team.findOne({ _id: team_id });

    if (!team) {
        return NextResponse.json({
            status: 404,
            message: "Team not found",
        });
    }

    const user = await User.findOne({ _id: user_id });

    if (!user) {
        return NextResponse.json({
            status: 404,
            message: "User not found",
        });
    }

    // Calculate points to deduct
    const userPoints = user.user_points_earned || 0;

    // Remove the user from the team
    const updateTeam = await Team.findOneAndUpdate(
        { _id: team_id },
        {
            $pull: { team_members: user_id },
            $inc: { team_points_earned: -userPoints }, // Deduct user points from team
            $pullAll: {
                team_challenges_completed: user.user_challenges_completed || [],
            }, // Remove completed challenge IDs
        }
    );

    // Update the user data
    const updateUser = await User.findOneAndUpdate(
        { _id: user_id },
        {
            $set: {
                user_points_earned: 0, // Reset points
                user_challenges_completed: [], // Reset completed challenges
            },
            $unset: {
                user_team: "",
            },
        }
    );

    if (updateUser && updateTeam) {
        return NextResponse.json({
            status: 200,
            message:
                "User removed from team, points deducted, and challenges removed",
        });
    } else {
        return NextResponse.json({
            status: 500,
            message: "Failed to update user or team",
        });
    }
};
