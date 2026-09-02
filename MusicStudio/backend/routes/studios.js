const express = require("express");
const router = express.Router();
const {
  getAllStudios,
  getStudioById,
} = require("../controllers/studiosController.js");

router.get("/", getAllStudios);
router.get("/:id", getStudioById);

module.exports = router;
