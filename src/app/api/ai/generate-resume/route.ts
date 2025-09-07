import { NextRequest, NextResponse } from 'next/server'
import { ollamaClient } from '@/lib/ollama'

export async function POST(request: NextRequest) {
  try {
    const { userData, jobDescription } = await request.json()

    if (!userData) {
      return NextResponse.json(
        { error: 'User data is required' },
        { status: 400 }
      )
    }

    const generatedResume = await ollamaClient.generateATSResume(userData, jobDescription)

    return NextResponse.json({
      success: true,
      resume: generatedResume,
      message: 'ATS-optimized resume generated successfully'
    })
  } catch (error) {
    console.error('Error generating resume:', error)
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Failed to generate resume',
        message: 'Please ensure Ollama is running and try again'
      },
      { status: 500 }
    )
  }
}
