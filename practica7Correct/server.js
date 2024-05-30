const express = require("express");

const kodersRouter = require("./koders.router");
const mentorsRouter = require("./mentors.router");

// const app = express();
const server = express();

server.use(express.json());

server.use((request, response, next) => {
  console.log("middleware de la aplicacion");
  next();
});

// montar el router en el server
server.use("/koders", kodersRouter);
server.use("/mentors", mentorsRouter);

server.get("/", (request, response) => {
  response.json({
    message: "Kodemia APIv1",
  });
});

module.exports = server;
