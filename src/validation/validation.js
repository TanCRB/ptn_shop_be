const Joi = require("joi");

const userValidation = (data) => {
  const Schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required().min(10).max(12),
    email: Joi.string().pattern(new RegExp('gmail.com')).email().lowercase().required(),
    password: Joi.string().min(8).required()
  });

  return Schema.validate(data);
};

module.exports = userValidation;
