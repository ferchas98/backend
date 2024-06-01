const express = require("express");
const kodersUseCase = require("../usecases/koders.usecases");

const router = express.Router();

// GET
router.get("/", async (request, response) => {
  try {
    const koders = await kodersUseCase.getAll();

    response.json({
      success: true,
      message: "All koders",
      data: {
        koders,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

router.get("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const koder = await kodersUseCase.getById(id);

    response.json({
      success: true,
      message: "Koder by id",
      data: {
        koder,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// POST
router.post("/", async (request, response) => {
  try {
    const newKoder = await kodersUseCase.create(request.body);

    response.status(201).json({
      success: true,
      message: "Koder added",
      data: {
        koder: newKoder,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// DELETE
router.delete("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const koderDelete = await kodersUseCase.deleteById(id);

    response.json({
      success: true,
      message: "Koder deleted",
      data: {
        koder: koderDelete,
      },
    });
  } catch (error) {
    response.status(error.status || 500).json({
      success: false,
      error: error.message,
    });
  }
});

// PATCH
router.patch("/:id", async (request, response) => {
  try {
    const id = request.params.id;
    const koderUpdate = await kodersUseCase.updateById(id, request.body);

    response.json({
      success: true,
      message: "Koder updated",
      data: {
        koder: koderUpdate,
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
