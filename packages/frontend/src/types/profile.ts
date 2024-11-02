export type TProfileResponse = TProfileErrorResponse | TProfileSuccessResponse;

export interface TProfileErrorResponse
{
    success: false;
    data: string;
    code: 404 | 403;
}

export interface TProfileSuccessResponse
{
    success: true;
    data: TProfileData;
    code: 200;
}

export interface TProfileData
{
    player: TProfilePlayer;
    steam: TProfileSteam;
    steamStats: TProfileSteamStats;
}

export interface TProfilePlayer
{
    id: string;
    steam: string;
    steamName: string;
    trainTime: number;
    dispatcherTime: number;
    dispatcherStats: Record<string, TProfileDispatcherStatsRecord>;
    trainStats: Record<string, TProfileTrainStatsRecord>;
    trainDistance: number;
    trainPoints: number;
}

export interface TProfileDispatcherStatsRecord
{
    time: number;
}

export interface TProfileTrainStatsRecord
{
    distance: number;
    score: number;
    time: number;
}

export interface TProfileSteam
{
    personname: string;
    avatarfull: string;
}

export interface TProfileSteamStats
{
    steamID: string;
    gameName: string;
    stats: TProfileSteamStatsAchievementStat[];
    achievements: TProfileSteamStatsAchievement[];
}

export interface TProfileSteamStatsAchievement
{
    name: string;
    achieved: number;
}

export interface TProfileSteamStatsAchievementStat
{
    name: string;
    value: number;
}
