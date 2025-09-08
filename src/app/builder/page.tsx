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
import { IconButton } from '@/components/ui/IconButton'
import { ResponsiveActionBar } from '@/components/ResponsiveActionBar'
import { ResponsiveSidebar } from '@/components/ResponsiveSidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { calculateProgress } from '@/lib/utils'
import { ChevronLeft, ChevronRight, Download, Share2, Loader2, CheckCircle2, Menu, X, User, Briefcase, GraduationCap, Code, FolderOpen, Eye } from 'lucide-react'

const steps = [
  { id: 1, title: 'Personal Info', description: 'Basic information', icon: User },
  { id: 2, title: 'Experience', description: 'Work history', icon: Briefcase },
  { id: 3, title: 'Education', description: 'Academic background', icon: GraduationCap },
  { id: 4, title: 'Skills', description: 'Technical & soft skills', icon: Code },
  { id: 5, title: 'Projects', description: 'Portfolio projects', icon: FolderOpen },
  { id: 6, title: 'Preview', description: 'Review & export', icon: Eye },
]

export default function ResumeBuilder() {
  const { state, setStep } = useResume()
  const { currentStep, resume } = state
  const resumeRef = React.useRef<HTMLDivElement>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
      
      {/* Mobile Sidebar */}
      <ResponsiveSidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        title="Resume Steps"
      >
        <div className="space-y-4">
          <div className="mb-6">
            <ProgressBar progress={progress} />
          </div>
          
          <div className="space-y-2">
            {steps.map((step) => {
              const isCompleted = currentStep > step.id
              const isCurrent = currentStep === step.id
              const Icon = step.icon
              
              return (
                <button
                  key={step.id}
                  onClick={() => {
                    handleStepClick(step.id)
                    setIsMobileMenuOpen(false)
                  }}
                  className={`
                    w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200
                    ${isCurrent 
                      ? 'bg-blue-50 border border-blue-200 text-blue-900' 
                      : isCompleted 
                        ? 'bg-green-50 border border-green-200 text-green-900 hover:bg-green-100'
                        : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className={`
                    flex items-center justify-center w-8 h-8 rounded-full border-2 transition-all duration-200
                    ${isCompleted && 'bg-green-500 border-green-500 text-white'}
                    ${isCurrent && 'bg-blue-500 border-blue-500 text-white'}
                    ${!isCompleted && !isCurrent && 'bg-white border-gray-300 text-gray-400'}
                  `}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{step.title}</p>
                    <p className="text-xs opacity-75">{step.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </ResponsiveSidebar>
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-4">
              <IconButton
                icon={isMobileMenuOpen ? X : Menu}
                variant="ghost"
                size="sm"
                className="lg:hidden"
                tooltip={isMobileMenuOpen ? "Close menu" : "Open menu"}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 transition-colors duration-300">
                  Resume Builder
                </h1>
                <p className="text-sm sm:text-base text-gray-700 transition-colors duration-300 hidden sm:block">
                  Create your professional resume with AI assistance
                </p>
              </div>
            </div>
            
            <ResponsiveActionBar
              actions={[
                {
                  icon: Share2,
                  label: 'Share',
                  onClick: () => console.log('Share clicked'),
                  variant: 'outline',
                  tooltip: 'Share your resume'
                },
                {
                  icon: Download,
                  label: 'Export',
                  onClick: () => console.log('Export clicked'),
                  variant: 'primary',
                  tooltip: 'Export your resume'
                }
              ]}
            />
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
            <div className="flex justify-between items-center">
              <IconButton
                icon={ChevronLeft}
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1 || isTransitioning}
                loading={isTransitioning}
                tooltip="Previous step"
                showLabel={true}
                label="Previous"
                className="flex-1 sm:flex-none"
              />
              <IconButton
                icon={ChevronRight}
                variant="primary"
                onClick={handleNext}
                disabled={currentStep === steps.length || isTransitioning}
                loading={isTransitioning}
                tooltip="Next step"
                showLabel={true}
                label="Next"
                className="flex-1 sm:flex-none"
              />
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
