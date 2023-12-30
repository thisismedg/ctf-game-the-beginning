import mongoose from "mongoose";

const teamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true,
    },
    team_password: {
        type: String,
        required: true,
    },
    team_leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    team_members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    team_challenges_completed: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Challenges",
        },
    ],
    team_points_earned: {
        type: Number,
        default: 0,
    },
}, {
    timestamps: true
});

const Team = mongoose.models.Team || mongoose.model("Team", teamSchema);
export default Team;
