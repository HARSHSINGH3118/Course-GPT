const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  createCourse,
  getCourses,
  updateCourse,
} = require("../controllers/courseController");

router.post("/", auth, createCourse);
router.get("/", auth, getCourses);
router.put("/:id", auth, updateCourse);

module.exports = router;
