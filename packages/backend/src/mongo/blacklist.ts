import { Model, model, Schema } from 'mongoose';


export const raw_schema = {
    steam: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false
    }
}

const schema = new Schema<IBlacklist>(raw_schema);

export type TMBlacklist = Model<IBlacklist>

export const MBlacklist = model<IBlacklist>('blacklist', schema);

export interface IBlacklist {
    steam: string
    status: boolean
}