import { Season } from 'types/season'
import { getSeasonByDateAndLocation } from 'utils/getSeasonByDateAndLocation'

describe('getSeasonByDateAndLocation', () => {
  it('should return summer for December in the southern hemisphere', () => {
    const date = new Date('2024-12-15')
    const latitude = -23.55 // São Paulo, Brazil
    const result: Season = getSeasonByDateAndLocation(date, latitude)
    expect(result).toBe('summer')
  })

  it('should return winter for December in the northern hemisphere', () => {
    const date = new Date('2024-12-15')
    const latitude = 45.0 // Paris, France
    const result: Season = getSeasonByDateAndLocation(date, latitude)
    expect(result).toBe('winter')
  })

  it('should return spring for April in the northern hemisphere', () => {
    const date = new Date('2024-04-10')
    const latitude = 40.7 // New York, USA
    const result: Season = getSeasonByDateAndLocation(date, latitude)
    expect(result).toBe('spring')
  })

  it('should return autumn for April in the southern hemisphere', () => {
    const date = new Date('2024-04-10')
    const latitude = -33.9 // Sydney, Australia
    const result: Season = getSeasonByDateAndLocation(date, latitude)
    expect(result).toBe('autumn')
  })

  it('should return summer as default for equator region', () => {
    const date = new Date('2024-01-01')
    const latitude = 0 // Equator
    const result: Season = getSeasonByDateAndLocation(date, latitude)
    expect(result).toBe('summer')
  })
})
