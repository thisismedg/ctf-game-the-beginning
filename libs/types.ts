export type UserType = {
    username: string;
    password: string;
    team: string;
    points: number;
};

export type TeamType = {
    teamName: string;
    teamDescription: string;
    teamPoints: number;
    teamLeader: string;
    teamMembers: string[];
};

export type ChallengeType = {
    challengeName: string;
    challengeDescription: string;
    challengePoints: number;
    challengeCategory: string;
    challengeDifficulty: string;
    challengeFlag: string;
};

export type VerifyData = {
    user_id: string;
    challenge_id: string;
    challenge_flag: string;
}