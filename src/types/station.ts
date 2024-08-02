import { ISimrailPayload } from './payload.js';

export type IStation = {
    Name: string;
    Prefix: string;
    DifficultyLevel: number;
    Latititude: number;
    Longitude: number;
    MainImageURL: string;
    AdditionalImage1URL: string;
    AdditionalImage2URL: string;
    DispatchedBy: IStationDispatch[];
}

export type IStationDispatch = {
    ServerCode: string,
    SteamId: number
}

export type IStationPayload = {
    data: IStation[];
    count: number;
} & ISimrailPayload;