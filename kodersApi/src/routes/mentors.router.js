// routes/mentors.router.js
const express = require("express");
const mentorsUseCase = require("../usecases/mentors.usecases");

const router = express.Router();

// GET all mentors
router.get("/", async (request, response) => {
  try {
    const mentors = await mentorsUseCase.getAll();

    response.json({
      success: true,
      message: "All mentors",
      data: {
        mentors,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// GET mentor by ID
router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const mentor = await mentorsUseCase.getById(id);

    response.json({
      success: true,
      message: "Mentor by id",
      data: {
        mentor,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST create a new mentor
router.post("/", async (request, response) => {
  try {
    const newMentor = await mentorsUseCase.create(request.body);

    response.status(201).json({
      success: true,
      message: "Mentor added",
      data: {
        mentor: newMentor,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE mentor by ID
router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const mentorDeleted = await mentorsUseCase.deleteById(id);

    response.json({
      success: true,
      message: "Mentor deleted",
      data: {
        mentor: mentorDeleted,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// PATCH update mentor by ID
router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const mentorUpdated = await mentorsUseCase.updateById(id, request.body);

    response.json({
      success: true,
      message: "Mentor updated",
      data: {
        mentor: mentorUpdated,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
