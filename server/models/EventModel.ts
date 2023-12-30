import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        event_name: {
            type: String,
            required: true,
        },
        event_description: {
            type: String,
            required: true,
        },
        event_date: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
export default Event;
