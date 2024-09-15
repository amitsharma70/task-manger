const Joi = require('joi');

const taskValidation = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    completed: Joi.boolean().optional()
  });

  return schema.validate(data);
};

module.exports = taskValidation;
