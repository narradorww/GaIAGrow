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
} from 'react-native'

import { useThemeContext } from '@/context/ThemeContext'

const CELL_SIZE = 5
const CELL_PIXEL_SIZE = 20
const MAX_PLOT_WIDTH = 100

const ORIENTATIONS = ['North', 'East', 'South', 'West'] as const

type Orientation = (typeof ORIENTATIONS)[number]

type Plot = {
  id: string
  name: string
  width: number
  height: number
  cells: number
  orientation: Orientation
}

export default function GardenScreen() {
  const { theme } = useThemeContext()

  const [plots, setPlots] = useState<Plot[]>([])
  const [name, setName] = useState('')
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [orientation, setOrientation] = useState<Orientation>('North')
  const [editId, setEditId] = useState<string | null>(null)

  const handleCreatePlot = () => {
    if (!name || !width || !height) return

    const numericWidth = Math.min(Number(width), MAX_PLOT_WIDTH)
    const numericHeight = Number(height)
    const totalCells = Math.floor((numericWidth * numericHeight) / (CELL_SIZE * CELL_SIZE))

    if (editId) {
      setPlots((prev) =>
        prev.map((plot) =>
          plot.id === editId
            ? {
                ...plot,
                name,
                width: numericWidth,
                height: numericHeight,
                cells: totalCells,
                orientation,
              }
            : plot,
        ),
      )
      setEditId(null)
    } else {
      const newPlot: Plot = {
        id: Date.now().toString(),
        name,
        width: numericWidth,
        height: numericHeight,
        cells: totalCells,
        orientation,
      }
      setPlots((prev) => [...prev, newPlot])
    }

    setName('')
    setWidth('')
    setHeight('')
    setOrientation('North')
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
        row.push(
          <View
            key={`cell-${x}-${y}`}
            style={[
              styles.cell,
              {
                backgroundColor: theme.surface,
                borderColor: theme.border,
              },
            ]}
          />,
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

        <View style={styles.pickerWrapper}>
          <Text style={{ color: theme.text, marginBottom: 4 }}>Orientation</Text>
          <View style={[styles.pickerRow, { borderColor: theme.border }]}>
            {ORIENTATIONS.map((o) => (
              <TouchableOpacity
                key={o}
                onPress={() => setOrientation(o)}
                style={[
                  styles.pickerItem,
                  {
                    backgroundColor: orientation === o ? theme.primary : theme.surface,
                  },
                ]}
              >
                <Text style={{ color: theme.text }}>{o}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
  pickerWrapper: {
    marginVertical: 8,
  },
  pickerRow: {
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    borderRadius: 6,
    padding: 6,
    justifyContent: 'space-between',
  },
  pickerItem: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
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
  },
})
