import { Model, model, Schema } from 'mongoose';


export const raw_schema = {
    id: {
        type: String,
        required: true
    },
    steam: {
        type: String,
        required: true
    },
    trainStats: {
        type: Object,
        required: false,
        default: {}
    },
    dispatcherStats: {
        type: Object,
        required: false,
        default: {}
    },
}

const schema = new Schema<IProfile>(raw_schema);


export type TMProfile = Model<IProfile>

export const MProfile = model<IProfile>('profile', schema);

export interface IProfile {
    id: string
    steam: string
    trainStats: {
        [trainName: string]: {
            score: number,
            distance: number
        }
    }
    dispatcherStats: {
        [name: string]: {
            time: number
        }
    }
}