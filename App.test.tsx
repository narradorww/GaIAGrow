import React from 'react'

import { render } from '@testing-library/react-native'

import App from './App'

// Mock @expo/vector-icons to avoid act() warnings
jest.mock('@expo/vector-icons', () => ({
  Ionicons: () => {
    const IconMock = () => <></>
    IconMock.displayName = 'Ionicons'
    return <IconMock />
  },
}))

// Mock das telas com displayName
jest.mock('@/screens/HomeScreen', () => {
  const Mock = () => <></>
  Mock.displayName = 'HomeScreen'
  return Mock
})
jest.mock('@/screens/AssistantScreen', () => {
  const Mock = () => <></>
  Mock.displayName = 'AssistantScreen'
  return Mock
})
jest.mock('@/screens/PlantsScreen', () => {
  const Mock = () => <></>
  Mock.displayName = 'PlantsScreen'
  return Mock
})
jest.mock('@/screens/GardenScreen', () => {
  const Mock = () => <></>
  Mock.displayName = 'GardenScreen'
  return Mock
})

// ✅ Mock de useThemeInitializer para não executar lógica real
jest.mock('@/hooks/useThemeInitializer', () => ({
  useThemeInitializer: jest.fn(),
}))

// ✅ Mock de expo-location (precaução adicional)
jest.mock('expo-location', () => ({
  requestForegroundPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
  getCurrentPositionAsync: jest.fn().mockResolvedValue({
    coords: { latitude: -23.5, longitude: -46.6 },
  }),
}))

describe('App', () => {
  it('should render the app with ThemeProvider and Navigation', () => {
    const tree = render(<App />)
    expect(tree).toBeTruthy()
  })
})
