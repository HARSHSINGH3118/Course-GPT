import React, { useEffect, useState } from "react";
import { fetchCourses, createCourse } from "../services/api.js";
import CourseCard from "./CourseCard.jsx";
import Layout from "./Layout.jsx";

export default function CourseList({ onSelect }) {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses().then((res) => setCourses(res.data));
  }, []);

  const addCourse = async () => {
    const res = await createCourse({ title: "New Course" });
    onSelect(res.data);
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Courses</h1>
        <button
          onClick={addCourse}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          + New Course
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((c) => (
          <CourseCard key={c._id} course={c} onEdit={onSelect} />
        ))}
      </div>
    </Layout>
  );
}
