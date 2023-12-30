import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        user_name: {
            type: String,
            required: true,
            unique: true,
        },
        user_password: {
            type: String,
            required: true,
        },
        user_team: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Team",
        },
        user_points_earned: {
            type: Number,
            default: 0,
        },
        user_challenges_completed: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Challenges",
            },
        ],
    },
    {
        timestamps: true,
    }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
