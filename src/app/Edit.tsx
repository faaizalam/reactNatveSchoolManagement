import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import {useSearchParams } from 'expo-router/build/hooks';

export default function Edit() {

  const searchParams = useSearchParams(); // Returns a URLSearchParams object

  // Safely access query parameters
  const id = searchParams.get("id") ?? "default-id"; // Use fallback if null
  const query = searchParams.get("query") ?? "default-query";

  // Initial state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    title: "",
    description: "",
    teacher: "",
    students: "",
  });

  // Simulate fetching the existing data (replace with real API call or state)
  React.useEffect(() => {
    console.log()
    // Mock data fetch based on ID and query
    if (query === "student") {
      setFormData({
        name: "John Doe",
        email: "john.doe@example.com",
        title: "",
        description: "",
        teacher: "",
        students: "",
      });
    } else if (query === "course") {
      setFormData({
        name: "",
        email: "",
        title: "Mathematics",
        description: "Algebra and Geometry",
        teacher: "John Smith",
        students: "John Doe, Jane Smith",
      });
    } else if (query === "teacher") {
      setFormData({
        name: "John Smith",
        email: "john.smith@example.com",
        title: "",
        description: "",
        teacher: "",
        students: "",
      });
    }
  }, [id, query]);

  const handleUpdate = () => {
    // Simulate API call to update the data
    Alert.alert("Updated Successfully", `The ${query} record has been updated.`);
    // router.push("/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit {query}</Text>
      {query === "Students" && (
        <>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

        </View>
        </>
      )}
      {query === "Courses" && (
        <>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={formData.title}
            onChangeText={(text) => setFormData({ ...formData, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={formData.description}
            onChangeText={(text) => setFormData({ ...formData, description: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Teacher"
            value={formData.teacher}
            onChangeText={(text) => setFormData({ ...formData, teacher: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Students (comma-separated)"
            value={formData.students}
            onChangeText={(text) => setFormData({ ...formData, students: text })}
          />

        </View>
        </>
      )}
      {query === "Teachers" && (
        <>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({ ...formData, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />

        </View>
        </>
      )}
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});
