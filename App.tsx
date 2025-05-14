// src/App.tsx
import React from 'react'

import { NavigationContainer, DefaultTheme } from '@react-navigation/native'

import { ThemeProviderWrapper, useThemeContext } from '@/context/ThemeContext'
import BottomTabs from '@/navigation/BottomTabs'

const AppContent = () => {
  const { theme } = useThemeContext()

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.background,
      primary: theme.primary,
      card: theme.surface,
      text: theme.text,
      border: theme.border || theme.primary,
    },
  }

  return (
    <NavigationContainer theme={navigationTheme}>
      <BottomTabs />
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <ThemeProviderWrapper>
      <AppContent />
    </ThemeProviderWrapper>
  )
}
