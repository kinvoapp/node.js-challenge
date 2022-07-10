const crypto = require("crypto");

exports.cryptograph = (password: string) => {
  const encrypted = crypto.createHash("md5").update(password).digest("hex");

  return encrypted;
};
