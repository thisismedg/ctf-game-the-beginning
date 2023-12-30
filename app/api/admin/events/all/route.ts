import connectDB from "@/server/libs/mongoose";
import Event from "@/server/models/EventModel";
import { NextResponse } from "next/server";

export const POST = async (REQUEST: any) => {
    await connectDB();

    const event = await Event.find();
    return NextResponse.json({
        status: 200,
        events: event,
    });
};
