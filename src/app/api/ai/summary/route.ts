import { NextRequest, NextResponse } from 'next/server'
import { ollamaClient } from '@/lib/ollama'

export async function POST(request: NextRequest) {
  try {
    const { personalInfo, experiences } = await request.json()

    if (!personalInfo || !experiences) {
      return NextResponse.json(
        { error: 'Personal info and experiences are required' },
        { status: 400 }
      )
    }

    const summary = await ollamaClient.generateSummary(personalInfo, experiences)

    return NextResponse.json({ summary })
  } catch (error) {
    console.error('Error generating summary:', error)
    return NextResponse.json(
      { error: 'Failed to generate summary' },
      { status: 500 }
    )
  }
}
