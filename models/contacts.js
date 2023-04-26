// console.log('__dirname >>', __dirname); // ********************************************************************* console.log

const fs = require('fs/promises')
const path = require("path");
const crypto = require("crypto");

// Адреса файлу з контактами
const filename = "contacts.json";
const contactsPath = path.resolve(__dirname, filename);

// ************************ */
const read = async (way) => {
  try {
    const fileData = await fs.readFile(way, "utf-8");
    return JSON.parse(fileData);
  } catch (err) {
    throw new Error("read content >>", err);
  }
};

const write = async (way, content) => {
  const contentJson = JSON.stringify(content);
  try {
    const fileData = await fs.writeFile(way, contentJson, "utf-8");
    return content;
  } catch (err) {
    throw new Error("write content >>", err);
  }
};
// ******************* */

// TODO: повертаю весь список контактів (запит за масивом)
const getContacts = async () => {
  const data = await read(contactsPath);
  if (!Array.isArray(data)) {
    throw new Error("data is not an array");
  }
  return data
}

// TODO: повертаю контакт за id (запит за масивом)
const getContactById = async (contactId) => {
  const data = await read(contactsPath);
  if (!Array.isArray(data)) {
    throw new Error("data is not an array");
  }
  const dataId = data.find((el) => el.id === contactId);
  return dataId;
}

// TODO: видаляю контакт за id (запит за масивом)
const removeContact = async (contactId) => {
  const data = await read(contactsPath);
  if (!Array.isArray(data)) {
    throw new Error("data is not an array");
  }
  const newData = data.filter((el) => el.id !== contactId);
  const returnData = await write(contactsPath, newData);
  return returnData;
}

// TODO: додаю контакт
// const addContact = async (body) => {}
const addContact = async (name, email, phone) => {
  const data = await read(contactsPath);
  if (!Array.isArray(data)) {
    throw new Error("data is not an array");
  }

  const randomString = crypto.randomBytes(10).toString("hex");
  const newContact = {
    id: randomString,
    name: name,
    email: email,
    phone: phone,
  };

  const newData = [...data, newContact];
  const returnData = await write(contactsPath, newData);
  return returnData;
}

const updateContact = async (contactId, body) => {}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
