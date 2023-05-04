const express = require("express");
const {
  getAll,
  getById,
  add,
  updateById,
  deletedById,
} = require("../../controllers/contacts");

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);

router.post("/", add);

// put - запит змінює об'єкт (шляхом повного перезапису масиву)
router.put("/:id", updateById);

router.delete("/:id", deletedById);

module.exports = router;
