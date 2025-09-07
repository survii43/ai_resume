'use client'

import React, { useState, useEffect } from 'react'
import { AlertTriangle, X, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export function AIStatusBanner() {
  const [isVisible, setIsVisible] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    // Check if Ollama is available
    const checkOllamaStatus = async () => {
      try {
        const response = await fetch('/api/ai/status', { 
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        })
        
        if (!response.ok) {
          setIsVisible(true)
        }
      } catch (error) {
        setIsVisible(true)
      } finally {
        setIsChecking(false)
      }
    }

    checkOllamaStatus()
  }, [])

  if (isChecking || !isVisible) {
    return null
  }

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-yellow-800">
            AI Features Unavailable
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              Ollama is not running on your system. AI-powered features like summary generation, 
              bullet point improvement, and resume tailoring are currently unavailable.
            </p>
            <div className="mt-3">
              <p className="font-medium">To enable AI features:</p>
              <ol className="list-decimal list-inside mt-1 space-y-1">
                <li>Install Ollama from <a href="https://ollama.ai" target="_blank" rel="noopener noreferrer" className="text-yellow-800 underline inline-flex items-center">
                  ollama.ai <ExternalLink className="w-3 h-3 ml-1" />
                </a></li>
                <li>Start Ollama service</li>
                <li>Pull a model: <code className="bg-yellow-100 px-1 rounded">ollama pull llama2</code></li>
                <li>Refresh this page</li>
              </ol>
            </div>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsVisible(false)}
                className="bg-yellow-50 text-yellow-800 border-yellow-300 hover:bg-yellow-100"
              >
                <X className="w-4 h-4 mr-1" />
                Dismiss
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
