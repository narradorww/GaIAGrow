// src/screens/GardenScreen.tsx
import React, { useState } from 'react'

import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
  Pressable,
} from 'react-native'

import { useThemeContext } from '@/context/ThemeContext'
import { mockPlants } from '@/data/plants'
import { optimizePlanting } from '@/utils/optmizePlanting'

const CELL_SIZE = 5
const CELL_PIXEL_SIZE = 20
const MAX_PLOT_WIDTH = 100

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ORIENTATIONS = ['North', 'East', 'South', 'West'] as const

type Orientation = (typeof ORIENTATIONS)[number]

type Plot = {
  id: string
  name: string
  width: number
  height: number
  cells: number
  orientation: Orientation
  plantGrid?: { planta: string | null; camada: number }[][]
}

export default function GardenScreen() {
  const { theme } = useThemeContext()

  const [plots, setPlots] = useState<Plot[]>([])
  const [name, setName] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [orientation, setOrientation] = useState<Orientation>('North')
  const [editId, setEditId] = useState<string | null>(null)
  const [showPlantModal, setShowPlantModal] = useState(false)
  const [lastCreatedPlot, setLastCreatedPlot] = useState<Plot | null>(null)
  const [selectedPlants, setSelectedPlants] = useState<string[]>([])

  const handleTogglePlant = (name: string) => {
    setSelectedPlants((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name],
    )
  }

  const handleCreatePlot = () => {
    if (!name || !width || !height) return

    const numericWidth = Math.min(Number(width), MAX_PLOT_WIDTH)
    const numericHeight = Number(height)
    const totalCells = Math.floor((numericWidth * numericHeight) / (CELL_SIZE * CELL_SIZE))

    const newPlot: Plot = {
      id: Date.now().toString(),
      name,
      width: numericWidth,
      height: numericHeight,
      cells: totalCells,
      orientation,
    }
    setLastCreatedPlot(newPlot)
    setShowPlantModal(true)

    setName('')
    setWidth('')
    setHeight('')
    setOrientation('North')
  }

  const confirmPlantSelection = () => {
    if (!lastCreatedPlot) return

    const cols = Math.floor(lastCreatedPlot.width / CELL_SIZE)
    const rows = Math.floor(lastCreatedPlot.height / CELL_SIZE)
    const selectedPlantObjects = mockPlants.filter((p) => selectedPlants.includes(p.name))

    // Usa algoritmo inteligente de consórcio e companheirismo
    const grid = optimizePlanting(rows, cols, selectedPlantObjects)

    const finalPlot: Plot = {
      ...lastCreatedPlot,
      plantGrid: grid,
    }

    setPlots((prev) => [...prev, finalPlot])
    setShowPlantModal(false)
    setLastCreatedPlot(null)
    setSelectedPlants([])
  }

  const handleDeletePlot = (id: string) => {
    setPlots((prev) => prev.filter((plot) => plot.id !== id))
  }

  const handleEditPlot = (plot: Plot) => {
    setName(plot.name)
    setWidth(String(plot.width))
    setHeight(String(plot.height))
    setOrientation(plot.orientation)
    setEditId(plot.id)
  }

  const renderGrid = (plot: Plot) => {
    const cols = Math.floor(plot.width / CELL_SIZE)
    const rows = Math.floor(plot.height / CELL_SIZE)
    const grid = []

    for (let y = 0; y < rows; y++) {
      const row = []
      for (let x = 0; x < cols; x++) {
        const cellData = plot.plantGrid?.[y]?.[x]
        const bgColor = cellData?.planta ? theme.primary : theme.surface
        const camada = cellData?.camada ?? null
        row.push(
          <View
            key={`cell-${x}-${y}`}
            style={[
              styles.cell,
              {
                backgroundColor: bgColor,
                borderColor: theme.border,
              },
            ]}
          >
            {cellData?.planta && (
              <Text style={{ fontSize: 6, color: theme.text }} numberOfLines={1}>
                {cellData.planta.slice(0, 3).toUpperCase()} ({camada})
              </Text>
            )}
          </View>,
        )
      }
      grid.push(
        <View key={`row-${y}`} style={styles.row}>
          {row}
        </View>,
      )
    }

    return (
      <ScrollView horizontal>
        <ScrollView>
          <View style={styles.grid}>{grid}</View>
        </ScrollView>
      </ScrollView>
    )
  }

  return (
    <KeyboardAvoidingView
      style={[styles.flex, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[styles.container, { marginTop: StatusBar.currentHeight || 32 }]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Create a New Garden</Text>

        <TextInput
          placeholder="Plot Name"
          placeholderTextColor={theme.text}
          style={[styles.input, { borderColor: theme.border, color: theme.text }]}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Width (max 100cm)"
          placeholderTextColor={theme.text}
          keyboardType="numeric"
          style={[styles.input, { borderColor: theme.border, color: theme.text }]}
          value={width}
          onChangeText={setWidth}
        />
        <TextInput
          placeholder="Height"
          placeholderTextColor={theme.text}
          keyboardType="numeric"
          style={[styles.input, { borderColor: theme.border, color: theme.text }]}
          value={height}
          onChangeText={setHeight}
        />

        <Button title={editId ? 'Update Plot' : 'Add Plot'} onPress={handleCreatePlot} />

        {plots.map((plot) => (
          <View key={plot.id} style={[styles.plotCard, { borderColor: theme.border }]}>
            <View style={styles.headerRow}>
              <Text style={[styles.plotText, { color: theme.text }]}>Name: {plot.name}</Text>
              <View style={{ flexDirection: 'row', gap: 16 }}>
                <TouchableOpacity onPress={() => handleEditPlot(plot)}>
                  <Text style={{ color: theme.primary }}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDeletePlot(plot.id)}>
                  <Text style={{ color: theme.primary }}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={[styles.plotText, { color: theme.text }]}>
              Size: {plot.width} x {plot.height}
            </Text>
            <Text style={[styles.plotText, { color: theme.text }]}>Cells: {plot.cells}</Text>
            <Text style={[styles.plotText, { color: theme.text }]}>
              Orientation: {plot.orientation}
            </Text>
            <View style={styles.gridWrapper}>{renderGrid(plot)}</View>
          </View>
        ))}

        <Modal visible={showPlantModal} transparent animationType="slide">
          <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center' }}>
            <View
              style={{ backgroundColor: theme.surface, margin: 16, padding: 16, borderRadius: 8 }}
            >
              <Text style={[styles.title, { color: theme.text }]}>Select Plants</Text>
              <FlatList
                data={mockPlants}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                  <Pressable onPress={() => handleTogglePlant(item.name)}>
                    <Text
                      style={{
                        color: selectedPlants.includes(item.name) ? theme.primary : theme.text,
                      }}
                    >
                      {item.name}
                    </Text>
                  </Pressable>
                )}
              />
              <Button title="Confirm and Plant" onPress={confirmPlantSelection} />
            </View>
          </View>
        </Modal>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
  plotCard: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 24,
    maxHeight: 400,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  plotText: {
    fontSize: 16,
  },
  gridWrapper: {
    marginTop: 12,
    maxHeight: 300,
  },
  grid: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: CELL_PIXEL_SIZE,
    height: CELL_PIXEL_SIZE,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
