import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { router } from 'expo-router';

export default function Main() {
  useEffect(() => {
    let moveTo=setTimeout(() => {
      router.replace('/Mangment');
      
    }, 200);
  
    return () => {
      clearTimeout(moveTo)
    }
  }, [])
  
  return (
    <View>
      <Text>Main</Text>
    </View>
  )
}