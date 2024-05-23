const fs = require("fs");

const dbFile = "data.json";

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
  if (newData.length !== getData().length) {
    updateData(newData);
    console.log(`Nombre removido: ${koder}`);
  } else {
    console.error("Koder no encontrado:", koder);
  }
}

function ls() {
  const data = getData();
  if (!data.length) {
    console.log("[Vacio]");
  } else {
    data.forEach((koder, i) => console.log(`${i} - ${koder}`));
  }
}

function reset() {
  updateData([]);
  console.log("BD vacio");
}

function main() {
  const [command, arg] = process.argv.slice(2);

  crearData();

  switch (command) {
    case "ls":
      ls();
      break;
    case "add":
      if (!arg) {
        console.error("Koder no fue agregado!");
        process.exit(1);
      } else {
        add(arg);
        console.log(`Koder agregado ${ls()}`);
      }
      break;
    case "rm":
      if (!arg) {
        console.error(
          "El nombre del código a eliminar es necesario, pero si desea eliminar todos los nombres, debe escribir reset."
        );
        process.exit(1);
      }
      rm(arg);
      console.log(`Nombre removido ${ls()}`);
      break;
    case "reset":
      reset();
      break;
    default:
      console.error("Comando invalido: ", command);
      process.exit(1);
  }
}

main();
