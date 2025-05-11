// src/navigation/__tests__/BottomTabs.test.tsx
import React from 'react'

import { render } from '@testing-library/react-native'

import BottomTabs from '../BottomTabs'

// Mock @expo/vector-icons para evitar warnings de act()
jest.mock('@expo/vector-icons', () => {
  return {
    Ionicons: () => {
      const IconMock = () => <></>
      IconMock.displayName = 'Ionicons'
      return <IconMock />
    },
  }
})

// Mock das telas com displayName
jest.mock('../../screens/HomeScreen', () => {
  const Mock = () => <></>
  Mock.displayName = 'HomeScreen'
  return Mock
})
jest.mock('../../screens/AssistantScreen', () => {
  const Mock = () => <></>
  Mock.displayName = 'AssistantScreen'
  return Mock
})
jest.mock('../../screens/PlantsScreen', () => {
  const Mock = () => <></>
  Mock.displayName = 'PlantsScreen'
  return Mock
})
jest.mock('../../screens/GardenScreen', () => {
  const Mock = () => <></>
  Mock.displayName = 'GardenScreen'
  return Mock
})

describe('BottomTabs navigation', () => {
  it('should render all bottom tabs correctly', () => {
    const { getByLabelText } = render(<BottomTabs />)
    expect(getByLabelText('Home tab')).toBeTruthy()
    expect(getByLabelText('Assistant tab')).toBeTruthy()
    expect(getByLabelText('Plants tab')).toBeTruthy()
    expect(getByLabelText('Garden tab')).toBeTruthy()
  })
})
