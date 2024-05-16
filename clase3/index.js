//crear un archivo
// import * as fs from "node:fs";
// const fs = require("node:fs");
// fs.writeFileSync("hola.txt", "Hola fernando");

//crear un archivo , con un extra
// const fs = require("node:fs");
// const script = `
// const fs = require("node:fs");
// fs.writeFileSync("hola2.txt", "Hola fernando");
// `;
// fs.writeFileSync("crear.js", script);

//leer un archivo
// const fs = require("node:fs");

// const valor = fs.readFileSync("hola.txt", "utf8");
// console.log(valor);

//crear un directorio
const fs = require("node:fs");

if (fs.existsSync("NewFile")) {
  console.log("El directorio ya ha sido creado");
} else {
  fs.mkdir("NewFile", (error) => {
    if (error) {
      console.log(error.message);
    }
    console.log("Directorio creado");
  });
}
