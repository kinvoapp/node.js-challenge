"use strict";
const crypto = require("crypto");
exports.cryptograph = (password) => {
    const encrypted = crypto.createHash("md5").update(password).digest("hex");
    return encrypted;
};
