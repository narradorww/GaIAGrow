import React from 'react'

import { render } from '@testing-library/react-native'

import { ThemeProviderWrapper } from '@/context/ThemeContext'
import { Plant } from '@/types/plant'

import { PlantCard } from '../PlantCard'

const mockPlant: Plant = {
  _id: '1',
  name: 'Tomato',
  imgUrl: '',
  strata: {
    height: 100,
    layers: [{ name: 'low', maxHeight: 30, space: 20 }],
  },
  harvestDays: 90,
  companionPlants: [],
  antagonistPlants: [],
  spacing: { row: 40, plant: 20 },
  plantingSeasons: ['spring'],
  notes: 'Test tomato plant for rendering.',
}

describe('PlantCard', () => {
  it('should render plant name and notes', () => {
    const { getByText } = render(
      <ThemeProviderWrapper>
        <PlantCard plant={mockPlant} />
      </ThemeProviderWrapper>,
    )

    expect(getByText('Tomate')).toBeTruthy()
    expect(getByText('Test tomato plant for rendering.')).toBeTruthy()
  })
})
