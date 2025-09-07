'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { AISuggestion } from '@/types'

interface AIState {
  isLoading: boolean
  suggestions: AISuggestion[]
  error: string | null
}

interface AIContextType {
  state: AIState
  generateSummary: (personalInfo: any, experiences: any[]) => Promise<string>
  improveBulletPoint: (bulletPoint: string, context: string) => Promise<string>
  tailorResume: (resume: any, jobDescription: string) => Promise<AISuggestion[]>
  clearSuggestions: () => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AIState>({
    isLoading: false,
    suggestions: [],
    error: null,
  })

  const generateSummary = async (personalInfo: any, experiences: any[]): Promise<string> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ personalInfo, experiences }),
      })

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Ollama is not running. Please start Ollama or use the resume builder without AI features.')
        }
        throw new Error('Failed to generate summary')
      }

      const data = await response.json()
      setState(prev => ({ ...prev, isLoading: false }))
      return data.summary
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }))
      throw error
    }
  }

  const improveBulletPoint = async (bulletPoint: string, context: string): Promise<string> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await fetch('/api/ai/improve-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bulletPoint, context }),
      })

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Ollama is not running. Please start Ollama or use the resume builder without AI features.')
        }
        throw new Error('Failed to improve bullet point')
      }

      const data = await response.json()
      setState(prev => ({ ...prev, isLoading: false }))
      return data.improvedBullet
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }))
      throw error
    }
  }

  const tailorResume = async (resume: any, jobDescription: string): Promise<AISuggestion[]> => {
    setState(prev => ({ ...prev, isLoading: true, error: null }))
    
    try {
      const response = await fetch('/api/ai/tailor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resume, jobDescription }),
      })

      if (!response.ok) {
        if (response.status === 500) {
          throw new Error('Ollama is not running. Please start Ollama or use the resume builder without AI features.')
        }
        throw new Error('Failed to tailor resume')
      }

      const data = await response.json()
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        suggestions: data.suggestions 
      }))
      return data.suggestions
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        isLoading: false, 
        error: error instanceof Error ? error.message : 'Unknown error' 
      }))
      throw error
    }
  }

  const clearSuggestions = () => {
    setState(prev => ({ ...prev, suggestions: [] }))
  }

  const value: AIContextType = {
    state,
    generateSummary,
    improveBulletPoint,
    tailorResume,
    clearSuggestions,
  }

  return (
    <AIContext.Provider value={value}>
      {children}
    </AIContext.Provider>
  )
}

export function useAI() {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}
