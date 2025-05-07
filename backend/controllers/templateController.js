// backend/controllers/templateController.js
require("dotenv").config();
const Template = require("../models/Template");
const fetch = require("node-fetch");

const HF_TOKEN = process.env.HF_API_TOKEN;
if (!HF_TOKEN) console.warn("⚠️  No HF_API_TOKEN in .env");

exports.generateContent = async (req, res) => {
  const { templateId, variables } = req.body;
  const tpl = await Template.findById(templateId);
  if (!tpl) return res.status(404).json({ msg: "Template not found" });

  // build your prompt
  let prompt = tpl.promptText;
  for (let [k, v] of Object.entries(variables)) {
    prompt = prompt.replace(new RegExp(`{{${k}}}`, "g"), v);
  }

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/bigscience/bloom-560m",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: 300, // adjust as needed
            return_full_text: false,
          },
        }),
      }
    );

    const data = await response.json();
    console.log("HF response:", data);

    // handle the two common shapes
    let content;
    if (Array.isArray(data)) {
      // e.g. [ { generated_text: "..." } ]
      content = data[0]?.generated_text;
    } else if (data.generated_text) {
      // e.g. { generated_text: "..." }
      content = data.generated_text;
    } else if (data.error) {
      throw new Error(data.error);
    }

    if (!content) {
      // log full response for debugging
      console.error("Unexpected HF response shape:", data);
      throw new Error("AI returned no text");
    }

    res.json({ content });
  } catch (err) {
    console.error("HF Inference error:", err);
    res.status(500).json({ msg: err.message || "AI generation failed" });
  }
};
