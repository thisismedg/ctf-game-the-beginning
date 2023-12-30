import connectDB from "@/server/libs/mongoose";
import User from "@/server/models/UserModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (REQUEST: NextRequest) => {
  await connectDB();
  const { user_id } = await REQUEST.json();
  const user = await User.findOne({ _id: user_id }, {user_password: 0});

  if (!user) {
    return NextResponse.json({
      status: 400,
      message: "User not found!",
    });
  }

  return NextResponse.json({
    status: 200,
    message: "User found!",
    data: user,
  });
};
