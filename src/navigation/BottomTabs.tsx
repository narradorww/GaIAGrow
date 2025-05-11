import React from 'react'

import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import type { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs'

import AssistantScreen from '@/screens/AssistantScreen'
import GardenScreen from '@/screens/GardenScreen'
import HomeScreen from '@/screens/HomeScreen'
import PlantsScreen from '@/screens/PlantsScreen'

const Tab = createBottomTabNavigator()

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  Home: 'home-outline',
  Assistant: 'chatbox-ellipses-outline',
  Plants: 'leaf-outline',
  Garden: 'map-outline',
}

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }): BottomTabNavigationOptions => {
        const iconName = iconMap[route.name] ?? 'leaf-outline'
        return {
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
              accessibilityLabel={`${route.name} tab icon`}
              accessibilityRole="image"
            />
          ),
          tabBarAccessibilityLabel: `${route.name} tab`,
          tabBarActiveTintColor: '#2C6E49',
          tabBarInactiveTintColor: 'gray',
        }
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Assistant" component={AssistantScreen} />
      <Tab.Screen name="Plants" component={PlantsScreen} />
      <Tab.Screen name="Garden" component={GardenScreen} />
    </Tab.Navigator>
  )
}
