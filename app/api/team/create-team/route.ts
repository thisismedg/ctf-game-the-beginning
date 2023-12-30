import connectDB from "@/server/libs/mongoose";
import Team from "@/server/models/TeamModel";
import User from "@/server/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (REQUEST: NextRequest) => {
    await connectDB();
    const { team_name, team_password, team_leader, team_members } =
        await REQUEST.json();

    // Check if the team is already declared
    const team = await Team.findOne({ team_name });
    if (team) {
        return NextResponse.json({
            status: 400,
            message: "Team already exists",
        });
    }

    const teamData = await Team.create({
        team_name,
        team_password,
        team_leader,
        team_members,
    });

    await User.findByIdAndUpdate(
        {
            _id: team_leader,
        },
        {
            user_team: teamData._id,
        }
    );

    return NextResponse.json({
        status: 201,
        message: "Team created successfully",
        data: teamData,
    });
};
