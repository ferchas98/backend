require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, PORT } = process.env;
const mongo_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Modelo de datos
const koderSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: false,
    maxLength: 30,
  },
  age: {
    type: Number,
    required: true,
    maxLength: 2,
  },
  email: {
    type: String,
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  generation: {
    type: Number,
    min: 1,
    max: 100,
  },
});

const Koder = mongoose.model("Koder", koderSchema);

// Conexión a MongoDB
mongoose
  .connect(mongo_URI)
  .then(() => {
    console.log("Conexión exitosa a MongoDB");
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos", error);
  });

// Endpoint para crear un nuevo Koder
app.post("/koders", async (req, res) => {
  try {
    const { firstName, lastName, age, email, birthDate, generation } = req.body;

    const newKoder = new Koder({
      firstName,
      lastName,
      age,
      email,
      birthDate,
      generation,
    });

    const savedKoder = await newKoder.save();
    res.status(201).json(savedKoder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const port = PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
