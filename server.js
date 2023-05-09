
const mongoose = require("mongoose");

const app = require("./app");

const DB_HOST = "mongodb+srv://NodeJsLogin:KeMMzECD1uNqAvC6@nodejscluster.e4sl6l7.mongodb.net/contacts_db?retryWrites=true&w=majority"; // <password> замінюємо на пароль, я між /? вставляєм назву БД

mongoose.set('strictQvery', true); // За замовчуванням false - будь-які запити до бази даних, які включають поля, не описані в моделі Mongoose, будуть проігноровані без повідомлення про помилку. true - будуть відхилятись з помилкою, що може допомогти забезпечити правильність виконання запитів до бази даних та уникнути помилок через неправильну структуру запиту.

mongoose.connect(DB_HOST)
.then( ()=>{
  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
} )
.catch( error => {
  console.log(error);
  process.exit(1); // process.exit() - закриває запущєні процеси 1 - закрити з невідомою помилкою.
})