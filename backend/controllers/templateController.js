// backend/controllers/templateController.js
require("dotenv").config();
const Template = require("../models/Template");
const { CohereClient } = require("cohere-ai");

// Initialize the Cohere client
const cohere = new CohereClient({ apiKey: process.env.COHERE_API_KEY });
if (!process.env.COHERE_API_KEY) {
  console.warn("⚠️  No COHERE_API_KEY in .env");
}

exports.getTemplates = async (req, res) => {
  try {
    const templates = await Template.find();
    res.json(templates);
  } catch (err) {
    console.error("Error fetching templates:", err);
    res.status(500).json({ msg: "Failed to load templates" });
  }
};

exports.generateContent = async (req, res) => {
  const { templateId, variables } = req.body;
  try {
    const tpl = await Template.findById(templateId);
    if (!tpl) return res.status(404).json({ msg: "Template not found" });

    // Fill placeholders into the prompt
    let prompt = tpl.promptText;
    for (let [key, val] of Object.entries(variables)) {
      prompt = prompt.replace(new RegExp(`{{${key}}}`, "g"), val);
    }

    // Request generation from Cohere
    const response = await cohere.generate({
      model: "xlarge", // free-tier model; you can choose 'small' or 'medium' too
      prompt,
      maxTokens: 200,
      temperature: 0.7,
    });

    console.log("Cohere response:", response);

    // Extract the generated text
    const generations = response.generations || response.body?.generations;
    if (!Array.isArray(generations) || !generations[0]?.text) {
      console.error("Cohere returned no text:", response);
      return res.status(500).json({ msg: "AI returned no content" });
    }

    const content = generations[0].text.trim();
    res.json({ content });
  } catch (err) {
    console.error("TemplateController.generateContent error:", err);
    res.status(500).json({ msg: err.message || "AI generation failed" });
  }
};
