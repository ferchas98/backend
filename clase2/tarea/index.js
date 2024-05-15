const prompt = require("prompt-sync")();

function obtenerNombres() {
  const nombres = [];
  let nombre;
  while (
    (nombre = prompt("Ingrese un nombre (o presione Enter para terminar): "))
  )
    nombres.push(nombre);
  return nombres;
}

function listNames() {
  const nombres = obtenerNombres();
  const cantidadNombres = nombres.length;
  console.log(`Se ingresaron ${cantidadNombres} nombres.`);
  const tieneRepetidos = new Set(nombres).size !== cantidadNombres;
  console.log(
    tieneRepetidos
      ? "Se encontraron nombres repetidos."
      : "No se encontraron nombres repetidos."
  );
  const nombreMasLargo = nombres.reduce((nombreMasLargo, nombre) =>
    nombre.length > nombreMasLargo.length ? nombre : nombreMasLargo
  );
  console.log(`El nombre más largo es: ${nombreMasLargo}`);
  const nombreMasCorto = nombres.reduce((nombreMasCorto, nombre) =>
    nombre.length < nombreMasCorto.length ? nombre : nombreMasCorto
  );
  console.log(`El nombre más corto es: ${nombreMasCorto}`);
}

listNames();
