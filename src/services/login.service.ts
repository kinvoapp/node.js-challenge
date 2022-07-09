const schemas = require("./schemas");

exports.loginService = async (user: object) => {
  const { error } = schemas.loginSchema.validate(user);

  if (error) return { code: 400, message: error.message };

  return user;
};
