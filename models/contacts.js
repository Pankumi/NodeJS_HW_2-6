const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

// Адреса файлу з контактами
const filename = "contacts.json";
const contactsPath = path.resolve(__dirname, filename);

// TODO: повертаю весь список контактів (запит за масивом)
const listContacts = async () => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

// TODO: повертаю контакт за id (запит за масивом)
const contactById = async (contactId) => {
  const data = await listContacts();
  const dataId = data.find((el) => el.id === contactId);
  return dataId || null;
};

// TODO: додаю контакт
// 1-створ. контакт, 2-дістаю всі контакти і додаю новий, 3-зберігаю оновлений масив контактів
const addContact = async (formData) => {
  const newContact = {
    id: crypto.randomBytes(10).toString("hex"),
    ...formData,
  };

  const contactList = await listContacts();
  contactList.push(newContact);

  await fs.writeFile(
    contactsPath,
    JSON.stringify(contactList, null, "\t"),
    "utf-8"
  ); // fs.writeFile(contactsPath, JSON.stringify(contactList, null, 2)); // Що за null, 2)
  return newContact;
};

// TODO: змінюю контакт
// 1-дістаю масив контакти і знаходжу індекс потрібного, 2-змінюю потрібний контакт 3-зберігаю оновлений масив контактів 4-повертаю оновлений контакт
const updateContact = async (contactId, body) => {
  // 1
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  // 2
  data[index] = { ...data[index], ...body };
  // 3
  fs.writeFile(contactsPath, JSON.stringify(data, null, "\t"), "utf-8");
  // 4
  return data[index];
};

// TODO: видаляю контакт за id
// 1-дістаю масив і створюю новий без вказаного id, 2-зберігаю новий масив, 3-повертаю новий масив
const removeContact = async (contactId) => {
  // 1
  const data = await listContacts();
  const newData = data.filter((item) => {
    return item.id !== contactId;
  });
  if (data.length === newData.length) {
    return null;
  }
  // 2
  await fs.writeFile(
    contactsPath,
    JSON.stringify(newData, null, "\t"),
    "utf-8"
  );
  // 3
  return newData;
};

module.exports = {
  listContacts,
  contactById,
  addContact,
  updateContact,
  removeContact,
};
