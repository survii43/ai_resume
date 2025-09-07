import { NextRequest, NextResponse } from 'next/server'
import { ollamaClient } from '@/lib/ollama'

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription } = await request.json()

    if (!resume || !jobDescription) {
      return NextResponse.json(
        { error: 'Resume and job description are required' },
        { status: 400 }
      )
    }

    const suggestions = await ollamaClient.tailorResume(resume, jobDescription)

    return NextResponse.json({ suggestions })
  } catch (error) {
    console.error('Error tailoring resume:', error)
    return NextResponse.json(
      { error: 'Failed to tailor resume' },
      { status: 500 }
    )
  }
}
