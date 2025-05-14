// types/plot.ts
export type PlotCell = {
  x: number
  y: number
  plants: {
    plantId: string
    layer: string
    plantDate: string // ISO date
    harvests: {
      date: string
      quantity: number
      notes?: string
    }[]
  }[]
}

export type RotationRecord = {
  date: string
  plantsUsed: string[] // plantIds
}

export type Plot = {
  _id: string
  dimensions: {
    width: number
    height: number
  }
  cells: PlotCell[]
  rotationHistory: RotationRecord[]
}
