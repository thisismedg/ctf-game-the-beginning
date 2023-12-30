import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema({
    teamName: {
        type: String,
        required: true,
        unique: true,
    },
    teamPassword: {
        type: String,
        required: true,
    },
    teamPoints: {
        type: Number,
        default: 0,
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    teamLeader: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    challengesAnswered: [
        {
            type: Schema.Types.ObjectId,
            ref: "Challenge",
        },
    ],
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);

export default Team;
