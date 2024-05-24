const express = require("express");
const fs = require("fs");
const app = express();
const port = 8001;

// Middleware para parsear JSON
app.use(express.json());

// Función para leer el archivo JSON
const readDatabase = () => {
  try {
    const data = fs.readFileSync("koders.json", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error leyendo la base de datos:", err);
    return [];
  }
};

// Función para escribir en el archivo JSON
const writeDatabase = (data) => {
  try {
    fs.writeFileSync("koders.json", JSON.stringify(data));
  } catch (err) {
    console.error("Error escribiendo en la base de datos:", err);
  }
};

// Validar los datos de la persona
const validarKoder = (koder) => {
  const { nombre, generacion, genero, edad, activo } = koder;
  if (typeof nombre !== "string" || nombre.trim() === "")
    return "Nombre es requerido y debe ser una cadena no vacía";
  if (typeof generacion !== "number" || generacion <= 0)
    return "Generación es requerida y debe ser un número mayor que 0";
  if (typeof genero !== "string" || genero.trim() === "")
    return "Género es requerido y debe ser una cadena no vacía";
  if (typeof edad !== "number" || edad <= 0)
    return "Edad es requerida y debe ser un número mayor que 0";
  if (typeof activo !== "boolean")
    return "Activo es requerido y debe ser un true o false";
  return null;
};

// Ruta para registrar una nueva persona
app.post("/koders", (req, res) => {
  const nuevoKoder = req.body;
  const errorValidacion = validarKoder(nuevoKoder);
  if (errorValidacion) {
    return res.status(400).json({ message: errorValidacion });
  }
  const koders = readDatabase();
  koders.push(nuevoKoder);
  writeDatabase(koders);
  res.json({ message: "Koder registrado con éxito", koder: nuevoKoder });
});

// Ruta para listar todas las personas
app.get("/koders", (req, res) => {
  const koders = readDatabase();
  res.json(koders);
});

// Ruta para eliminar una persona por nombre
app.delete("/koders/:nombre", (req, res) => {
  const nombre = req.params.nombre.toLowerCase().trim();
  let koders = readDatabase();
  const kodersFiltradas = koders.filter(
    (koder) => koder.nombre.toLowerCase().trim() !== nombre
  );
  if (koders.length === kodersFiltradas.length) {
    return res.status(404).json({
      message: `No se encontró a ninguna koder con el nombre ${nombre}`,
    });
  }
  writeDatabase(kodersFiltradas);
  res.json({ message: `Koders con nombre ${nombre} eliminadas` });
});

// Ruta para eliminar todas las personas
app.delete("/koders", (req, res) => {
  writeDatabase([]);
  res.json({ message: "Todas las koders han sido eliminadas" });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

// Como agreagar a un koder en thunder client
// {
//     "nombre": "Nan",
//     "generacion": 33,
//     "genero": "Mujer",
//     "edad": 20,
//     "activo": true
// }
