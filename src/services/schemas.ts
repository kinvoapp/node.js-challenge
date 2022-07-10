const Joi = require("joi");

exports.loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

exports.revenueSchema = Joi.object({
  title: Joi.string().required(),
  value: Joi.number().required(),
  date: Joi.date().required(),
});
