const server = require("./server.js");
const db = require("./db.js");

const port = 8001;

db.init();

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
