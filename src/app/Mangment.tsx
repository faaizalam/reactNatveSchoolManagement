import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

type Student = {
  id: string;
  name: string;
  email: string;
};

type Course = {
  id: string;
  title: string;
  description: string;
  teacher: string;
  students: string[];
};

type Teacher = {
  id: string;
  name: string;
  email: string;
  courses: string[];
};

const students: Student[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com' },
  { id: '3', name: 'Alice Johnson', email: 'alice.johnson@example.com' },
  { id: '4', name: 'Robert Brown', email: 'robert.brown@example.com' },
  { id: '5', name: 'Chris Evans', email: 'chris.evans@example.com' },
];

const courses: Course[] = [
  { id: '1', title: 'Mathematics', description: 'Algebra and Geometry', teacher: 'John Smith', students: ['John Doe', 'Jane Smith'] },
  { id: '2', title: 'Science', description: 'Physics and Chemistry', teacher: 'Alice Johnson', students: ['Alice Johnson', 'Robert Brown'] },
  { id: '3', title: 'History', description: 'World History', teacher: 'Chris Evans', students: ['Jane Smith', 'Chris Evans'] },
];

const teachers: Teacher[] = [
  { id: '1', name: 'John Smith', email: 'john.smith@example.com', courses: ['Mathematics'] },
  { id: '2', name: 'Alice Johnson', email: 'alice.johnson@example.com', courses: ['Science'] },
  { id: '3', name: 'Chris Evans', email: 'chris.evans@example.com', courses: ['History'] },
];

export default function Management() {
    const handleRedirect = (query: string, id: string) => {
        router.push({ pathname: `/Edit`, params: {id:id,query:query} }); 
      };
      
      

  const renderStudents = ({ item }: { item: Student }) => (
    <TouchableOpacity onPress={() => handleRedirect("student",item.id)} style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.email}</Text>
    </TouchableOpacity>
  );

  const renderCourses = ({ item }: { item: Course }) => (
    <TouchableOpacity onPress={() => handleRedirect("course",item.id)} style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.title}</Text>
      <Text style={styles.cell}>{item.teacher}</Text>
    </TouchableOpacity>
  );

  const renderTeachers = ({ item }: { item: Teacher }) => (
    <TouchableOpacity onPress={() => handleRedirect("teacher",item.id)} style={styles.row}>
      <Text style={styles.cell}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Students Table */}
      <Text style={styles.tableTitle}>Students</Text>
      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Email</Text>
      </View>
      <FlatList
        data={students}
        renderItem={renderStudents}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />

      {/* Courses Table */}
      <Text style={styles.tableTitle}>Courses</Text>
      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Title</Text>
        <Text style={[styles.cell, styles.headerCell]}>Teacher</Text>
      </View>
      <FlatList
        data={courses}
        renderItem={renderCourses}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />

      {/* Teachers Table */}
      <Text style={styles.tableTitle}>Teachers</Text>
      <View style={styles.header}>
        <Text style={[styles.cell, styles.headerCell]}>ID</Text>
        <Text style={[styles.cell, styles.headerCell]}>Name</Text>
        <Text style={[styles.cell, styles.headerCell]}>Email</Text>
      </View>
      <FlatList
        data={teachers}
        renderItem={renderTeachers}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    flex: 1,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#ddd',
    paddingVertical: 8,
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
  flatList: {
    maxHeight: 150,
    marginBottom: 16,
  },
});
