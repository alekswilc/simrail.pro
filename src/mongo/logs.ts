import { Model, model, Schema } from 'mongoose';


const schema = new Schema<ILog>(
    {
        id: {
            type: String,
            required: true
        },
        userSteamId: {
            type: String,
            required: true
        },
        userUsername: {
            type: String,
            required: true
        },
        userAvatar: {
            type: String,
            required: true
        },
        joinedDate: {
            type: Number,
            required: false,
            default: undefined
        },
        leftDate: {
            type: Number,
            required: true
        },
        stationName: {
            type: String,
            required: true
        },
        stationShort: {
            type: String,
            required: true
        },
        server: {
            type: String,
            required: true
        },
    }
);
schema.index({ stationName: 'text', userUsername: 'text', stationShort: 'text', userSteamId: 'text' })

export type TMLog = Model<ILog>

export const MLog = model<ILog>('logs', schema);

export interface ILog {
    id: string
    userSteamId: string
    userUsername: string
    userAvatar: string
    joinedDate?: number
    leftDate: number
    stationName: string
    stationShort: string
    server: string
}