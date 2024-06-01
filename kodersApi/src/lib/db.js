const mongoose = require("mongoose");

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
const mongo_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`;

// Conexión a MongoDB
function connect() {
  return mongoose.connect(mongo_URI);
}

module.exports = { connect };
