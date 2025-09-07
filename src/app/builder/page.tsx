'use client'

import React, { useState, useEffect } from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { ProgressBar } from '@/components/ProgressBar'
import { StepIndicator } from '@/components/StepIndicator'
import { PersonalInfoForm } from '@/components/forms/PersonalInfoForm'
import { ExperienceForm } from '@/components/forms/ExperienceForm'
import { EducationForm } from '@/components/forms/EducationForm'
import { SkillsForm } from '@/components/forms/SkillsForm'
import { ProjectsForm } from '@/components/forms/ProjectsForm'
import { ResumePreview } from '@/components/preview/ResumePreview'
import { TemplateSelector } from '@/components/TemplateSelector'
import { AISuggestions } from '@/components/AISuggestions'
import { TemplateConfig } from '@/components/TemplateConfig'
import { ExportButtons } from '@/components/ExportButtons'
import { AIStatusBanner } from '@/components/AIStatusBanner'
import { ATSResumeGenerator } from '@/components/ATSResumeGenerator'
import { Step6Review } from '@/components/Step6Review'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { calculateProgress } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Download, Share2, Loader2, CheckCircle2 } from 'lucide-react'

const steps = [
  { id: 1, title: 'Personal Info', description: 'Basic information' },
  { id: 2, title: 'Experience', description: 'Work history' },
  { id: 3, title: 'Education', description: 'Academic background' },
  { id: 4, title: 'Skills', description: 'Technical & soft skills' },
  { id: 5, title: 'Projects', description: 'Portfolio projects' },
  { id: 6, title: 'Preview', description: 'Review & export' },
]

export default function ResumeBuilder() {
  const { state, setStep } = useResume()
  const { currentStep, resume } = state
  const resumeRef = React.useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const progress = calculateProgress(resume)

  const handleNext = async () => {
    if (currentStep < steps.length) {
      setIsTransitioning(true)
      await new Promise(resolve => setTimeout(resolve, 150))
      setStep(currentStep + 1)
      setIsTransitioning(false)
      
      // Show success feedback for completing a step
      if (currentStep < steps.length - 1) {
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2000)
      }
    }
  }

  const handlePrevious = async () => {
    if (currentStep > 1) {
      setIsTransitioning(true)
      await new Promise(resolve => setTimeout(resolve, 150))
      setStep(currentStep - 1)
      setIsTransitioning(false)
    }
  }

  const handleStepClick = async (step: number) => {
    if (step !== currentStep) {
      setIsTransitioning(true)
      await new Promise(resolve => setTimeout(resolve, 150))
      setStep(step)
      setIsTransitioning(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoForm />
      case 2:
        return <ExperienceForm />
      case 3:
        return <EducationForm />
      case 4:
        return <SkillsForm />
      case 5:
        return <ProjectsForm />
      case 6:
        return (
          <Step6Review 
            resumeRef={resumeRef}
            onPreviousStep={() => setStep(5)}
          />
        )
      default:
        return <PersonalInfoForm />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* AI Status Banner */}
      <AIStatusBanner />
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-4 sm:gap-0">
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 transition-colors duration-300">
                Resume Builder
              </h1>
              <p className="text-sm sm:text-base text-gray-700 transition-colors duration-300">
                Create your professional resume with AI assistance
              </p>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
              <Button 
                variant="outline" 
                size="sm"
                className="transition-all duration-200 hover:scale-105 hover:shadow-md w-full sm:w-auto"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button 
                size="sm"
                className="transition-all duration-200 hover:scale-105 hover:shadow-md w-full sm:w-auto"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Progress Bar */}
        <div className="mb-6 sm:mb-8">
          <ProgressBar progress={progress} />
        </div>

        {/* Step Indicator */}
        <div className="mb-6 sm:mb-8 overflow-x-auto">
          <div className="min-w-max">
            <StepIndicator
              steps={steps}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Panel - Form */}
          <div className="space-y-6">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>
                    Step {currentStep}: {steps[currentStep - 1]?.title}
                  </span>
                  {showSuccess && (
                    <CheckCircle2 className="w-5 h-5 text-green-500 animate-pulse" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
                {renderStepContent()}
              </CardContent>
            </Card>

            {/* Navigation */}
            <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isTransitioning}
                className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100 w-full sm:w-auto"
              >
                {isTransitioning ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ChevronLeft className="w-4 h-4 mr-2" />
                )}
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={currentStep === steps.length || isTransitioning}
                className="transition-all duration-200 hover:scale-105 disabled:hover:scale-100 w-full sm:w-auto"
              >
                {isTransitioning ? (
                  <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                ) : (
                  <>
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-8">
            <Card className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span>Live Preview</span>
                  <div className="ml-2 w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="max-h-[800px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                  <div 
                    ref={resumeRef}
                    className={`transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-75' : 'scale-100 opacity-100'}`}
                  >
                    <ResumePreview />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
