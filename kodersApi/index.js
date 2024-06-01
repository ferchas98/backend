require("dotenv").config();
const server = require("./src/server");
const db = require("./src/lib/db");

const port = process.env.PORT || 8080;

// Conexión a MongoDB
db.connect()
  .then(() => {
    console.log("DB conectada");
    server.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error al conectar a la base de datos", error);
  });
