export interface TStationResponse
{
    success: boolean;
    data: TStationData;
    code: number;
}

export interface TStationData
{
    records: TStationRecord[];
}

export interface TStationRecord
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
    verified: boolean;
}