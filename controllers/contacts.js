const {
  listContacts,
  contactById,
  addContact,
  updateContact,
  removeContact,
} = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers/index");
const { addSchema, changeSchema } = require("../schemas/index");

const getAll = async (req, res) => {
  res.status(200).json(await listContacts());
};

// 1-знаходжу об'єкт з зазначеним id, 2-повертаю
const getById = async (req, res) => {
  // 1
  const result = await contactById(req.params.id); // info: contactById повертається null якщо id не знайдений
  if (result === null) {
    throw HttpError(404, "Not found");
  }
  // 2
  res.json(result);
};

// 1-перевіряю поля на валідність, 2-додаю нов. об'єкт до масиву, 3-повертаю нов. об'ект
const add = async (req, res) => {
  // 1
  const { error } = addSchema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  // 2
  const result = await addContact(req.body);
  // 3
  res.status(201).json(result);
};

// 1-перевіряю поля на валідність, 2-змінюю данні, 3-повертаю оновлений контакт
const updateById = async (req, res) => {
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
};

// 1-видаляю об'єкт з зазначеним id, 2-повертаю повідомлення
const deletedById = async (req, res) => {
  // 1
  const result = await removeContact(req.params.id); // info: removeContact повертається null якщо id не знайдений
  if (result === null) {
    throw HttpError(404, "not found");
  }
  // 2
  // res.status(204); // статус 204 відправляється без тіла тому і вказувати його не потрібно.
  res.status(200).json({ message: "contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deletedById: ctrlWrapper(deletedById),
};
