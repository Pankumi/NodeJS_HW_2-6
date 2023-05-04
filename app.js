const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json()); // перевіряє чи є в запиті body в форматі application/json якщо так то ця мідлвара за допомогою json.parse перетворить строку на об'єкт

app.use("/api/contacts", contactsRouter); // всі запити які починаються з /api/contacts шукати в contactsRouter

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json(err.message);
  }
  console.log(err);
  res.status(500).json({ message: "Server error" });
});

module.exports = app;
