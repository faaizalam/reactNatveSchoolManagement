import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import axios from 'axios';
interface FormData {
  [key: string]: string | number | undefined;
}

type QueryType = {
  query: string;
};

const Create: React.FC = () => {
  const { query } = useLocalSearchParams<QueryType>();  // Destructure query from search params
  
  const [formData, setFormData] = useState<FormData>({});

  useEffect(() => {
    console.log(query);  // Log the query to check the value
  }, [query]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    console.log("Form data to submit:", formData);
  
    let endpoint = '';
    let payload = {};
  
    // Determine the endpoint and payload based on query type
    switch (query) {
      case 'Students':
        endpoint = 'http://localhost:3000/student';
        payload = { name: formData.name, email: formData.email,age: formData.age, title: formData.title, courses: formData.courses, id: formData.id };
        break;
      case 'Courses':
        endpoint = 'http://localhost:3000/course';
        payload = { title: formData.title, description: formData.description, duration: formData.duration, students: formData.students };
        break;
      case 'Teachers':
        endpoint = 'http://localhost:3000/teacher';
        payload = { name: formData.name,age: formData.age, title: formData.title, email: formData.email, courses: formData.courses, id: formData.id };
        break;
      default:
        console.log('No valid endpoint found for query:', query);
        return;
    }
  

  
    try {
      // Making the PUT request using axios
      const response = await axios.put(endpoint, payload);
  
      console.log('Response from API:', response.data);
      // Handle the response (e.g., show success message)
    } catch (error) {
      console.error('Error during API call:', error);
      // Handle error (e.g., show error message)
    }
  };

  const renderFields = (): JSX.Element | JSX.Element[] => {
    switch (query) {
      case "Students":
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Student Name"
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('age', parseInt(text, 10))}
            />
            <TextInput
              style={styles.input}
              placeholder="Class"
              onChangeText={(text) => handleInputChange('class', text)}
            />
          </>
        );
      case "Teachers":
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Teacher Name"
              onChangeText={(text) => handleInputChange('name', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Subject"
              onChangeText={(text) => handleInputChange('subject', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Experience (years)"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('experience', parseInt(text, 10))}
            />
          </>
        );
      case 'Courses':
        return (
          <>
            <TextInput
              style={styles.input}
              placeholder="Course Title"
              onChangeText={(text) => handleInputChange('title', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Duration (weeks)"
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange('duration', parseInt(text, 10))}
            />
            <TextInput
              style={styles.input}
              placeholder="Description"
              multiline
              onChangeText={(text) => handleInputChange('description', text)}
            />
          </>
        );
      default:
        return <Text>No form available for this query.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create {query}</Text>
      {renderFields()}
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
});

export default Create;
