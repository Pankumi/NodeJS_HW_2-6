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

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
}); // шаблон отримуваних полів в тілі POST запиту. string() - тип, required() - обов'язкове

router.get("/", async (req, res, next) => {
  try {
    res.json(await listContacts());
  } catch (error) {
    next(error); // next() - продовжити пошук підходякого обробника далі, next(error) - знайти обробник помилок
    // res.status(500).json({message: "Server error"});
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const result = await getById(req.params.id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try{
    const {error} = addSchema.validate(req.body);
    if(error){
      throw HttpError(400, error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const {error} = addSchema(req.body);
    if (error) {
      throw HttpError(400, error)
    }
    const {id} = res.params;
    const result = await updateContact(id, req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
  res.json({ message: "template message" });
}); // put запит змінює об'єкт шляхом повного перезапису

router.delete("/:id", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
