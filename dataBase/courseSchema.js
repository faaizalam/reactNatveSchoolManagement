import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: "Teacher" }, // Reference to Teacher
    students: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }] // References to Students
  });
  
  const Course = mongoose.model("Course", courseSchema);
  export default Course;
  