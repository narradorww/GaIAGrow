import { Season } from 'types/season'

export function getSeasonByDateAndLocation(date: Date, latitude: number): Season {
  const month = date.getMonth()

  const northernSeasons: Season[] = [
    'winter',
    'winter',
    'spring',
    'spring',
    'spring',
    'summer',
    'summer',
    'summer',
    'autumn',
    'autumn',
    'autumn',
    'winter',
  ]

  const southernSeasons: Season[] = [
    'summer',
    'summer',
    'autumn',
    'autumn',
    'autumn',
    'winter',
    'winter',
    'winter',
    'spring',
    'spring',
    'spring',
    'summer',
  ]

  if (latitude > 1) return northernSeasons[month]
  if (latitude < -1) return southernSeasons[month]
  return 'summer'
}
