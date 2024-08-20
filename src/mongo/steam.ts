import { Model, model, Schema } from 'mongoose';


export const raw_schema = {
    steam: {
        type: String,
        required: true
    },
    stats: {
        type: Object,
        required: false,
    },
    personaname: {
        type: String,
        required: true,
    },
    avatarfull: {
        type: String,
        required: true,
    },
}

const schema = new Schema<ISteam>(raw_schema);


export type TMSteam = Model<ISteam>

export const MSteam = model<ISteam>('steam', schema);

export interface ISteam {
    steam: string
    stats: object
    personaname: string
    avatarfull: string
    lastUpdated: number
}