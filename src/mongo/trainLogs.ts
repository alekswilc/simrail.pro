import { Model, model, Schema } from 'mongoose';


export const raw_schema = {
    id: {
        type: String,
        required: true
    },
    trainNumber: {
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
    distance: {
        type: Number,
        required: false,
        default: 0
    },
    points: {
        type: Number,
        required: false,
        default: 0
    },
    server: {
        type: String,
        required: true
    },
    trainName: {
        type: String,
        default: null
    }
}

const schema = new Schema<ITrainLog>(raw_schema);

export type TMTrainLog = Model<ITrainLog>

export const MTrainLog = model<ITrainLog>('train_logs', schema);

export interface ITrainLog {
    id: string
    userSteamId: string
    userUsername: string
    userAvatar: string
    joinedDate?: number
    leftDate: number
    trainNumber: string
    trainName: string
    distance: number
    points: number
    server: string
}