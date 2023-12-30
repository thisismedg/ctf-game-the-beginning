import connectDB from "@/server/libs/mongoose";
import Team from "@/server/models/TeamModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (REQUEST: NextRequest) => {
    await connectDB();

    const { team_id, team_name, team_password } = await REQUEST.json();

    const team = await Team.findOne({
        _id: team_id,
    });

    if (!team) {
        return NextResponse.json({
            status: 400,
            message: "Team not found!",
        });
    }

    const updateTeam = await Team.findOneAndUpdate(
        {
            _id: team_id,
        },
        {
            $set: {
                team_name: team_name,
                team_password: team_password,
            },
        }
    );

    if (updateTeam) {
        return NextResponse.json({
            status: 200,
            message: "Team updated successfully!",
            data: updateTeam,
        });
    } else {
        return NextResponse.json({
            status: 400,
            message: "Team not updated.",
        });
    }
};
