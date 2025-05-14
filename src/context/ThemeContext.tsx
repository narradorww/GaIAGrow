// src/context/ThemeContext.tsx
import React, { createContext, useContext, useState } from 'react'

import { ThemeProvider } from 'styled-components/native'

import { useThemeInitializer } from '@/hooks/useThemeInitializer'
import { themes } from '@/styles/themes'
import { Season } from '@/types/season'
import { Theme } from '@/types/theme'

type ThemeContextType = {
  season: Season | null
  theme: Theme
  latitude: number | null
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProviderWrapper = ({ children }: { children: React.ReactNode }) => {
  const [season, setSeason] = useState<Season | null>(null)
  const [theme, setTheme] = useState<Theme>(themes.summer)
  const [latitude, setLatitude] = useState<number | null>(null)

  useThemeInitializer(setTheme, setSeason, setLatitude)

  return (
    <ThemeContext.Provider value={{ season, theme, latitude }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useThemeContext must be used within ThemeProviderWrapper')
  return context
}
