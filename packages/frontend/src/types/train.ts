export interface TTrainResponse
{
    success: boolean;
    data: TTrainData;
    code: number;
}

export interface TTrainData
{
    records: TTrainRecord[];
}

export interface TTrainRecord
{
    id: string;
    trainNumber: string;
    userSteamId: string;
    userUsername: string;
    userAvatar: string;
    joinedDate?: number;
    leftDate: number;
    distance: number;
    points: number;
    server: string;
    trainName: string;
    verified: boolean;
}

