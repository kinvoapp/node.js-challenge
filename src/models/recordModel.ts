import mongoose, { Schema } from "mongoose";
import ITransaction from "../interfaces/ITransaction";

const RecordSchema:Schema = new Schema({
    desc: {type: String, required: true},
    type: {type: String, required: true},
    value: {type: Number, required: true},
    note: {type: String, required: true},
},{
    timestamps:true
})

export default mongoose.model<ITransaction>('recordModel',RecordSchema)

