import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { ngrokUrl, model, messages } = body

    if (!ngrokUrl) {
      return NextResponse.json({ error: 'ngrokUrl is required' }, { status: 400 })
    }

    const endpoint = `${ngrokUrl.replace(/\/$/, '')}/chat/completions`

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      },
      body: JSON.stringify({
        model: model || 'local-model',
        messages,
        temperature: 0.7,
        max_tokens: 1024,
        stream: false,
      }),
    })

    if (!response.ok) {
      const errText = await response.text()
      return NextResponse.json(
        { error: `Error del servidor IA: ${response.status} — ${errText}` },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Error desconocido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
