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
    console.log("Error read content >>", err);
    return null
  }
};

const write = async (way, content) => {
  const contentJson = JSON.stringify(content);
  try {
    const fileData = await fs.writeFile(way, contentJson, "utf-8");
    return content;
  } catch (err) {
    console.log("Error write content >>", err);
    return null
  }
};
// ******************* */

// TODO: повертаю весь список контактів (запит за масивом)
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
}

// TODO: повертаю контакт за id (запит за масивом)
const getById = async (contactId) => {
  const data = await listContacts();
  const dataId = data.find((el) => el.id === contactId);
  return dataId || null;
}

// TODO: додаю контакт
const addContact = async (newData) => {
  const newContact = {
    id: crypto.randomBytes(10).toString("hex"),
    ...newData
  };

  const contactList = await listContacts();
  contactList.push(newContact);

  await fs.writeFile(contactsPath, JSON.stringify(contactList), "utf-8"); // fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2)); // Що за null, 2)
  return newContact;
}

const updateContact = async (contactId, body) => {

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

module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
}
