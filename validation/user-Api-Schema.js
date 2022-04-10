import Joi from "joi";

const userApiSchema = Joi.object().keys({
  firstName: Joi.string().max(255).required(),
  lastName: Joi.string().max(255).required(),
  age: Joi.number().integer().min(1).required(),
});

function ValidateUserApiSchema(userSubmitted) {
  return userApiSchema.validate(userSubmitted);
}

export default ValidateUserApiSchema;
