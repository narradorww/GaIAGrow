import * as SecureStore from 'expo-secure-store'

export async function saveGeminiKey(key: string) {
  await SecureStore.setItemAsync('gemini_api_key', key)
}

export async function loadGeminiKey() {
  return await SecureStore.getItemAsync('gemini_api_key')
}
