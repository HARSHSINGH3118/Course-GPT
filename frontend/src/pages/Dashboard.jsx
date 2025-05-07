import React, { useState } from "react";
import CourseList from "../components/CourseList.jsx";
import CourseEditor from "../components/CourseEditor.jsx";

export default function Dashboard() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <CourseList onSelect={setSelected} />
      {selected && (
        <CourseEditor
          course={selected}
          onClose={() => setSelected(null)}
          onSaved={() => setSelected(null)}
        />
      )}
    </>
  );
}
