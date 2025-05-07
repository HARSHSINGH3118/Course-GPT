const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getTemplates,
  generateContent,
} = require("../controllers/templateController");

router.get("/", auth, getTemplates);
router.post("/generate", auth, generateContent);

module.exports = router;
