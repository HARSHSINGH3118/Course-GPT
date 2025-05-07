// frontend/src/components/CourseEditor.jsx
import React, { useState, useEffect } from "react";
import {
  fetchTemplates,
  generateContent,
  updateCourse,
} from "../services/api.js";
export default function CourseEditor({ course, onSaved }) {
  // guard against missing prop
  if (!course) return null;

  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [variables, setVariables] = useState({});
  const [content, setContent] = useState(course.content || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // load templates on mount
  useEffect(() => {
    async function loadTemplates() {
      try {
        const res = await fetchTemplates();
        setTemplates(res.data);
      } catch (err) {
        console.error("Failed to load templates", err);
      }
    }
    loadTemplates();
  }, []);

  // parse {{foo}} placeholders
  const getPlaceholders = (prompt) => {
    const matches = prompt.match(/{{\s*[\w]+\s*}}/g) || [];
    return matches.map((m) => m.replace(/[{}]/g, "").trim());
  };

  const selectedTemplate = templates.find((t) => t._id === templateId);
  const placeholders = selectedTemplate
    ? getPlaceholders(selectedTemplate.promptText)
    : [];

  const handleVarChange = (key) => (e) => {
    setVariables((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleGenerate = async () => {
    if (!templateId) {
      setError("Please select a template.");
      return;
    }
    for (let key of placeholders) {
      if (!variables[key]) {
        setError(`Please fill in "${key}".`);
        return;
      }
    }
    setError("");
    setLoading(true);
    try {
      const res = await generateContent({ templateId, variables });
      setContent(res.data.content);
    } catch (err) {
      console.error(err);
      setError("Generation failed – check console.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateCourse(course._id, { content });
      onSaved();
    } catch (err) {
      console.error(err);
      setError("Save failed – check console.");
    }
  };

  return (
    <div className="border p-4 rounded mb-4">
      <h2 className="text-xl font-semibold mb-2">{course.title}</h2>

      <label className="block mb-1 font-medium">Template:</label>
      <select
        className="w-full border p-2 rounded mb-4"
        value={templateId}
        onChange={(e) => {
          setTemplateId(e.target.value);
          setVariables({});
          setError("");
        }}
      >
        <option value="">-- select one --</option>
        {templates.map((t) => (
          <option key={t._id} value={t._id}>
            {t.name}
          </option>
        ))}
      </select>

      {placeholders.length > 0 && (
        <div className="mb-4">
          {placeholders.map((key) => (
            <div key={key} className="mb-2">
              <label className="block mb-1">{key}:</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={variables[key] || ""}
                onChange={handleVarChange(key)}
              />
            </div>
          ))}
        </div>
      )}

      {error && <div className="text-red-500 mb-2">{error}</div>}

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleGenerate}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Generating…" : "Generate"}
        </button>
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </div>

      <textarea
        className="w-full border p-2 rounded"
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
