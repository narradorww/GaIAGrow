export async function sendToGemini(prompt: string, apiKey: string): Promise<string> {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      },
    )

    const data = await response.json()
    const output = data?.candidates?.[0]?.content?.parts?.[0]?.text
    return output || 'Não foi possível gerar uma resposta.'
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return 'Erro na comunicação com a IA.'
  }
}
