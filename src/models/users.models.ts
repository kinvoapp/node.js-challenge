const mgs = require("mongoose");

const userSchema = mgs.Schema({
  id: { type: Number || null },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

module.exports = mgs.model("User", userSchema);
