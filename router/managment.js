import express from "express";
import Course from "../dataBase/courseSchema.js";
import Teacher from "../dataBase/teacherSchema.js";
import Student from "../dataBase/studentSchema.js";
import mongoose from "mongoose";

export let studentRoute = express.Router();
studentRoute.put("/teacher", async (req, res) => {
  let { name, email, courses, id } = req.body;

  if (!id) {
    // Generate a new ObjectId if id is not provided
    id = new mongoose.Types.ObjectId();
  }

  try {
    const teacher = await Teacher.findByIdAndUpdate(
      id,
      { name, email, courses },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json({ message: "Teacher created/updated successfully", teacher });
  } catch (error) {
    res.status(500).json({ message: "Error creating/updating teacher", error });
  }
});

studentRoute.put("/student", async (req, res) => {
  let { name, email, courses, id } = req.body;

  if (!id) {
    // Generate a new ObjectId if id is not provided
    id = new mongoose.Types.ObjectId();
  }

  try {
    const student = await Student.findByIdAndUpdate(
      id,
      { name, email, courses },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json({ message: "Student created/updated successfully", student });
  } catch (error) {
    res.status(500).json({ message: "Error creating/updating student", error });
  }
});

studentRoute.put("/course", async (req, res) => {
  let { title, description, duration, students, id } = req.body;

  if (!id) {
    // Generate a new ObjectId if id is not provided
    id = new mongoose.Types.ObjectId();
  }

  try {
    const course = await Course.findByIdAndUpdate(
      id,
      { title, description, duration, students },
      { new: true, upsert: true } // Create if not exists
    );

    res.status(200).json({ message: "Course created/updated successfully", course });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating/updating course", error });
  }
});

studentRoute.get("/teacher/:id", async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id).populate(
      "courses",
      "title description"
    );
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teacher details", error });
  }
});

studentRoute.get("/student/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate(
      "courses",
      "title description"
    );
    if (!student) return res.status(404).json({ message: "Student not found" });

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student details", error });
  }
});

studentRoute.get("/teacher", async (req, res) => {
  try {
    const teachers = await Teacher.find({})
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
});
studentRoute.get("/student", async (req, res) => {
  
  try {
    const teachers = await Student.find({})
    res.status(200).json(teachers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
});

studentRoute.get("/course", async (req, res) => {
  try {
    const courses = await Course.find({})
    console.log(courses)

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
});



studentRoute.delete('/courses/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


studentRoute.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.status(200).json({ message: 'Student deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


studentRoute.delete('/teachers/:id', async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) return res.status(404).json({ message: 'Teacher not found' });
    res.status(200).json({ message: 'Teacher deleted successfully' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});