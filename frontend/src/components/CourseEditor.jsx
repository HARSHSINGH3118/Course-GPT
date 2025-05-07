import React, { useState, useEffect } from "react";
import {
  fetchTemplates,
  generateContent,
  updateCourse,
} from "../services/api.js";
import { FiX, FiRefreshCw } from "react-icons/fi";

export default function CourseEditor({ course, onClose, onSaved }) {
  const [templates, setTemplates] = useState([]);
  const [templateId, setTemplateId] = useState("");
  const [vars, setVars] = useState({});
  const [content, setContent] = useState(course.content || "");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTemplates().then((res) => setTemplates(res.data));
  }, []);

  const placeholders =
    templates
      .find((t) => t._id === templateId)
      ?.promptText.match(/{{\s*\w+\s*}}/g)
      .map((m) => m.replace(/[{}]/g, "").trim()) || [];

  const gen = async () => {
    setLoading(true);
    const res = await generateContent({ templateId, variables: vars });
    setContent(res.data.content);
    setLoading(false);
  };

  const save = async () => {
    await updateCourse(course._id, { content });
    onSaved();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <FiX size={24} />
        </button>
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">{course.title}</h2>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Template</label>
            <select
              className="w-full border p-2 rounded"
              onChange={(e) => {
                setTemplateId(e.target.value);
                setVars({});
              }}
            >
              <option value="">Select a template</option>
              {templates.map((t) => (
                <option key={t._id} value={t._id}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {placeholders.length > 0 &&
            placeholders.map((key) => (
              <div className="mb-4" key={key}>
                <label className="block mb-1">{key}</label>
                <input
                  type="text"
                  className="w-full border p-2 rounded"
                  value={vars[key] || ""}
                  onChange={(e) =>
                    setVars((v) => ({ ...v, [key]: e.target.value }))
                  }
                />
              </div>
            ))}

          <div className="flex gap-3 mb-4">
            <button
              onClick={gen}
              disabled={loading}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
            >
              <FiRefreshCw className="mr-2 animate-spin" />{" "}
              {loading ? "Generating…" : "Generate"}
            </button>
            <button
              onClick={save}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Save
            </button>
          </div>

          <textarea
            className="w-full h-48 border p-3 rounded resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
