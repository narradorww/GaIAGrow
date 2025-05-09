// src/hooks/useThemeInitializer.ts

import { useEffect } from 'react'

import * as Location from 'expo-location'

import { themes } from 'styles/themes'
import { Season } from 'types/season'
import { Theme } from 'types/theme'
import { getSeasonByDateAndLocation } from 'utils/getSeasonByDateAndLocation'

export function useThemeInitializer(
  setTheme: (theme: Theme) => void,
  setSeason: (season: Season) => void,
  setLatitude: (latitude: number) => void,
) {
  useEffect(() => {
    let isMounted = true

    async function initTheme() {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync()
        if (status !== 'granted') {
          console.warn('[Location] Permission not granted')
          if (isMounted) setTheme(themes.summer)
          return
        }

        const location = await Location.getCurrentPositionAsync({})
        const latitude = location.coords.latitude
        const season: Season = getSeasonByDateAndLocation(new Date(), latitude)
        const theme = themes[season] || themes.summer

        console.log('[SeasonCheck]', { latitude, month: new Date().getMonth(), season })

        if (isMounted) {
          setLatitude(latitude)
          setSeason(season)
          setTheme(theme)
        }
      } catch (error) {
        console.error('[Theme Init Error]', error)
        if (isMounted) setTheme(themes.summer)
      }
    }

    initTheme()

    return () => {
      isMounted = false
    }
  }, [setTheme, setSeason, setLatitude])
}
