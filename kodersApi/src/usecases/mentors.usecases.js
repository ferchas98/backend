// usecases/mentors.usecases.js
const Mentors = require("../models/mentors.model");

async function create(mentorData) {
  const newMentor = await Mentors.create(mentorData);
  return newMentor;
}

async function getAll() {
  const allMentors = await Mentors.find();
  return allMentors;
}

async function getById(id) {
  const mentor = await Mentors.findById(id);
  return mentor;
}

async function deleteById(id) {
  const deletedMentor = await Mentors.findByIdAndDelete(id);
  return deletedMentor;
}

async function updateById(id, newMentorData) {
  const updatedMentor = await Mentors.findByIdAndUpdate(id, newMentorData, {
    new: true,
  });
  return updatedMentor;
}

module.exports = { create, getAll, getById, deleteById, updateById };
