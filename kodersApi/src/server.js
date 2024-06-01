const express = require("express");
const koderRouter = require("./routes/koders.router");
const mentorRouter = require("./routes/mentors.router");

const app = express();

// Middleware para parsear JSON
app.use(express.json());

app.use("/koders", koderRouter);
app.use("/mentors", mentorRouter);

// Endpoint de prueba
app.get("/", (req, res) => {
  res.json({
    message: "koders API v1",
  });
});

module.exports = app;
