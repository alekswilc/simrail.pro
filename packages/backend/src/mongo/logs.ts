import { Model, model, Schema } from "mongoose";


export const raw_schema = {
    id: {
        type: String,
        required: true,
    },
    userSteamId: {
        type: String,
        required: true,
    },
    userUsername: {
        type: String,
        required: true,
    },
    userAvatar: {
        type: String,
        required: true,
    },
    joinedDate: {
        type: Number,
        required: false,
        default: undefined,
    },
    leftDate: {
        type: Number,
        required: true,
    },
    stationName: {
        type: String,
        required: true,
    },
    stationShort: {
        type: String,
        required: true,
    },
    server: {
        type: String,
        required: true,
    },
};

const schema = new Schema<ILog>(raw_schema);
schema.index({ stationName: "text", userUsername: "text", stationShort: "text", userSteamId: "text", server: "text" });

export type TMLog = Model<ILog>

export const MLog = model<ILog>("logs", schema);

export interface ILog
{
    id: string;
    userSteamId: string;
    userUsername: string;
    userAvatar: string;
    joinedDate?: number;
    leftDate: number;
    stationName: string;
    stationShort: string;
    server: string;
}