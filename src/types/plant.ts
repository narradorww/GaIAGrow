import { PlantLayer } from '@/constants/enum'

import { Season } from './season'

export type PlantLayerConfig = {
  name: PlantLayer
  maxHeight: number
  space: number
}

export type Plant = {
  _id: string
  name: string
  imgUrl: string
  strata: {
    height: number
    layers: PlantLayerConfig[]
  }
  harvestDays: number
  companionPlants: string[]
  antagonistPlants: string[]
  spacing: {
    row: number
    plant: number
  }
  plantingSeasons: Season[]
  notes?: string
}
