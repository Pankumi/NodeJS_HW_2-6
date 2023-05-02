const Joi = require("joi"); // перевіряє тіло POST запиту на наявність всіх необхідних полів і їх типи

// шаблон полів в body запиту.
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}); // string() - тип, required() - обов'язкове

const changeSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

module.exports = {
  addSchema,
  changeSchema,
};
