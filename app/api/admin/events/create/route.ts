import connectDB from "@/server/libs/mongoose";
import Event from "@/server/models/EventModel";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (REQUEST: NextRequest) => {
    await connectDB();
    const { event_name, event_description, event_date } = await REQUEST.json();

    // find event
    const event = await Event.findOne({
        event_name: event_name,
    });

    // if event already exists
    if (event) {
        return NextResponse.json({
            status: 400,
            message: "Event already exists",
        });
    }

    // check if the event date already exists
    const eventDate = await Event.findOne({
        event_date: event_date,
    });
    // if event date already exists,
    if (eventDate) {
        return NextResponse.json({
            status: 400,
            message: "Event date already exists",
        });
    }
    // create the event
    await Event.create({
        event_name,
        event_description,
        event_date,
    });

    // then return
    return NextResponse.json({
        status: 201,
        message: "Event created",
    });
};
