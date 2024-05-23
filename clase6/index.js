const http = require("node:http");
const server = http.createServer((req, res) => {
  const method = request.method;
  const url = request.url;

  if (method === "GET" && url === "/") {
    console.log("get");
    responde.end("hola desde get");
  }
});
server.listen(8001, () => {
  console.log("server ready");
});
