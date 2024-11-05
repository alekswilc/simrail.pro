import { Model, model, Schema } from "mongoose";


export const raw_schema = {
    id: {
        type: String,
        required: true,
    },
    steam: {
        type: String,
        required: true,
    },
    steamName: {
        type: String,
        required: true,
    },

    trainStats: {
        type: Object,
        required: false,
        default: {},
    },
    dispatcherStats: {
        type: Object,
        required: false,
        default: {},
    },
    trainTime: {
        type: Number,
        required: false,
        default: 0,
    },
    trainPoints: {
        type: Number,
        required: false,
        default: 0,
    },
    trainDistance: {
        type: Number,
        required: false,
        default: 0,
    },
    dispatcherTime: {
        type: Number,
        required: false,
        default: 0,
    },
};

const schema = new Schema<IProfile>(raw_schema);


export type TMProfile = Model<IProfile>

export const MProfile = model<IProfile>("profile", schema);

export interface IProfile
{
    id: string;
    steam: string;
    trainStats: {
        [ trainName: string ]: {
            score: number,
            distance: number
            time: number,
        }
    };
    dispatcherStats: {
        [ name: string ]: {
            time: number
        }
    };

    dispatcherTime: number;
    trainTime: number;
    trainPoints: number;
    steamName: string;
    trainDistance: number;
}