export type GrowthLog = {
  _id: string
  plotId: string
  cell: {
    x: number
    y: number
  }
  plantId: string
  date: string
  metrics: {
    height: number
    health: 1 | 2 | 3 | 4 | 5
    watering: number
    pruning: boolean
    pests: string[]
  }
}
