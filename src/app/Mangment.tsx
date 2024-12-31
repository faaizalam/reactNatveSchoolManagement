import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import axios from "axios";

type Student = {
  _id: string;
  name: string;
  email: string;
};

type Course = {
  _id: string;
  title: string;
  description: string;
  teacher: string;
  students: string[];
};

type Teacher = {
  _id: string;
  name: string;
  email: string;
  courses: string[];
};

export default function Management() {
  const [students, setStudents] = useState<Student[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  // Fetch data from the endpoints
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/student');
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    const fetchCourses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/course');
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/teacher');
        setTeachers(response.data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    };

    fetchStudents();
    fetchCourses();
    fetchTeachers();
  }, []);

  const handleRedirect = (query: string, id: string) => {
    router.push({ pathname: `/Edit`, params: { id: id, query: query } });
  };

  const handleDeleteRecord = async (who: string, id: string) => {
    console.log( id,who)
    const endpoint = `http://localhost:3000/${who}/${id}`;
    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Refresh data after deletion
        if (who === "student") {
          setStudents(students.filter(student => student._id !== id));
        } else if (who === "course") {
          setCourses(courses.filter(course => course._id !== id));
        } else if (who === "teacher") {
          setTeachers(teachers.filter(teacher => teacher._id !== id));
        }
      } else {
        console.error(`Failed to delete ${who} with id ${id}`);
      }
    } catch (error) {
      console.error(`Error deleting ${who}:`, error);
    }
  };

  const createHandle = (who: string) => {
    router.push({ pathname: `/Create`, params: { query: who } });
  };

  const renderStudents = ({ item }: { item: Student }) => (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.cell}>{item._id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>
        <Text
          style={[styles.cell, { color: "blue", fontWeight: "bold", margin: 1 }]}
          onPress={() => handleRedirect("Students", item._id)}
        >
          Edit
        </Text>
        <Text
          style={[styles.cell, { color: "red", fontWeight: "bold", margin: 5 }]}
          onPress={() => handleDeleteRecord("student", item._id)}
        >
          Delete
        </Text>
      </Text>
    </TouchableOpacity>
  );

  const renderCourses = ({ item }: { item: Course }) => (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.cell}>{item._id}</Text>
      <Text style={styles.cell}>{item.title}</Text>
      <Text style={styles.cell}>{item.teacher}</Text>
      <Text style={styles.cell}>
        <Text
          style={[styles.cell, { color: "blue", fontWeight: "bold", margin: 1 }]}
          onPress={() => handleRedirect("Courses", item._id)}
        >
          Edit
        </Text>
        <Text
          style={[styles.cell, { color: "red", fontWeight: "bold", marginLeft: 5 }]}
          onPress={() => handleDeleteRecord("course", item._id)}
        >
          Delete
        </Text>
      </Text>
    </TouchableOpacity>
  );

  const renderTeachers = ({ item }: { item: Teacher }) => (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.cell}>{item._id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.email}</Text>
      <Text style={styles.cell}>
        <Text
          style={[styles.cell, { color: "blue", fontWeight: "bold", margin: 1 }]}
          onPress={() => handleRedirect("Teachers", item._id)}
        >
          Edit
        </Text>
        <Text
          style={[styles.cell, { color: "red", fontWeight: "bold", margin: 5 }]}
          onPress={() => handleDeleteRecord("teacher", item._id)}
        >
          Delete
        </Text>
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Students Table */}
      <Text style={styles.tableTitle}>Students</Text>
      <Text
        style={[styles.tableTitle, { color: "blue" }]}
        onPress={() => createHandle("Students")}
      >
        Create Students
      </Text>
      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Email</Text>
        <Text style={[styles.cell, styles.headerCell]}>Action</Text>
      </View>
      <FlatList
        data={students}
        renderItem={renderStudents}
        keyExtractor={(item) => item._id}
        style={styles.flatList}
      />

      {/* Courses Table */}
      <Text style={styles.tableTitle}>Courses</Text>
      <Text
        style={[styles.tableTitle, { color: "blue" }]}
        onPress={() => createHandle("Courses")}
      >
        Create Courses
      </Text>
      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Title</Text>
        <Text style={[styles.cell, styles.headerCell]}>Teacher</Text>
        <Text style={[styles.cell, styles.headerCell]}>Action</Text>
      </View>
      <FlatList
        data={courses}
        renderItem={renderCourses}
        keyExtractor={(item) => item._id}
        style={styles.flatList}
      />

      {/* Teachers Table */}
      <Text style={styles.tableTitle}>Teachers</Text>
      <Text
        style={[styles.tableTitle, { color: "blue" }]}
        onPress={() => createHandle("Teachers")}
      >
        Create Teachers
      </Text>
      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Email</Text>
        <Text style={[styles.cell, styles.headerCell]}>Action</Text>
      </View>
      <FlatList
        data={teachers}
        renderItem={renderTeachers}
        keyExtractor={(item) => item._id}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#ddd",
    paddingVertical: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    flex: 1,
    textAlign: "center",
  },
  headerCell: {
    fontWeight: "bold",
  },
  flatList: {
    maxHeight: 150,
    marginBottom: 16,
  },
});
