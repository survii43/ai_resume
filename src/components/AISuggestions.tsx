'use client'

import React, { useState, useEffect } from 'react'
import { useAI } from '@/contexts/AIContext'
import { useResume } from '@/contexts/ResumeContext'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Textarea } from '@/components/ui/Textarea'
import { Sparkles, Lightbulb, Target, FileText } from 'lucide-react'

export function AISuggestions() {
  const { generateSummary, improveBulletPoint, tailorResume, state: aiState } = useAI()
  const { state } = useResume()
  const [jobDescription, setJobDescription] = useState('')
  const [suggestions, setSuggestions] = useState<any>(null)
  const [aiAvailable, setAiAvailable] = useState(true)

  useEffect(() => {
    // Check AI availability on component mount
    const checkAIAvailability = async () => {
      try {
        const response = await fetch('/api/ai/status')
        if (!response.ok) {
          setAiAvailable(false)
        }
      } catch (error) {
        setAiAvailable(false)
      }
    }
    
    checkAIAvailability()
  }, [])

  const handleGenerateSummary = async () => {
    if (!state.resume.personalInfo?.firstName) {
      alert('Please fill in your personal information first')
      return
    }

    try {
      const summary = await generateSummary(state.resume.personalInfo, state.resume.experiences)
      // Update the personal info with the generated summary
      // This would need to be connected to the form state
      console.log('Generated summary:', summary)
    } catch (error) {
      console.error('Failed to generate summary:', error)
      setAiAvailable(false)
      // Show user-friendly error message
      alert(error instanceof Error ? error.message : 'Failed to generate summary. Please try again.')
    }
  }

  const handleTailorResume = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description')
      return
    }

    try {
      const suggestions = await tailorResume(state.resume, jobDescription)
      setSuggestions(suggestions)
    } catch (error) {
      console.error('Failed to tailor resume:', error)
      setAiAvailable(false)
      // Show user-friendly error message
      alert(error instanceof Error ? error.message : 'Failed to tailor resume. Please try again.')
    }
  }

  if (!aiAvailable) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Sparkles className="w-5 h-5 mr-2 text-gray-400" />
            AI Resume Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-gray-900">
          <div className="text-center py-8">
            <div className="text-gray-500 mb-4">
              <Sparkles className="w-12 h-12 mx-auto mb-2 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-700">AI Features Unavailable</h3>
              <p className="text-sm text-gray-600 mt-2">
                Ollama is not running. Please start Ollama to use AI-powered features.
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => setAiAvailable(true)}
              className="text-gray-600"
            >
              Retry Connection
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900">
          <Sparkles className="w-5 h-5 mr-2 text-blue-600" />
          AI Resume Assistant
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-900">
        {/* Summary Generation */}
        <div className="space-y-2">
          <h3 className="font-medium flex items-center">
            <FileText className="w-4 h-4 mr-2" />
            Professional Summary
          </h3>
          <p className="text-sm text-gray-600">
            Generate a compelling professional summary based on your experience
          </p>
          <Button
            onClick={handleGenerateSummary}
            loading={aiState.isLoading}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Generate Summary
          </Button>
        </div>

        {/* Resume Tailoring */}
        <div className="space-y-2">
          <h3 className="font-medium flex items-center">
            <Target className="w-4 h-4 mr-2" />
            Tailor for Job
          </h3>
          <p className="text-sm text-gray-600">
            Get suggestions to match your resume to a specific job description
          </p>
          <Textarea
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={3}
          />
          <Button
            onClick={handleTailorResume}
            loading={aiState.isLoading}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Target className="w-4 h-4 mr-2" />
            Analyze & Suggest
          </Button>
        </div>

        {/* Suggestions Display */}
        {suggestions && (
          <div className="space-y-3 p-4 bg-blue-50 rounded-lg">
            <h4 className="font-medium flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-yellow-600" />
              AI Suggestions
            </h4>
            
            {suggestions.missingKeywords && suggestions.missingKeywords.length > 0 && (
              <div>
                <h5 className="font-medium text-sm mb-2">Missing Keywords:</h5>
                <div className="flex flex-wrap gap-1">
                  {suggestions.missingKeywords.map((keyword: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {suggestions.summarySuggestions && (
              <div>
                <h5 className="font-medium text-sm mb-2">Summary Suggestions:</h5>
                <p className="text-sm text-gray-700">{suggestions.summarySuggestions}</p>
              </div>
            )}

            {suggestions.experienceRecommendations && (
              <div>
                <h5 className="font-medium text-sm mb-2">Experience Recommendations:</h5>
                <p className="text-sm text-gray-700">{suggestions.experienceRecommendations}</p>
              </div>
            )}

            {suggestions.skillEmphasis && suggestions.skillEmphasis.length > 0 && (
              <div>
                <h5 className="font-medium text-sm mb-2">Skills to Emphasize:</h5>
                <div className="flex flex-wrap gap-1">
                  {suggestions.skillEmphasis.map((skill: string, index: number) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
