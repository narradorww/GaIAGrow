// src/screens/HomeScreen.tsx
import React from 'react'

import {
  Text,
  StyleSheet,
  Linking,
  Button,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native'

import { useThemeContext } from '@/context/ThemeContext'

export default function HomeScreen() {
  const { theme, season } = useThemeContext()

  const handleOpenGeminiDocs = () => {
    Linking.openURL(
      'https://aistudio.google.com/app/prompts/new_chat?utm_source=website&utm_medium=referral&utm_campaign=Alura-may-25',
    )
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight || 32 : 24,
          },
        ]}
      >
        <Text style={[styles.title, { color: theme.text }]}>Bem-vindo ao GaIAGrow</Text>

        <Text style={[styles.paragraph, { color: theme.text }]}>
          Esta é a sua central de controle para hortas orgânicas com inteligência natural. O app
          utiliza algoritmos baseados em consórcio de plantas, sazonalidade e, futuramente,
          inteligência artificial generativa para diagnósticos e recomendações.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Sobre o projeto</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          O GaIAGrow aplica conceitos de permacultura, agricultura regenerativa e agroecologia para
          tornar o planejamento de hortas mais acessível e visual.
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Tema atual</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          A estação atual detectada é: <Text style={{ fontWeight: 'bold' }}>{season}</Text>
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.primary }]}>Chave da API Gemini</Text>
        <Text style={[styles.paragraph, { color: theme.text }]}>
          Para ativar recursos de IA no app (como diagnósticos de pragas e sugestões de consórcios
          com base em imagem ou texto), você precisará de uma chave da API Gemini da Google:
        </Text>
        <Button title="Obter chave de API" onPress={handleOpenGeminiDocs} />
        <Text style={[styles.caption, { color: theme.text }]}>
          Acesse o link, copie sua API key e cole nas configurações do app (em breve).
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 8,
  },
  caption: {
    fontSize: 12,
    marginTop: 8,
    fontStyle: 'italic',
  },
})
