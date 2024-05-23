const express = require("express");
const server = express();
const port = 8002;

//habilita el server para poder pedir peticiones en json
server.use(express.json());

const todos = [];

//lista de toDos
server.get("/todos", (req, res) => {
  res.json({
    message: "all todos",
    todos: todos,
  });
});

//agregar un todo
server.post("/todos", (req, res) => {
  const newTodo = req.body.todo;

  if (!newTodo) {
    res.status(400);
    res.json({
      message: "todo is required",
    });
    return;
  }

  todos.push(newTodo);
  res.json({
    message: "new todo added",
    todos: todos,
  });
});

//eliminar un todo
server.delete("/todos/:idx", (req, res) => {
  const idxtoDo = req.params.idx;
  const idxInteger = parseInt(idxtoDo);

  if (isNaN(idxInteger)) {
    res.status(400);
    res.json({
      message: "invalid index",
    });
    return;
  }

  if (idxInteger < 0 || idxInteger >= todos.length) {
    res.status(400);
    res.json({
      message: "invalid index, fuera de lugar",
    });
    return;
  }
  todos.splice(idxInteger, 1);

  res.json({
    message: "todo deleted",
    todos: todos,
  });
});

server.listen(port, () => {
  console.log("server running con puerto 8002");
});
