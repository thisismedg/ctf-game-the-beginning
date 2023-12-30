import connectDB from "@/server/libs/mongoose";
import Team from "@/server/models/TeamModel";
import User from "@/server/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (REQUEST: NextRequest) => {
    await connectDB();
    const { team_id } = await REQUEST.json();
    const team = await Team.findOne({ _id: team_id });

    // check team exsistence
    if (!team) {
        return NextResponse.json({
            status: 400,
            message: "Team not found!",
        });
    }

    // delete team with the id team_id
    const deleteTeam = await Team.findByIdAndDelete(team_id);

    if (deleteTeam) {
        // reset team's user's total_points_earned and the challenges_completed
        await User.updateMany(
            { user_team: team_id }, // filter by user_team with team_id
            {
                $set: {
                    // set empty and 0 
                    user_points_earned: 0,
                    user_challenges_completed: [],
                }, // remove the user_team field from the challenge, instead of setting it to null
                $unset: {
                    user_team: "",
                },
            }
        );
        // then retrn
        return NextResponse.json({
            status: 200,
            message: "Team deleted",
        });
    } else {
        // return if deleting team failed
        return NextResponse.json({
            status: 400,
            message: "Team not deleted!",
        });
    }
};
