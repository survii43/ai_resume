import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Check if Ollama is running by making a simple request
    const response = await fetch('http://localhost:11434/api/tags', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      return NextResponse.json({ status: 'available' })
    } else {
      return NextResponse.json({ status: 'unavailable' }, { status: 503 })
    }
  } catch (error) {
    return NextResponse.json({ status: 'unavailable' }, { status: 503 })
  }
}
