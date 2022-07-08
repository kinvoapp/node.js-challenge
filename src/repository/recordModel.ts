import mongoose, { Schema } from "mongoose";

const recordModel = new Schema({
    desc: String,
    type: String,
    value: Number,
    note: String
},{
    timestamps:true
})

export default mongoose.model('recordModel',recordModel)

