// models/mentors.model.js
const mongoose = require("mongoose");

const modelName = "mentors";

const schema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxLength: 30,
  },
  lastName: {
    type: String,
    required: false,
    maxLength: 30,
  },
  email: {
    type: String,
    required: true,
    match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
  },
  birthDate: {
    type: Date,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model(modelName, schema);
