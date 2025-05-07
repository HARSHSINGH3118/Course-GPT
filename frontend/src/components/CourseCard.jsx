// src/components/CourseCard.jsx
import React from "react";

// A card component to display a course summary and handle selection
export default function CourseCard({ course, onEdit }) {
  return (
    <div
      onClick={() => onEdit(course)}
      className="bg-white rounded-lg shadow hover:shadow-lg transition p-6 cursor-pointer"
    >
      <h3 className="text-lg font-bold mb-2">{course.title}</h3>
      <p className="text-gray-600 line-clamp-3">
        {course.content || "No content yet. Click to start editing."}
      </p>
    </div>
  );
}
