const Joi = require("joi"); // перевіряє тіло POST запиту на наявність всіх необхідних полів і їх типи

const {
  listContacts,
  contactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");
const { HttpError } = require("../helpers/index");

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

  const getAll = async (req, res, next) => {
    try {
      res.status(200).json(await listContacts());
    } catch (error) {
      next(error); // next() - продовжити пошук підходякого обробника далі, next(error) - знайти обробник помилок
    }
  }

  // 1-знаходжу об'єкт з зазначеним id, 2-повертаю
  const getById = async (req, res, next) => {
    try {
      // 1
      const result = await contactById(req.params.id); // info: getById повертається null якщо id не знайдений
      if (result === null) {
        throw HttpError(404, "Not found");
      }
      // 2
      res.json(result);
    } catch (error) {
      next(error);
    }
  };

  // 1-перевіряю поля на валідність, 2-додаю нов. об'єкт до масиву, 3-повертаю нов. об'ект
  const add = async (req, res, next) => {
    try {
      // 1
      const { error } = addSchema.validate(req.body);
      if (error) {
        throw HttpError(400, "missing required name field");
      }
      // 2
      const result = await addContact(req.body);
      // 3
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

// 1-перевіряю поля на валідність, 2-змінюю данні, 3-повертаю оновлений контакт
const updateById = async (req, res, next) => {
    try {
      // 1
      const { error } = changeSchema.validate(req.body);
      if (error) {
        throw HttpError(400, "missing fields");
      }
      // 2
      const result = await updateContact(req.params.id, req.body); // info: updateContact повертається null якщо id не знайдений
      if (result === null) {
        throw HttpError(404, "Not found");
      }
      // 3
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

// 1-видаляю об'єкт з зазначеним id, 2-повертаю повідомлення
const deletedById = async (req, res, next) => {
    try {
      // 1
      const result = await removeContact(req.params.id); // info: removeContact повертається null якщо id не знайдений
      if (result === null) {
        throw HttpError(404, "not found");
      }
      // 2
      // res.status(204); // статус 204 відправляється без тіла тому і вказувати його не потрібно.
      res.status(200).json({ message: "contact deleted" });
    } catch (error) {
      next(error);
    }
  }

  module.exports = {
    getAll,
    getById,
    add,
    updateById,
    deletedById
  }