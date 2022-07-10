"use strict";
const mgs = require("mongoose");
const userSchema = mgs.Schema({
    id: { type: Number || null },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
});
const revenueSchema = mgs.Schema({
    id: { type: Number || null },
    title: { type: String, required: true },
    value: { type: Number, required: true },
    date: { type: Date, required: true },
});
exports.userModel = mgs.model("User", userSchema);
exports.revenueModel = mgs.model("Revenue", revenueSchema);
