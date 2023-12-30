import connectDB from "@/server/libs/mongoose";
import Team from "@/server/models/TeamModel";
import User from "@/server/models/UserModel";
import { NextResponse } from "next/server";

export const GET = async (request: any, { params }: any) => {
    await connectDB();
    const { team_id } = await params;

    const team = await Team.findOne({ _id: team_id });

    if (!team) {
        return NextResponse.json({
            status: 400,
            message: "Team not found!",
            team_id: team_id,
        });
    }

    const team_leader = await User.findOne(
        {
            _id: team.team_leader,
        },
        {
            user_password: 0,
            user_points_earned: 0,
            user_challenges_completed: 0,
            user_team: 0,
        }
    );

    const team_members = await User.find(
        { _id: { $in: team.team_members } },
        { user_password: 0 }
    );

    const team_mvp_user = team_members.sort(
        (a, b) => b.user_points_earned - a.user_points_earned
    );

    // get the total team members points
    const team_points_earned = team_members.reduce(
        (acc, curr) => acc + curr.user_points_earned,
        0
    );

    return NextResponse.json({
        status: 200,
        message: "Team found!",
        data: {
            team_name: team.team_name,
            team_leader: team_leader,
            team_members: team_members,
            team_challenges_completed: team.team_challenges_completed,
            team_points_earned: team_points_earned,
            team_mvp_user: team_mvp_user,
        },
    });
};
