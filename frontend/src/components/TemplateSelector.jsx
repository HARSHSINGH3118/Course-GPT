import { useEffect, useState } from "react";
import { fetchTemplates } from "../services/api";

export default function TemplateSelector({ onSelect }) {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchTemplates().then((res) => setTemplates(res.data));
  }, []);

  return (
    <select
      className="border p-2 rounded mb-2"
      onChange={(e) => onSelect(e.target.value)}
    >
      <option value="">Select template</option>
      {templates.map((t) => (
        <option key={t._id} value={t._id}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
