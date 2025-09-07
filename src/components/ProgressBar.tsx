'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface ProgressBarProps {
  progress: number
  className?: string
  showPercentage?: boolean
}

export function ProgressBar({ progress, className, showPercentage = true }: ProgressBarProps) {
  const getProgressColor = (progress: number) => {
    if (progress < 30) return 'bg-red-500'
    if (progress < 60) return 'bg-yellow-500'
    if (progress < 80) return 'bg-blue-500'
    return 'bg-green-500'
  }

  const getProgressEmoji = (progress: number) => {
    if (progress < 30) return '😴'
    if (progress < 60) return '🚀'
    if (progress < 80) return '💪'
    return '🎉'
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900 transition-colors duration-300">
          Resume Progress
        </span>
        {showPercentage && (
          <span className="text-sm text-gray-500 transition-all duration-300">
            {progress}% <span className="inline-block animate-bounce">{getProgressEmoji(progress)}</span>
          </span>
        )}
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className={cn(
            'h-2.5 rounded-full transition-all duration-500 ease-out relative',
            getProgressColor(progress)
          )}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
