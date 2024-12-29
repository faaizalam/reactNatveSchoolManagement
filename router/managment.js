
import express from "express";
import Course from "../dataBase/courseSchema.js";
import Teacher from "../dataBase/teacherSchema.js";
import Student from "../dataBase/studentSchema.js";

export let studentRoute=express.Router()
studentRoute.post("/assign-teacher", async (req, res) => {
    const { courseId, teacherId } = req.body;
  
    try {
     
      const course = await Course.findByIdAndUpdate(courseId, { teacher: teacherId }, { new: true });
      if (!course) return res.status(404).json({ message: "Course not found" });
      await Teacher.findByIdAndUpdate(teacherId, { $push: { courses: courseId } });
  
      res.status(200).json({ message: "Teacher assigned to course", course });
    } catch (error) {
      res.status(500).json({ message: "Error assigning teacher", error });
    }
  });
  


  studentRoute.post("/enroll-student", async (req, res) => {
    const { courseId, studentId } = req.body;
  
    try {
      const course = await Course.findByIdAndUpdate(courseId, { $push: { students: studentId } }, { new: true });
      if (!course) return res.status(404).json({ message: "Course not found" });
  
     
      await Student.findByIdAndUpdate(studentId, { $push: { courses: courseId } });
  
      res.status(200).json({ message: "Student enrolled in course", course });
    } catch (error) {
      res.status(500).json({ message: "Error enrolling student", error });
    }
  });

  

  studentRoute.get("/course/:id", async (req, res) => {
    try {
      const course = await Course.findById(req.params.id)
        .populate("teacher", "name email")
        .populate("students", "name email"); 
  
      if (!course) return res.status(404).json({ message: "Course not found" });
  
      res.status(200).json(course);
    } catch (error) {
      res.status(500).json({ message: "Error fetching course details", error });
    }
  });

  


  studentRoute.get("/teacher/:id", async (req, res) => {
    try {
      const teacher = await Teacher.findById(req.params.id).populate("courses", "title description");
      if (!teacher) return res.status(404).json({ message: "Teacher not found" });
  
      res.status(200).json(teacher);
    } catch (error) {
      res.status(500).json({ message: "Error fetching teacher details", error });
    }
  });

  


  studentRoute.get("/student/:id", async (req, res) => {
    try {
      const student = await Student.findById(req.params.id).populate("courses", "title description");
      if (!student) return res.status(404).json({ message: "Student not found" });
  
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: "Error fetching student details", error });
    }
  });
  



  studentRoute.get("/teachers", async (req, res) => {
    try {
      const teachers = await Teacher.find().populate("courses", "title description");
      res.status(200).json(teachers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching teachers", error });
    }
  });
  

  studentRoute.get("/courses", async (req, res) => {
    try {
      const courses = await Course.find()
        .populate("teacher", "name email") 
        .populate("students", "name email"); 
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching courses", error });
    }
  });
  


  studentRoute.get("/courses", async (req, res) => {
    try {
      const courses = await Course.find()
        .populate("teacher", "name email") 
        .populate("students", "name email"); 
      res.status(200).json(courses);
    } catch (error) {
      res.status(500).json({ message: "Error fetching courses", error });
    }
  });
  