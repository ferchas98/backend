const express = require("express");
const server = express();
const port = 8001;

const koders = [
  {
    name: "fernando",
    age: 26,
  },
  {
    name: "carlos",
    age: 26,
  },
  {
    name: "lalo",
    age: 26,
  },
  {
    name: "jorgito",
    age: 26,
  },
];

//habilita el server para poder pedir peticiones en json
server.use(express.json());

server.get("/", (req, res) => {
  console.log("get root");
  // res.end("Hola desde root get");

  res.writeHead(200, { "Content-Type": "text/plain", "yo-soy": "ferchas" });
  res.end("Hola fernando desde un resp mejorado");
});

server.post("/koders", (req, res) => {
  console.log("body", req.body);
  const newKoderName = req.body.name;
  const newkoderage = req.body.age;

  const newKoder = {
    name: newKoderName,
    age: newkoderage,
  };
  koders.push(newKoder);
  res.json(koders);
});

server.get("/koders", (req, res) => {
  // console.log("get root koders");
  // res.writeHead(200, { "Content-Type": "application/json" });
  // res.end(JSON.stringify(koders));

  res.status(200);
  res.json(koders);
});

server.listen(port, () => {
  console.log("server ready");
});
