const numero = process.argv[2];
function fizzBuzz(numeroFinal) {
  for (let i = 1; i <= numeroFinal; i++) {
    let valor = "";
    if (i % 3 === 0) valor += "Fizz";
    if (i % 5 === 0) valor += "Buzz";
    console.log(`${i} -- ${valor || i}`);
  }
}

console.log(fizzBuzz(numero));
