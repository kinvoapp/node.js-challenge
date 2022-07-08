import mongoose, { Schema } from "mongoose";
import ITransaction from "../interfaces/ITransaction";

const RecordSchema:Schema = new Schema({
    desc: {type: String},
    type: {type: String},
    value: {type: Number},
    note: {type: String},
},{
    timestamps:true
})

export default mongoose.model<ITransaction>('recordModel',RecordSchema)

