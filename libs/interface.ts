export interface _TeamData {
    [x: string]: any;
    status: number;
    message: string;
    data: {
        team_name: string;
        team_leader: {
            _id: string;
            user_name: string;
        };
        team_members: [
            {
                _id: string;
                user_name: string;
                user_points_earned: number;
                user_challenges_completed: [];
                user_team: string;
            }
        ];
        team_challenges_completed: [];
        team_points_earned: number;
        team_mvp_user: [
            {
                _id: string;
                user_name: string;
                user_points_earned: number;
                user_challenges_completed: number;
                user_team: string;
            }
        ];
    };
}

export interface _CreateTeamRequest {
    teamName: string;
    teamPassword: string;
    teamLeader: string;
}

export interface _JoinTeamRequest {
    teamName: string;
    teamPassword: string;
    userId: string;
}

export interface _CreateTeamResponse {
    _id: string;
    teamName: string;
    teamLeader: string;
    teamPoints: number;
    teamMembers: [
        {
            userId: string;
        }
    ];
    challengesAnswered: [
        {
            challengeId: string;
        }
    ];
}

export interface ChallengeDataResponse {
    status: number;
    challenges: ChallengeCategory[];
}

export interface ChallengeCategory {
    [key: string]: ChallengesData[];
}

export interface ChallengesData {
    [x: string]: any;
    _id: string;
    challenge_title: string;
    challenge_description: string;
    challenge_points: number;
    challenge_difficulty: string;
    challenge_category: string;
    solve: number;
    status: string;
}

