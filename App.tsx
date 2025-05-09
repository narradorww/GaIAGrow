// App.tsx
import React from 'react'

import styled from 'styled-components/native'

import { ThemeProviderWrapper, useThemeContext } from './src/context/ThemeContext'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`

function ThemedApp() {
  const { season, latitude } = useThemeContext()

  return (
    <Container>
      <Title>Hello, World! 🚀</Title>
      <Title>It&apos;s {season}</Title>
      <Title>Lat: {latitude}</Title>
    </Container>
  )
}

export default function App() {
  return (
    <ThemeProviderWrapper>
      <ThemedApp />
    </ThemeProviderWrapper>
  )
}
