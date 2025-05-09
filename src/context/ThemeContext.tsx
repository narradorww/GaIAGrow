// src/context/ThemeContext.tsx

import React, { createContext, useContext, useState, ReactNode } from 'react'

import { ThemeProvider as StyledThemeProvider } from 'styled-components/native'

import { useThemeInitializer } from 'hooks/useThemeInitializer'
import { themes } from 'styles/themes'
import { Season } from 'types/season'
import { Theme } from 'types/theme'

interface ThemeContextValue {
  theme: Theme
  season: Season
  latitude: number | null
  setTheme: (theme: Theme) => void
  setSeason: (season: Season) => void
  setLatitude: (lat: number) => void
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export const useThemeContext = (): ThemeContextValue => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeContext must be used within a ThemeProviderWrapper')
  return context
}

interface Props {
  children: ReactNode
}

export const ThemeProviderWrapper = ({ children }: Props) => {
  const [theme, setTheme] = useState<Theme>(themes.summer)
  const [season, setSeason] = useState<Season>('summer')
  const [latitude, setLatitude] = useState<number | null>(null)

  useThemeInitializer(setTheme, setSeason, setLatitude)

  return (
    <ThemeContext.Provider value={{ theme, season, latitude, setTheme, setSeason, setLatitude }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
