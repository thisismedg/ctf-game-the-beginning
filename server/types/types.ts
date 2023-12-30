export type AuthenticationDataType = {
    user_name: string;
    user_password: string;
};

export type UserModel = {
    user_name: string;
    user_password: string;
    user_team: string;
    user_points_earned: number;
    user_challenges_answered: [
        {
            _id: string;
            challenge_title: string;
            challenge_description: string;
            challenge_points: number;
            challenge_difficulty: string;
            challenge_type: string;
            challenge_flag: string;
        }
    ];
};

export type TeamDataType = {
    team_name: string;
    team_password: string;
    team_leader: string;
    team_members: string[];
    team_challenges_completed: string[];
    team_points_earned: number;
};

export type JoinTeamDataType = TeamDataType & {
    user_id: string;
};

export type ChallengeDataType = {
    challenge_title: string;
    challenge_description: string;
    challenge_points: number;
    challenge_difficulty: string;
    challenge_category: string;
    challenge_flag: string;
};

export type VerifyChallengeRequest = {
    challenge_id: string;
    user_id: string;
    challenge_flag: string;
};

export type AllChallengesTeamVerificationRequest = {
    team_id: string;
};

export type EventType = {
    event_name: string;
    event_description: string;
    event_date: Date;
};

export type ModifyTeamRequest = {
    team_id: string;
    team_name: string;
    team_password: string;
};

export type RemoveUserInTeamRequest = {
    team_id: string;
    user_id: string;
};
