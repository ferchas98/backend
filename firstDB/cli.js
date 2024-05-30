require("dotenv").config();
const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const mongo_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

//modelo datos
const koder = mongoose.model(
  "koder",
  new mongoose.Schema({
    firstName: {
      type: String,
      require: true,
      maxLenght: 30,
    },
    lastName: {
      type: String,
      require: false,
      maxLenght: 30,
    },
    age: {
      type: Number,
      require: true,
      maxLenght: 2,
    },
    email: {
      type: String,
      require: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
    },
    birthDate: {
      type: Date,
      require: false,
    },
    generation: {
      type: Number,
      min: 1,
      max: 100,
    },
  })
);

mongoose
  .connect(mongo_URI)
  .then(() => {
    console.log("conexion exitosa");
    //insertar
    koder
      .create({
        firstName: "fernando",
        lastName: "ocampo",
        email: "fer@hotmail.com",
        birthDate: new Date("1995-06-29"),
        generation: 33,
      })
      .then(() => {
        console.log("koder creado");
      })
      .catch((error) => {
        console.error("error al crear al crear al koder", error);
      });
  })
  .catch((error) => {
    console.error("error al conectar a la base de datos", error);
  });

console.log("hola desde el otro lado del charco");
