import { useLocalSearchParams, useSearchParams } from 'expo-router/build/hooks';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Edit({ route }: any) {
    // const router = useRouter();
    const item = useLocalSearchParams();
    console.log(item)

  return (
    <View style={styles.container}>
        
      <Text style={styles.text}>Query: </Text>
      {/* <Text style={styles.text}>Student ID: {id}</Text> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    fontSize: 18,
    marginVertical: 8,
  },
});
