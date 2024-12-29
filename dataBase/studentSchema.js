import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] // Reference to Course
  });
  
  const Student = mongoose.model("Student", studentSchema);
  export default Student;
  