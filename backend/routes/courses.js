// backend/routes/courses.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createCourse,
  getCourses,
  updateCourse,
} = require("../controllers/courseController");

// Create a new course
router.post("/", auth, createCourse);

// List all courses for the logged-in user
router.get("/", auth, getCourses);

// Update an existing course by ID
router.put("/:id", auth, updateCourse);

module.exports = router;
