const Koders = require("../models/koders.model");

async function create(koderData) {
  const newKoder = await Koders.create(koderData);
  return newKoder;
}

async function getAll() {
  const allKoder = await Koders.find();
  return allKoder;
}

async function getById(id) {
  const koder = await Koders.findById(id);
  return koder;
}

async function deleteById(id) {
  const deleteKoder = await Koders.findByIdAndDelete(id);
  return deleteKoder;
}

async function updateById(id, newKoderData) {
  const updatedKoder = await Koders.findByIdAndUpdate(id, newKoderData, {
    new: true,
  });
  return updatedKoder;
}

module.exports = { create, getAll, getById, deleteById, updateById };
