'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  id: number
  title: string
  description: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
  onStepClick?: (step: number) => void
}

export function StepIndicator({ steps, currentStep, onStepClick }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-between min-w-max px-4 sm:px-0">
      {steps.map((step, index) => {
        const isCompleted = currentStep > step.id
        const isCurrent = currentStep === step.id
        const isClickable = onStepClick && (isCompleted || isCurrent)

        return (
          <div key={step.id} className="flex items-center">
            <div className="flex flex-col items-center">
              <button
                onClick={() => isClickable && onStepClick(step.id)}
                disabled={!isClickable}
                className={cn(
                  'flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 transition-all duration-300 transform',
                  isCompleted && 'bg-green-500 border-green-500 text-white shadow-lg',
                  isCurrent && 'bg-blue-500 border-blue-500 text-white shadow-lg animate-pulse',
                  !isCompleted && !isCurrent && 'bg-white border-gray-300 text-gray-400',
                  isClickable && 'cursor-pointer hover:scale-110 hover:shadow-md active:scale-95',
                  !isClickable && 'cursor-not-allowed'
                )}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-medium">{step.id}</span>
                )}
              </button>
              <div className="mt-1 sm:mt-2 text-center">
                <p className={cn(
                  'text-xs font-medium hidden sm:block',
                  isCurrent && 'text-blue-600',
                  isCompleted && 'text-green-600',
                  !isCompleted && !isCurrent && 'text-gray-600'
                )}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-600 mt-1 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                'flex-1 h-0.5 mx-2 sm:mx-4 transition-all duration-500 relative overflow-hidden',
                currentStep > step.id ? 'bg-green-500' : 'bg-gray-300'
              )}>
                {currentStep > step.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 animate-pulse"></div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
