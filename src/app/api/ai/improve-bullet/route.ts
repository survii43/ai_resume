import { NextRequest, NextResponse } from 'next/server'
import { ollamaClient } from '@/lib/ollama'

export async function POST(request: NextRequest) {
  try {
    const { bulletPoint, context } = await request.json()

    if (!bulletPoint) {
      return NextResponse.json(
        { error: 'Bullet point is required' },
        { status: 400 }
      )
    }

    const improvedBullet = await ollamaClient.improveBulletPoint(bulletPoint, context || '')

    return NextResponse.json({ improvedBullet })
  } catch (error) {
    console.error('Error improving bullet point:', error)
    return NextResponse.json(
      { error: 'Failed to improve bullet point' },
      { status: 500 }
    )
  }
}
