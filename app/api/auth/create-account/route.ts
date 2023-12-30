import connectDB from "@/server/libs/mongoose";
import { AuthenticationDataType } from "@/server/types/types";
import { NextRequest, NextResponse } from "next/server";
import User from "@/server/models/UserModel";
import bcrypt from "bcryptjs";

export const POST = async (REQUEST: NextRequest) => {
    await connectDB();
    // if connected

    const { user_name, user_password } = await REQUEST.json();

    // Check if user already exists
    const user = await User.findOne({ user_name });

    if (user) {
        return NextResponse.json({
            status: 400,
            message: "User already exists",
        });
    }

    // create new user
    const encPassword = await bcrypt.hash(user_password, 10);
    const userData = await User.create({
        user_name,
        user_password: encPassword,
    });

    return NextResponse.json({
        status: 201,
        message: "User created successfully",
        user: {
            _id: userData._id,
            user_name: userData.user_name,
            user_team: userData.user_team,
            user_points_accumulated: userData.user_points_accumulated,
            user_challenges_answered: userData.user_challenges_answered,
        },
    });
};
