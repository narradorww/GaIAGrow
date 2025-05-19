import React, { useEffect, useState, useRef } from 'react'

import { GoogleGenAI } from '@google/genai'
import * as SecureStore from 'expo-secure-store'
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  Alert,
} from 'react-native'

import { useThemeContext } from '@/context/ThemeContext'

const GEMINI_KEY = 'gemini_api_key'
const MODEL = 'gemini-2.0-flash'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function AssistantScreen() {
  const { theme } = useThemeContext()
  const [apiKey, setApiKey] = useState('')
  const [storedKey, setStoredKey] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const scrollRef = useRef<ScrollView>(null)

  useEffect(() => {
    const envKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY
    if (envKey && envKey.length > 5) {
      setStoredKey(envKey)
      console.log('🔐 [GEMINI] Chave carregada do .env:', envKey)
    } else {
      SecureStore.getItemAsync(GEMINI_KEY).then((key) => {
        if (key && key.length > 5) {
          setStoredKey(key)
          console.log('🔐 [GEMINI] Chave carregada do SecureStore:', key)
        } else {
          setStoredKey(null)
          console.log('🚫 [GEMINI] Nenhuma chave encontrada, aguardando input')
        }
      })
    }
  }, [])

  const handleSaveKey = async () => {
    if (apiKey.length < 10) {
      Alert.alert('API Key inválida')
      return
    }
    await SecureStore.setItemAsync(GEMINI_KEY, apiKey)
    setStoredKey(apiKey)
    Alert.alert('Chave salva com sucesso!')
    console.log('💾 [GEMINI] Chave salva no SecureStore:', apiKey)
  }

  const handleSendPrompt = async () => {
    if (!storedKey || !input.trim()) {
      Alert.alert('Preencha a pergunta e a chave de API.')
      return
    }
    const userMessage: Message = { role: 'user', content: input }
    setMessages((msgs) => [...msgs, userMessage])
    setInput('')
    setLoading(true)
    try {
      const ai = new GoogleGenAI({ apiKey: storedKey })
      const prompt =
        'Você é um assistente inteligente especializado em agricultura urbana, hortas orgânicas e permacultura. ' +
        'Seu papel é ajudar usuários do aplicativo GaIAGrow a planejar e cuidar de suas hortas de forma eficiente e regenerativa.\n' +
        `Pergunta do usuário: ${userMessage.content}`

      const result = await ai.models.generateContent({
        model: MODEL,
        contents: [
          {
            role: 'user',
            parts: [{ text: prompt }],
          },
        ],
      })
      let geminiResponse = ''
      if (result?.candidates?.length) {
        geminiResponse = result.candidates[0]?.content?.parts?.[0]?.text ?? ''
      } else if (result && result.text) {
        geminiResponse = result.text
      }
      const aiMessage: Message = { role: 'assistant', content: geminiResponse || 'Resposta vazia.' }
      setMessages((msgs) => [...msgs, aiMessage])
      setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 300)
    } catch (err: any) {
      const errMsg = err?.message ?? String(err)
      setMessages((msgs) => [...msgs, { role: 'assistant', content: 'Erro: ' + errMsg }])
    } finally {
      setLoading(false)
    }
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
        ref={scrollRef}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        <Text style={[styles.title, { color: theme.text }]}>GaIAGrow Assistant</Text>
        {!storedKey && (
          <View style={styles.section}>
            <Text style={[styles.label, { color: theme.text }]}>
              Insira sua chave da API Gemini:
            </Text>
            <TextInput
              style={[styles.input, { borderColor: theme.border, color: theme.text }]}
              placeholder="Cole aqui sua API Key"
              placeholderTextColor={theme.text}
              value={apiKey}
              onChangeText={setApiKey}
            />
            <Button title="Salvar chave" onPress={handleSaveKey} />
          </View>
        )}
        {storedKey && (
          <View style={styles.section}>
            <Text style={[styles.label, { color: theme.text }]}>Converse com o assistente:</Text>
            <View style={styles.chatBox}>
              {messages.map((msg, i) => (
                <View
                  key={i}
                  style={[
                    styles.message,
                    msg.role === 'user'
                      ? { alignSelf: 'flex-end', backgroundColor: theme.primary + '22' }
                      : { alignSelf: 'flex-start', backgroundColor: theme.surface },
                  ]}
                >
                  <Text
                    style={{ color: theme.text, fontWeight: msg.role === 'user' ? '700' : '400' }}
                  >
                    {msg.role === 'user' ? 'Você: ' : 'GaIAGrow: '}
                  </Text>
                  <Text style={{ color: theme.text }}>{msg.content}</Text>
                </View>
              ))}
              {loading && (
                <View
                  style={[
                    styles.message,
                    { alignSelf: 'flex-start', backgroundColor: theme.surface },
                  ]}
                >
                  <Text style={{ color: theme.text }}>GaIAGrow está digitando...</Text>
                </View>
              )}
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <TextInput
                style={[
                  styles.input,
                  { borderColor: theme.border, color: theme.text, flex: 1, marginBottom: 0 },
                ]}
                placeholder="Digite sua mensagem..."
                placeholderTextColor={theme.text}
                value={input}
                onChangeText={setInput}
                editable={!loading}
                onSubmitEditing={handleSendPrompt}
                blurOnSubmit={false}
              />
              <Button
                title="Enviar"
                onPress={handleSendPrompt}
                disabled={loading || !input.trim()}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  chatBox: {
    minHeight: 180,
    paddingVertical: 8,
  },
  message: {
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    maxWidth: '80%',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 8,
  },
})
