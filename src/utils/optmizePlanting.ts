// src/utils/optimizePlanting.ts
import { Plant } from '@/types/plant'

type PlantGridCell = {
  planta: string | null
  camada: string | null
}

export function optimizePlanting(
  rows: number,
  cols: number,
  selectedPlants: Plant[],
): PlantGridCell[][] {
  // Classifica plantas por camada principal (altura maior)
  const plantsByLayer = {
    high: [] as Plant[],
    medium: [] as Plant[],
    low: [] as Plant[],
    ground: [] as Plant[],
  }
  for (const plant of selectedPlants) {
    const layers = plant.strata.layers.map((l) => l.name)
    if (layers.includes('high')) plantsByLayer.high.push(plant)
    else if (layers.includes('medium')) plantsByLayer.medium.push(plant)
    else if (layers.includes('low')) plantsByLayer.low.push(plant)
    else plantsByLayer.ground.push(plant)
  }

  const grid: PlantGridCell[][] = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ planta: null, camada: null })),
  )

  const centerRow = Math.floor(rows / 2)
  const centerCol = Math.floor(cols / 2)

  function isAntagonist(grid: PlantGridCell[][], i: number, j: number, plant: Plant): boolean {
    const neighbors = [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ]
    for (const [y, x] of neighbors) {
      if (y < 0 || y >= rows || x < 0 || x >= cols) continue
      const viz = grid[y][x]
      if (viz.planta) {
        const neighborPlant = selectedPlants.find((p) => p.name === viz.planta)
        if (
          neighborPlant &&
          (neighborPlant.antagonistPlants?.includes(plant.name) ||
            plant.antagonistPlants?.includes(neighborPlant.name))
        ) {
          return true
        }
      }
    }
    return false
  }

  function getBestPlant(
    grid: PlantGridCell[][],
    i: number,
    j: number,
    plantList: Plant[],
  ): Plant | null {
    // Busca plantas companheiras dos vizinhos imediatos
    const neighborPlants: Plant[] = []
    const neighbors = [
      [i - 1, j],
      [i + 1, j],
      [i, j - 1],
      [i, j + 1],
    ]
    for (const [y, x] of neighbors) {
      if (y < 0 || y >= rows || x < 0 || x >= cols) continue
      const viz = grid[y][x]
      if (viz.planta) {
        const plant = selectedPlants.find((p) => p.name === viz.planta)
        if (plant) neighborPlants.push(plant)
      }
    }

    // Monta score: +2 para companheira de todos, -10 se antagonista
    let bestPlant: Plant | null = null
    let bestScore = -Infinity
    for (const candidate of plantList) {
      if (isAntagonist(grid, i, j, candidate)) continue
      let score = 0
      for (const neighbor of neighborPlants) {
        if (neighbor.companionPlants?.includes(candidate.name)) score += 2
        if (candidate.companionPlants?.includes(neighbor.name)) score += 2
        if (neighbor.antagonistPlants?.includes(candidate.name)) score -= 10
        if (candidate.antagonistPlants?.includes(neighbor.name)) score -= 10
      }
      if (score > bestScore) {
        bestScore = score
        bestPlant = candidate
      }
    }
    // Se não achou companheira, retorna qualquer não antagônica
    if (!bestPlant) {
      bestPlant = plantList.find((p) => !isAntagonist(grid, i, j, p)) || null
    }
    return bestPlant
  }

  function fillArea(plantList: Plant[], areaCoords: [number, number][]) {
    let idx = 0
    for (const [i, j] of areaCoords) {
      const plant = getBestPlant(grid, i, j, plantList)
      if (plant) {
        const camada = plant.strata.layers[0]?.name || null
        grid[i][j] = { planta: plant.name, camada }
        idx = (idx + 1) % plantList.length
      }
    }
  }

  // Centro
  let centerArea: [number, number][] = []
  if (rows % 2 === 1 && cols % 2 === 1) {
    centerArea = [[centerRow, centerCol]]
  } else {
    for (let i = centerRow - 1; i <= centerRow; i++) {
      for (let j = centerCol - 1; j <= centerCol; j++) {
        if (i >= 0 && j >= 0 && i < rows && j < cols) centerArea.push([i, j])
      }
    }
  }
  fillArea(plantsByLayer.high, centerArea)

  // Médio: anel ao redor do centro
  const mediumArea: [number, number][] = []
  for (let d = 1; d <= Math.max(rows, cols) / 3; d++) {
    for (let i = centerRow - d; i <= centerRow + d; i++) {
      for (let j = centerCol - d; j <= centerCol + d; j++) {
        if (
          (i === centerRow - d ||
            i === centerRow + d ||
            j === centerCol - d ||
            j === centerCol + d) &&
          i >= 0 &&
          i < rows &&
          j >= 0 &&
          j < cols &&
          !centerArea.some(([ci, cj]) => ci === i && cj === j)
        ) {
          mediumArea.push([i, j])
        }
      }
    }
  }
  fillArea(plantsByLayer.medium, mediumArea)

  // Bordas: low/ground
  const lowArea: [number, number][] = []
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (i === 0 || j === 0 || i === rows - 1 || j === cols - 1) {
        if (
          !centerArea.some(([ci, cj]) => ci === i && cj === j) &&
          !mediumArea.some(([mi, mj]) => mi === i && mj === j)
        ) {
          lowArea.push([i, j])
        }
      }
    }
  }
  fillArea(plantsByLayer.low.concat(plantsByLayer.ground), lowArea)

  // Sobra: preenche com o melhor possível
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (!grid[i][j].planta) {
        const plant = getBestPlant(grid, i, j, selectedPlants)
        if (plant) {
          const camada = plant.strata.layers[0]?.name || null
          grid[i][j] = { planta: plant.name, camada }
        }
      }
    }
  }

  return grid
}
