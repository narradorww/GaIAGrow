// src/modules/plants/components/PlantCard.tsx
import React from 'react'

import { View, Text, Image, StyleSheet } from 'react-native'

import { plantLabels } from '@/constants/plantLabels'
import { useThemeContext } from '@/context/ThemeContext'
import { Plant } from '@/types/plant'

interface PlantCardProps {
  plant: Plant
}

export const PlantCard = ({ plant }: PlantCardProps) => {
  const { theme } = useThemeContext()

  return (
    <View style={[styles.card, { backgroundColor: theme.surface }]}>
      <Image source={{ uri: plant.imgUrl }} style={styles.image} resizeMode="cover" />
      <Text style={[styles.title, { color: theme.text }]}>
        {plantLabels[plant.name] || plant.name}
      </Text>
      <Text style={[styles.note, { color: theme.text }]} numberOfLines={3}>
        {plant.notes}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 160,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  note: {
    fontSize: 14,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
})
