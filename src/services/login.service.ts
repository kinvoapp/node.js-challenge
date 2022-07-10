const schemas = require("./schemas");
const { userModel } = require("../models/index.models");
const { generateToken } = require("../middlewares/auth");

exports.loginService = async (email: string, password: string) => {
  const { error } = schemas.loginSchema.validate({ email, password });

  if (error) return { code: 400, message: error.message };

  const user = await userModel.find({
    email,
  });

  return user.length > 0
    ? generateToken({ email: user[0].email })
    : { code: 400, message: "User no register" };
};
