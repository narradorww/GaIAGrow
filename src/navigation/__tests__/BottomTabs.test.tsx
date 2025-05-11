import React from 'react'

import { NavigationContainer } from '@react-navigation/native'
import { render } from '@testing-library/react-native'

import BottomTabs from '../BottomTabs'

jest.mock('@/screens/HomeScreen', () => {
  const MockComponent = () => <></>
  MockComponent.displayName = 'HomeScreen'
  return MockComponent
})
jest.mock('@/screens/AssistantScreen', () => {
  const MockComponent = () => <></>
  MockComponent.displayName = 'AssistantScreen'
  return MockComponent
})
jest.mock('@/screens/PlantsScreen', () => {
  const MockComponent = () => <></>
  MockComponent.displayName = 'PlantsScreen'
  return MockComponent
})
jest.mock('@/screens/GardenScreen', () => {
  const MockComponent = () => <></>
  MockComponent.displayName = 'GardenScreen'
  return MockComponent
})

describe('BottomTabs navigation', () => {
  it('should render all bottom tabs correctly', () => {
    const { getByLabelText } = render(
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>,
    )

    expect(getByLabelText('Home tab')).toBeTruthy()
    expect(getByLabelText('Assistant tab')).toBeTruthy()
    expect(getByLabelText('Plants tab')).toBeTruthy()
    expect(getByLabelText('Garden tab')).toBeTruthy()
  })
})
