export interface TLogResponse
{
    success: boolean;
    data: TLogTrainData | TLogStationData;
    code: number;
}

export interface TLogTrainData
{
    id: string;
    trainNumber: string;
    userSteamId: string;
    userUsername: string;
    userAvatar: string;
    leftDate: number;
    distance: number;
    points: number;
    server: string;
    trainName: string;
    joinedDate?: number;

}

export interface TLogStationData
{
    id: string;
    userSteamId: string;
    userUsername: string;
    userAvatar: string;
    leftDate: number;
    stationName: string;
    stationShort: string;
    server: string;
    joinedDate?: number;
}
