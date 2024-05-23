const express = require("express");
const fs = require("fs");
const app = express();
const port = 3000;

const dbFile = "data.json";

// Middleware para parsear JSON
app.use(express.json());

function crearData() {
  if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, JSON.stringify({ koders: [] }));
  }
}

function getData() {
  return JSON.parse(fs.readFileSync(dbFile, "utf-8")).koders;
}

function updateData(data) {
  fs.writeFileSync(dbFile, JSON.stringify({ koders: data }));
}

function add(koder) {
  updateData([...getData(), koder]);
}

function rm(koder) {
  const newData = getData().filter(
    (k) => k.toLowerCase() !== koder.toLowerCase()
  );
  updateData(newData);
}

function reset() {
  updateData([]);
}

// Crear datos iniciales si no existen
crearData();

// Ruta para listar todos los koders
app.get("/koders", (req, res) => {
  const data = getData();
  res.json(data.length ? data : "[Vacio]");
});

// Ruta para agregar un koder
app.post("/koders", (req, res) => {
  const { koder } = req.body;
  if (!koder) {
    res.status(400).send("Koder no fue agregado!");
    return;
  }
  add(koder);
  res.send(`Koder agregado: ${koder}`);
});

// Ruta para eliminar un koder
app.delete("/koders/:koder", (req, res) => {
  const { koder } = req.params;
  const data = getData();
  if (!data.find((k) => k.toLowerCase() === koder.toLowerCase())) {
    res.status(404).send("Koder no encontrado!");
    return;
  }
  rm(koder);
  res.send(`Nombre removido: ${koder}`);
});

// Ruta para reiniciar la base de datos
app.delete("/koders", (req, res) => {
  reset();
  res.send("BD vacia");
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
