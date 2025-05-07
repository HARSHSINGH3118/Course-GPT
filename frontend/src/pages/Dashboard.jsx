import React from "react";
import CourseList from "../components/CourseList.jsx";

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">My Courses</h1>
      <CourseList />
    </div>
  );
}
