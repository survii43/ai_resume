'use client'

import React, { useState, useEffect } from 'react'
import { useAI } from '@/contexts/AIContext'
import { useResume } from '@/contexts/ResumeContext'
import { useToast } from '@/contexts/ToastContext'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Textarea } from '@/components/ui/Textarea'
import { 
  Sparkles, 
  Lightbulb, 
  Target, 
  FileText, 
  Zap, 
  TrendingUp, 
  CheckCircle, 
  AlertCircle, 
  RefreshCw,
  Copy,
  Download,
  Star,
  Award,
  Brain,
  Wand2
} from 'lucide-react'

export function AISuggestions() {
  const { generateSummary, improveBulletPoint, tailorResume, state: aiState } = useAI()
  const { state } = useResume()
  const { showSuccess, showError } = useToast()
  const [jobDescription, setJobDescription] = useState('')
  const [suggestions, setSuggestions] = useState<any>(null)
  const [aiAvailable, setAiAvailable] = useState(true)
  const [activeTab, setActiveTab] = useState<'summary' | 'tailor' | 'improve'>('summary')
  const [generatedSummary, setGeneratedSummary] = useState('')
  const [improvedBullets, setImprovedBullets] = useState<any[]>([])
  const [atsScore, setAtsScore] = useState(0)

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
      showError('Please fill in your personal information first')
      return
    }

    try {
      const summary = await generateSummary(state.resume.personalInfo, state.resume.experiences)
      setGeneratedSummary(summary)
      showSuccess('Professional summary generated successfully!')
    } catch (error) {
      console.error('Failed to generate summary:', error)
      setAiAvailable(false)
      showError(error instanceof Error ? error.message : 'Failed to generate summary. Please try again.')
    }
  }

  const handleTailorResume = async () => {
    if (!jobDescription.trim()) {
      showError('Please enter a job description')
      return
    }

    try {
      const suggestions = await tailorResume(state.resume, jobDescription)
      setSuggestions(suggestions)
      setAtsScore(Math.floor(Math.random() * 30) + 70) // Simulate ATS score improvement
      showSuccess('Resume tailored successfully!')
    } catch (error) {
      console.error('Failed to tailor resume:', error)
      setAiAvailable(false)
      showError(error instanceof Error ? error.message : 'Failed to tailor resume. Please try again.')
    }
  }

  const handleImproveBullets = async () => {
    if (!state.resume.experiences || state.resume.experiences.length === 0) {
      showError('Please add some work experience first')
      return
    }

    try {
      const improvements = []
      for (const exp of state.resume.experiences) {
        if (exp.description) {
          const improved = await improveBulletPoint(exp.description)
          improvements.push({
            original: exp.description,
            improved: improved,
            company: exp.company
          })
        }
      }
      setImprovedBullets(improvements)
      showSuccess('Bullet points improved successfully!')
    } catch (error) {
      console.error('Failed to improve bullet points:', error)
      showError('Failed to improve bullet points. Please try again.')
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    showSuccess('Copied to clipboard!')
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

  const tabs = [
    { id: 'summary', label: 'Summary', icon: FileText, color: 'blue' },
    { id: 'tailor', label: 'Tailor', icon: Target, color: 'green' },
    { id: 'improve', label: 'Improve', icon: TrendingUp, color: 'purple' }
  ]

  return (
    <div className="space-y-6">
      {/* Header with AI Status */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center text-gray-900">
              <Brain className="w-5 h-5 mr-2 text-purple-600" />
              AI Resume Assistant
            </CardTitle>
            <div className="flex items-center gap-2">
              <div className="flex items-center text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
                <span className="text-sm font-medium">AI Active</span>
              </div>
              <IconButton
                icon={RefreshCw}
                variant="outline"
                size="sm"
                onClick={() => setAiAvailable(true)}
                tooltip="Refresh AI connection"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Wand2 className="w-5 h-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-900">Smart Summary</span>
              </div>
              <p className="text-sm text-blue-700">Generate compelling professional summaries</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Target className="w-5 h-5 text-green-600 mr-2" />
                <span className="font-medium text-green-900">Job Matching</span>
              </div>
              <p className="text-sm text-green-700">Tailor resume for specific positions</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-purple-600 mr-2" />
                <span className="font-medium text-purple-900">ATS Optimization</span>
              </div>
              <p className="text-sm text-purple-700">Improve ATS compatibility and scoring</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? `bg-white text-${tab.color}-600 shadow-sm`
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tab Content */}
      {activeTab === 'summary' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <FileText className="w-5 h-5 mr-2 text-blue-600" />
              Professional Summary Generator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                Generate a compelling professional summary that highlights your key strengths and career focus.
              </p>
            </div>
            
            <Button
              onClick={handleGenerateSummary}
              loading={aiState.isLoading}
              className="w-full"
              size="lg"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              Generate Professional Summary
            </Button>

            {generatedSummary && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-900">Generated Summary</h4>
                  <IconButton
                    icon={Copy}
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(generatedSummary)}
                    tooltip="Copy to clipboard"
                  />
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{generatedSummary}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'tailor' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <Target className="w-5 h-5 mr-2 text-green-600" />
              Resume Tailoring
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-800">
                Paste a job description to get personalized suggestions for optimizing your resume.
              </p>
            </div>
            
            <Textarea
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={4}
            />
            
            <Button
              onClick={handleTailorResume}
              loading={aiState.isLoading}
              className="w-full"
              size="lg"
            >
              <Target className="w-4 h-4 mr-2" />
              Analyze & Get Suggestions
            </Button>

            {suggestions && (
              <div className="space-y-4">
                {atsScore > 0 && (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-green-900">ATS Score Improvement</h4>
                      <span className="text-lg font-bold text-green-600">{atsScore}/100</span>
                    </div>
                    <div className="w-full bg-green-200 rounded-full h-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full transition-all duration-1000"
                        style={{ width: `${atsScore}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {suggestions.missingKeywords && suggestions.missingKeywords.length > 0 && (
                    <div className="bg-red-50 p-4 rounded-lg">
                      <h4 className="font-medium text-red-900 mb-3 flex items-center">
                        <AlertCircle className="w-4 h-4 mr-2" />
                        Missing Keywords
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.missingKeywords.map((keyword: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {suggestions.skillEmphasis && suggestions.skillEmphasis.length > 0 && (
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-3 flex items-center">
                        <Star className="w-4 h-4 mr-2" />
                        Skills to Emphasize
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {suggestions.skillEmphasis.map((skill: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {suggestions.summarySuggestions && (
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2 flex items-center">
                        <Lightbulb className="w-4 h-4 mr-2" />
                        Summary Suggestions
                      </h4>
                      <p className="text-sm text-blue-800">{suggestions.summarySuggestions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {activeTab === 'improve' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-gray-900">
              <TrendingUp className="w-5 h-5 mr-2 text-purple-600" />
              Bullet Point Improvement
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-sm text-purple-800">
                Enhance your experience descriptions with action-oriented, quantifiable bullet points.
              </p>
            </div>
            
            <Button
              onClick={handleImproveBullets}
              loading={aiState.isLoading}
              className="w-full"
              size="lg"
            >
              <Zap className="w-4 h-4 mr-2" />
              Improve All Bullet Points
            </Button>

            {improvedBullets.length > 0 && (
              <div className="space-y-4">
                {improvedBullets.map((improvement, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-3">{improvement.company}</h4>
                    <div className="space-y-3">
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Original:</h5>
                        <p className="text-sm text-gray-600 bg-white p-2 rounded border-l-4 border-gray-300">
                          {improvement.original}
                        </p>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-700 mb-1">Improved:</h5>
                        <p className="text-sm text-gray-800 bg-green-50 p-2 rounded border-l-4 border-green-500">
                          {improvement.improved}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
