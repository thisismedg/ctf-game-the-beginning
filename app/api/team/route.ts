import connectDB from "@/server/libs/mongoose";
import Team from "@/server/models/TeamModel";
import { NextResponse } from "next/server";

export const POST = async () => {
  await connectDB();
  const teams = await Team.find()
    .populate({
      path: "team_leader",
      select:
        "-user_password -user_points_earned -user_challenges_completed -user_team -createdAt -updatedAt -__v",
    })
    .populate({
      path: "team_members",
      select: "-user_password",
    })
    .lean();

  if (!teams) {
    return NextResponse.json({
      status: 400,
      message: "No teams found!",
    });
  }

  const teamData = teams
    .map((team) => {
      const sortedMembers = [...team.team_members].sort(
        (a, b) => b.user_points_earned - a.user_points_earned
      );
      return {
        team_id: team._id,
        team_name: team.team_name,
        team_leader: team.team_leader,
        team_members: team.team_members,
        team_challenges_completed: team.team_challenges_completed,
        team_points_earned: team.team_members.reduce(
          (acc: any, member: { user_points_earned: any }) =>
            acc + member.user_points_earned,
          0
        ),
        team_mvp_user: sortedMembers[0] || null,
        updatedAt: team.updatedAt, // Add updatedAt
        createdAt: team.createdAt, // Add createdAt
      };
    })
    .sort((a: any, b: any) => {
      // First, sort by highest points
      if (b.team_points_earned !== a.team_points_earned) {
        return b.team_points_earned - a.team_points_earned;
      }

      // If points are the same, sort by updatedAt
      return new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });

  return NextResponse.json({
    status: 200,
    message: "Teams found!",
    data: teamData,
  });
};
