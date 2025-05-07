// backend/routes/templates.js
const express = require("express"); // ← must be express
const router = express.Router();
const auth = require("../middleware/auth"); // ← your auth middleware
const {
  getTemplates,
  generateContent,
} = require("../controllers/templateController"); // ← your controller exports

// List available templates (protected)
router.get("/", auth, getTemplates);

// Generate content from a template (protected)
router.post("/generate", auth, generateContent);

module.exports = router;
