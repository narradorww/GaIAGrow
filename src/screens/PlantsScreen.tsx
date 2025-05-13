// src/screens/PlantsScreen.tsx
import React, { useState } from 'react'

import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  SafeAreaView,
  Dimensions,
} from 'react-native'

import { PlantCard } from '@/components/PlantCard'
import { PlantLayer, PlantLayerEnum, PlantLayerLabels } from '@/constants/enum'
import { plantLabels } from '@/constants/plantLabels'
import { useThemeContext } from '@/context/ThemeContext'
import { mockPlants } from '@/data/plants'
import { Season } from '@/types/season'

const screenWidth = Dimensions.get('window').width

export default function PlantsScreen() {
  const [seasonFilter, setSeasonFilter] = useState<Season | null>(null)
  const { theme } = useThemeContext()
  const [layerFilter, setLayerFilter] = useState<PlantLayer | null>(null)
  const [nameFilter, setNameFilter] = useState('')

  const filteredPlants = mockPlants.filter((plant: import('@/types/plant').Plant) => {
    const seasonMatch = seasonFilter ? plant.plantingSeasons.includes(seasonFilter) : true
    const layerMatch = layerFilter
      ? plant.strata.layers.some((layer) => layer.name === layerFilter)
      : true

    // Busca tanto no nome original quanto nas traduções do dicionário plantLabels
    const plantTranslation = plantLabels[plant.name] || ''
    const nameMatch =
      nameFilter === '' ||
      plant.name.toLowerCase().includes(nameFilter.toLowerCase()) ||
      plantTranslation.toLowerCase().includes(nameFilter.toLowerCase())

    return seasonMatch && layerMatch && nameMatch
  })

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>Plant list</Text>

      <Text style={[styles.filterTitle, { color: theme.text }]}>Search by name</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          style={[styles.input, { borderColor: theme.border, color: theme.text }]}
          placeholder="Search by name"
          placeholderTextColor={theme.text}
          value={nameFilter}
          onChangeText={setNameFilter}
        />
      </View>

      <Text style={[styles.filterTitle, { color: theme.text }]}>Filter by Layer</Text>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {(Object.values(PlantLayerEnum) as PlantLayer[]).map((layer) => (
            <Pressable
              key={layer}
              style={[
                styles.filterButton,
                {
                  backgroundColor: layerFilter === layer ? theme.primary : theme.surface,
                  borderWidth: layerFilter === layer ? 1 : 1,
                  borderColor: layerFilter === layer ? theme.text : theme.border,
                  minWidth: 80,
                },
              ]}
              onPress={() => setLayerFilter(layerFilter === layer ? null : layer)}
            >
              <Text style={[styles.filterLabel, { color: theme.text }]}>
                {PlantLayerLabels[layer]}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <Text style={[styles.filterTitle, { color: theme.text }]}>Filter by Season</Text>
      <View style={styles.scrollContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {['spring', 'summer', 'autumn', 'winter'].map((season) => (
            <Pressable
              key={season}
              style={[
                styles.filterButton,
                {
                  backgroundColor: seasonFilter === season ? theme.primary : theme.surface,
                  borderWidth: seasonFilter === season ? 1 : 1,
                  borderColor: seasonFilter === season ? theme.text : theme.border,
                  minWidth: 80,
                },
              ]}
              onPress={() => setSeasonFilter(seasonFilter === season ? null : (season as Season))}
            >
              <Text style={[styles.filterLabel, { color: theme.text }]}>
                {season.charAt(0).toUpperCase() + season.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {filteredPlants.map((plant) => (
          <View key={plant._id} style={{ width: screenWidth * 0.92, alignSelf: 'center' }}>
            <PlantCard plant={plant} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
    marginBottom: 4,
    paddingHorizontal: 8,
  },
  scrollContainer: {
    height: 44, // Altura fixa para o container do ScrollView
    marginBottom: 16,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  scroll: {
    paddingBottom: 32,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 22,
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 42,
    marginBottom: 4,
  },
  inputWrapper: {
    alignSelf: 'center',
    width: '92%',
    height: 44,
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    gap: 8,
    paddingHorizontal: 8,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: 36,
    flexShrink: 0,
    overflow: 'hidden',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
    includeFontPadding: false,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
})
