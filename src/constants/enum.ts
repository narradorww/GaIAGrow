export const PlantLayerEnum = {
  GROUND: 'ground',
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
} as const

export type PlantLayer = (typeof PlantLayerEnum)[keyof typeof PlantLayerEnum]

export const PlantLayerLabels: Record<PlantLayer, string> = {
  ground: 'Rasteiro',
  low: 'Baixo',
  medium: 'Médio',
  high: 'Alto',
}

export const HarvestMethodEnum = {
  MANUAL: 'manual',
  MECHANICAL: 'mechanical',
} as const

export type HarvestMethod = (typeof HarvestMethodEnum)[keyof typeof HarvestMethodEnum]

export const HarvestMethodLabels: Record<HarvestMethod, string> = {
  manual: 'Manual',
  mechanical: 'Mecânico',
}
