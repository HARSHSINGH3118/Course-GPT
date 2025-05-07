const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  const { title } = req.body;
  const course = new Course({ title, author: req.user.id });
  await course.save();
  res.json(course);
};

exports.getCourses = async (req, res) => {
  const courses = await Course.find({ author: req.user.id });
  res.json(courses);
};

exports.updateCourse = async (req, res) => {
  const { id } = req.params;
  const course = await Course.findByIdAndUpdate(
    id,
    { content: req.body.content },
    { new: true }
  );
  res.json(course);
};
