const express = require("express");
const Joi = require("joi"); // перевіряє тіло POST запиту на наявність всіх необхідних полів і їх типи

const {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");
const { HttpError } = require("../../helpers/index");

const router = express.Router();

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

router.get("/", async (req, res, next) => {
  try {
    res.status(200).json(await listContacts());
  } catch (error) {
    next(error); // next() - продовжити пошук підходякого обробника далі, next(error) - знайти обробник помилок
  }
});

// 1-знаходжу об'єкт з зазначеним id, 2-повертаю
router.get("/:id", async (req, res, next) => {
  try {
    // 1
    const result = await getById(req.params.id); // info: getById повертається null якщо id не знайдений
    if (result === null) {
      throw HttpError(404, "Not found");
    }
    // 2
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// 1-перевіряю поля на валідність, 2-додаю нов. об'єкт до масиву, 3-повертаю нов. об'ект
router.post("/", async (req, res, next) => {
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
});

// put - запит змінює об'єкт (шляхом повного перезапису масиву)
// 1-перевіряю поля на валідність, 2-змінюю данні, 3-повертаю оновлений контакт
router.put("/:id", async (req, res, next) => {
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
});

// 1-видаляю об'єкт з зазначеним id, 2-повертаю повідомлення
router.delete("/:id", async (req, res, next) => {
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
});

module.exports = router;
