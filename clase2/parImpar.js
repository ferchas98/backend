console.log(process.argv);
const numero = parseInt(process.argv[2]);
function esParOImpar(numero) {
  if (numero % 2 === 0) {
    return "par";
  } else {
    return "impar";
  }
}
console.log(esParOImpar(numero));
