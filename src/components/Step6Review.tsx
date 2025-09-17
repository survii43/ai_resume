'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { ResumeReview } from './ResumeReview'
import { AISuggestions } from './AISuggestions'
import { ATSResumeGenerator } from './ATSResumeGenerator'
import { TemplateConfig } from './TemplateConfig'
import { ExportButtons } from './ExportButtons'
import { CompletionStatus } from './CompletionStatus'
import { useResume } from '@/contexts/ResumeContext'
import { 
  BarChart3, 
  Sparkles, 
  FileText, 
  Download, 
  Settings,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  TrendingUp,
  Zap,
  Target,
  Award,
  Clock,
  Users,
  Share2
} from 'lucide-react'

interface Step6ReviewProps {
  resumeRef: React.RefObject<HTMLDivElement>
  onPreviousStep: () => void
}

export function Step6Review({ resumeRef, onPreviousStep }: Step6ReviewProps) {
  const [activeTab, setActiveTab] = useState<'review' | 'ai' | 'template' | 'export'>('review')
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set(['review']))
  const [showCelebration, setShowCelebration] = useState(false)
  const { state } = useResume()

  const tabs = [
    { 
      id: 'review', 
      label: 'Resume Review', 
      icon: BarChart3, 
      description: 'Analyze and score your resume',
      color: 'blue',
      completed: true
    },
    { 
      id: 'ai', 
      label: 'AI Assistant', 
      icon: Sparkles, 
      description: 'AI-powered improvements',
      color: 'purple',
      completed: false
    },
    { 
      id: 'template', 
      label: 'Template & Design', 
      icon: Settings, 
      description: 'Customize appearance',
      color: 'green',
      completed: false
    },
    { 
      id: 'export', 
      label: 'Export & Share', 
      icon: Download, 
      description: 'Download and share',
      color: 'orange',
      completed: false
    }
  ]

  // Calculate overall progress
  const calculateProgress = () => {
    const totalSteps = tabs.length
    const completedCount = completedSteps.size
    return Math.round((completedCount / totalSteps) * 100)
  }

  // Mark step as completed
  const markStepCompleted = (stepId: string) => {
    setCompletedSteps(prev => new Set([...prev, stepId]))
    if (stepId === 'export') {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }

  // Auto-advance to next step after completing current one
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId as any)
    markStepCompleted(tabId)
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'review':
        return (
          <div className="space-y-6">
            <CompletionStatus />
            <ResumeReview />
          </div>
        )
      case 'ai':
        return (
          <div className="space-y-6">
            <AISuggestions />
            <ATSResumeGenerator />
          </div>
        )
      case 'template':
        return <TemplateConfig />
      case 'export':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-900">
                <Download className="w-5 h-5 mr-2 text-blue-600" />
                Export & Share Your Resume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 mb-4">
                Export your resume in multiple formats or share it with others for feedback.
              </p>
              <ExportButtons resumeRef={resumeRef} />
            </CardContent>
          </Card>
        )
      default:
        return (
          <div className="space-y-6">
            <CompletionStatus />
            <ResumeReview />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      {/* Celebration Modal */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center max-w-md mx-4">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Congratulations!</h3>
            <p className="text-gray-600 mb-4">Your resume is complete and ready to impress employers!</p>
            <Button onClick={() => setShowCelebration(false)} className="bg-green-600 hover:bg-green-700">
              Continue
            </Button>
          </div>
        </div>
      )}

      {/* Header with Progress */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">
              Step 6: Review & Finalize
            </span>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Review & Finalize</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Review your resume, apply AI improvements, customize the design, and export your final document
        </p>
      </div>

      {/* Overall Progress Bar */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-bold text-blue-600">{calculateProgress()}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="bg-white rounded-lg p-4 shadow-sm border">
        <div className="flex items-center justify-center space-x-1 overflow-x-auto">
          {tabs.map((tab, index) => {
            const isCompleted = completedSteps.has(tab.id)
            const isActive = activeTab === tab.id
            const colorClasses = {
              blue: isActive ? 'bg-blue-100 text-blue-700 border-blue-200' : 'text-blue-600 hover:bg-blue-50',
              purple: isActive ? 'bg-purple-100 text-purple-700 border-purple-200' : 'text-purple-600 hover:bg-purple-50',
              green: isActive ? 'bg-green-100 text-green-700 border-green-200' : 'text-green-600 hover:bg-green-50',
              orange: isActive ? 'bg-orange-100 text-orange-700 border-orange-200' : 'text-orange-600 hover:bg-orange-50'
            }
            
            return (
              <div key={tab.id} className="flex items-center">
                <button
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all border-2 ${
                    isActive 
                      ? colorClasses[tab.color as keyof typeof colorClasses]
                      : 'text-gray-600 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  <div className="relative">
                    <tab.icon className="w-5 h-5" />
                    {isCompleted && (
                      <CheckCircle className="w-3 h-3 text-green-600 absolute -top-1 -right-1 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="font-medium whitespace-nowrap">{tab.label}</span>
                </button>
                {index < tabs.length - 1 && (
                  <ArrowRight className="w-4 h-4 text-gray-400 mx-2 flex-shrink-0" />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Tab Description with Tips */}
      <div className="text-center">
        <p className="text-sm text-gray-500 mb-2">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </p>
        {activeTab === 'review' && (
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center">
              <Target className="w-3 h-3 mr-1" />
              <span>Get your ATS score</span>
            </div>
            <div className="flex items-center">
              <Award className="w-3 h-3 mr-1" />
              <span>Review suggestions</span>
            </div>
          </div>
        )}
        {activeTab === 'ai' && (
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center">
              <Zap className="w-3 h-3 mr-1" />
              <span>AI-powered improvements</span>
            </div>
            <div className="flex items-center">
              <Star className="w-3 h-3 mr-1" />
              <span>ATS optimization</span>
            </div>
          </div>
        )}
        {activeTab === 'template' && (
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center">
              <Settings className="w-3 h-3 mr-1" />
              <span>Customize design</span>
            </div>
            <div className="flex items-center">
              <Users className="w-3 h-3 mr-1" />
              <span>Professional templates</span>
            </div>
          </div>
        )}
        {activeTab === 'export' && (
          <div className="flex items-center justify-center space-x-4 text-xs text-gray-400">
            <div className="flex items-center">
              <Download className="w-3 h-3 mr-1" />
              <span>Multiple formats</span>
            </div>
            <div className="flex items-center">
              <Share2 className="w-3 h-3 mr-1" />
              <span>Share with others</span>
            </div>
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>

      {/* Enhanced Navigation */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
          <Button
            variant="outline"
            onClick={onPreviousStep}
            className="flex items-center w-full lg:w-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Previous Step
          </Button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="flex items-center space-x-1">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`w-2 h-2 rounded-full ${
                      completedSteps.has(tab.id) ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {completedSteps.size} of {tabs.length} steps completed
              </span>
            </div>
            
            {completedSteps.size === tabs.length ? (
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="font-medium">Resume completed! Ready to export.</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Continue to complete your resume</span>
              </div>
            )}
          </div>

          <Button
            onClick={() => handleTabChange('export')}
            className="flex items-center w-full lg:w-auto bg-green-600 hover:bg-green-700"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Resume
          </Button>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className={`hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 ${
            activeTab === 'review' ? 'ring-2 ring-blue-500 bg-blue-50' : ''
          }`} 
          onClick={() => handleTabChange('review')}
        >
          <CardContent className="p-6 text-center">
            <div className="relative">
              <BarChart3 className="w-10 h-10 text-blue-600 mx-auto mb-3" />
              {completedSteps.has('review') && (
                <CheckCircle className="w-5 h-5 text-green-600 absolute -top-1 -right-1 bg-white rounded-full" />
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Review Score</h3>
            <p className="text-sm text-gray-600 mb-3">Check your resume quality and get detailed feedback</p>
            <div className="text-xs text-blue-600 font-medium">Get ATS Score</div>
          </CardContent>
        </Card>

        <Card 
          className={`hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 ${
            activeTab === 'ai' ? 'ring-2 ring-purple-500 bg-purple-50' : ''
          }`} 
          onClick={() => handleTabChange('ai')}
        >
          <CardContent className="p-6 text-center">
            <div className="relative">
              <Sparkles className="w-10 h-10 text-purple-600 mx-auto mb-3" />
              {completedSteps.has('ai') && (
                <CheckCircle className="w-5 h-5 text-green-600 absolute -top-1 -right-1 bg-white rounded-full" />
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">AI Improvements</h3>
            <p className="text-sm text-gray-600 mb-3">Enhance your resume with AI-powered suggestions</p>
            <div className="text-xs text-purple-600 font-medium">AI Assistant</div>
          </CardContent>
        </Card>

        <Card 
          className={`hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 ${
            activeTab === 'template' ? 'ring-2 ring-green-500 bg-green-50' : ''
          }`} 
          onClick={() => handleTabChange('template')}
        >
          <CardContent className="p-6 text-center">
            <div className="relative">
              <Settings className="w-10 h-10 text-green-600 mx-auto mb-3" />
              {completedSteps.has('template') && (
                <CheckCircle className="w-5 h-5 text-green-600 absolute -top-1 -right-1 bg-white rounded-full" />
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Template & Design</h3>
            <p className="text-sm text-gray-600 mb-3">Customize colors, fonts, and layout</p>
            <div className="text-xs text-green-600 font-medium">Customize</div>
          </CardContent>
        </Card>

        <Card 
          className={`hover:shadow-lg transition-all cursor-pointer transform hover:-translate-y-1 ${
            activeTab === 'export' ? 'ring-2 ring-orange-500 bg-orange-50' : ''
          }`} 
          onClick={() => handleTabChange('export')}
          data-tab="export"
        >
          <CardContent className="p-6 text-center">
            <div className="relative">
              <Download className="w-10 h-10 text-orange-600 mx-auto mb-3" />
              {completedSteps.has('export') && (
                <CheckCircle className="w-5 h-5 text-green-600 absolute -top-1 -right-1 bg-white rounded-full" />
              )}
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Export & Share</h3>
            <p className="text-sm text-gray-600 mb-3">Download in multiple formats and share</p>
            <div className="text-xs text-orange-600 font-medium">Download</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
