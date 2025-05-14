import React from 'react'

import { render, fireEvent } from '@testing-library/react-native'

import PlantsScreen from '../PlantsScreen'

jest.mock('@/context/ThemeContext', () => ({
  useThemeContext: () => ({
    theme: {
      background: '#fff',
      text: '#000',
      primary: '#0f0',
      secondary: '#00f',
      border: '#ccc',
      surface: '#eee',
    },
    season: 'spring',
    setTheme: jest.fn(),
  }),
}))

jest.mock('@/components/PlantCard', () => {
  const { View, Text } = require('react-native')
  return {
    PlantCard: ({ plant }) => (
      <View testID={`plant-card-${plant._id}`}>
        <Text>{plant.name}</Text>
      </View>
    ),
  }
})

jest.mock('@/data/plants', () => ({
  mockPlants: [
    {
      _id: '1',
      name: 'Tomato',
      strata: { layers: [{ name: 'herbaceous' }] },
      plantingSeasons: ['spring', 'summer'],
    },
    {
      _id: '2',
      name: 'Garlic',
      strata: { layers: [{ name: 'root' }] },
      plantingSeasons: ['winter'],
    },
  ],
}))

describe('PlantsScreen', () => {
  it('filtra por nome (exato, não tradução)', async () => {
    const { getByPlaceholderText, findAllByTestId } = render(<PlantsScreen />)
    const input = getByPlaceholderText('Search by name')
    fireEvent.changeText(input, 'Garlic')

    const cards = await findAllByTestId(/plant-card-/)
    expect(cards).toHaveLength(1)
    expect(cards[0].children[0].props.children).toBe('Garlic') // Acessando o texto dentro do View mockado
  })

  it('filtra por estação (winter)', async () => {
    const { getByText, findAllByTestId } = render(<PlantsScreen />)
    fireEvent.press(getByText('Winter'))

    const cards = await findAllByTestId(/plant-card-/)
    expect(cards).toHaveLength(1)
    expect(cards[0].children[0].props.children).toBe('Garlic') // Acessando o texto dentro do View mockado
  })
})
