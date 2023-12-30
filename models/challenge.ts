import mongoose, { Schema } from "mongoose";

const challengeSchema = new Schema(
    {
        challengeName: {
            type: String,
            required: true,
            unique: true,
        },
        challengeDescription: {
            type: String,
            required: true,
        },
        challengePoints: {
            type: Number,
            default: 0,
        },
        challengeCategory: {
            type: String,
            required: true,
        },
        challengeDifficulty: {
            type: String,
            required: true,
        },
        challengeFlag: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

const Challenge = mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema);

export default Challenge;
