import connectDB from "@/server/libs/mongoose";
import Team from "@/server/models/TeamModel";
import User from "@/server/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (REQUEST: NextRequest) => {
    await connectDB();
    // if connected

    const { team_name, team_password, user_id } = await REQUEST.json();

    // Check if the team is already declared
    const team = await Team.findOne({ team_name });
    if (!team) {
        return NextResponse.json({
            status: 400,
            message: "Team not found!",
        });
    }

    // Check if the user is already on the team
    if (team.team_members.includes(user_id)) {
        return NextResponse.json({
            status: 400,
            message: "You are already on the team!",
        });
    }
    
    const user = await User.findOne({
        _id: user_id,
    });

    if (!user) {
        return NextResponse.json({
            status: 400,
            message: "User not found!",
        });
    } else {
        if (team.team_password != team_password) {
            return NextResponse.json({
                status: 400,
                message: "Wrong team password!",
            });
        }

        const teamData = await Team.findOneAndUpdate(
            { team_name },
            { $push: { team_members: user_id } },
            { new: true }
        );

        await User.findByIdAndUpdate(
            {
                _id: user_id,
            },
            {
                user_team: team._id,
            }
        );

        return NextResponse.json({
            status: 201,
            message: `You successfully joined ${team_name}`,
            data: teamData,
        });
    }
};
