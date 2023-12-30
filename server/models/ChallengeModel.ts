import mongoose from "mongoose";

const challengesSchema = new mongoose.Schema(
    {
        challenge_title: {
            type: String,
            required: true,
        },
        challenge_description: {
            type: String,
            required: true,
        },
        challenge_points: {
            type: Number,
            required: true,
            default: 0,
            enum: [30, 50, 100, 150, 200, 250, 300],
        },
        challenge_difficulty: {
            type: String,
            required: true,
            enum: ["easy", "medium", "hard", "expert"],
        },
        challenge_category: {
            type: String,
            required: true,
            enum: [
                "web",
                "programming",
                "binary",
                "steganography",
                "cryptography",
                "general",
                "forensics",
                "reverse engineering",
            ],
        },
        challenge_flag: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Challenge =
    mongoose.models.Challenges ||
    mongoose.model("Challenges", challengesSchema);
export default Challenge;
