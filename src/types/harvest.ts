import { HarvestMethod } from '@/constants/enum'

export type Harvest = {
  _id: string
  plotId: string
  cell: {
    x: number
    y: number
  }
  plantId: string
  harvestDate: string
  quantity: number
  quality: 1 | 2 | 3 | 4 | 5
  method: HarvestMethod
  notes?: string
}
