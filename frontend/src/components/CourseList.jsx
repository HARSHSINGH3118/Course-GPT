// frontend/src/components/CourseList.jsx
import React, { useEffect, useState } from "react";
import { fetchCourses, createCourse } from "../services/api.js";
import CourseEditor from "./CourseEditor.jsx";

export default function CourseList() {
  const [courses, setCourses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState("");

  // load courses once
  useEffect(() => {
    async function load() {
      try {
        const res = await fetchCourses();
        setCourses(res.data);
      } catch (err) {
        console.error("Failed to load courses", err);
        setError("Could not load courses");
      }
    }
    load();
  }, []);

  // create a new course stub
  const handleAdd = async () => {
    try {
      const res = await createCourse({ title: "New Course" });
      setEditing(res.data); // pass this object into the editor
    } catch (err) {
      console.error("Failed to create course", err);
      setError("Could not create course");
    }
  };

  // after save, clear editor and reload list
  const reloadCourses = async () => {
    try {
      const res = await fetchCourses();
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // If we're editing, show only the editor
  if (editing) {
    return (
      <CourseEditor
        course={editing} // ← must be `course`, not some other prop
        onSaved={() => {
          setEditing(null);
          reloadCourses();
        }}
      />
    );
  }

  // Otherwise show list + add button
  return (
    <div>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <button
        onClick={handleAdd}
        className="bg-purple-500 text-white px-3 py-1 rounded mb-4"
      >
        + New Course
      </button>
      <div className="space-y-2">
        {courses.map((c) => (
          <div
            key={c._id}
            onClick={() => setEditing(c)}
            className="cursor-pointer border-b py-2 hover:bg-gray-100"
          >
            {c.title}
          </div>
        ))}
      </div>
    </div>
  );
}
