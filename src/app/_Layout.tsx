import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _Layout() {
  return (
   <Stack screenOptions={{headerShown:false}}>
    <Stack.Screen name='index'></Stack.Screen>
    <Stack.Screen name='Mangment'></Stack.Screen>
    <Stack.Screen name='Edit'></Stack.Screen>
    <Stack.Screen name='Create'></Stack.Screen>
   </Stack>
  )
}