// src/App.tsx
import React from 'react'

import { NavigationContainer } from '@react-navigation/native'

import { ThemeProviderWrapper } from 'context/ThemeContext'
import BottomTabs from 'navigation/BottomTabs'

export default function App() {
  return (
    <ThemeProviderWrapper>
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </ThemeProviderWrapper>
  )
}
