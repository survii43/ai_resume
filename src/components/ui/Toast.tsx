'use client'

import React, { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react'

export interface ToastProps {
  id: string
  type: 'success' | 'error' | 'info' | 'warning'
  title: string
  description?: string
  duration?: number
  onClose: (id: string) => void
}

const toastIcons = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
  warning: AlertCircle,
}

const toastStyles = {
  success: 'bg-green-600 border-green-700 text-white dark:bg-green-800 dark:border-green-600 dark:text-white',
  error: 'bg-red-600 border-red-700 text-white dark:bg-red-800 dark:border-red-600 dark:text-white',
  info: 'bg-blue-600 border-blue-700 text-white dark:bg-blue-800 dark:border-blue-600 dark:text-white',
  warning: 'bg-yellow-600 border-yellow-700 text-white dark:bg-yellow-800 dark:border-yellow-600 dark:text-white',
}

const iconStyles = {
  success: 'text-white dark:text-white',
  error: 'text-white dark:text-white',
  info: 'text-white dark:text-white',
  warning: 'text-white dark:text-white',
}

const closeButtonStyles = {
  success: 'text-white hover:text-gray-200 hover:bg-green-700 dark:text-white dark:hover:text-gray-200 dark:hover:bg-green-700/50',
  error: 'text-white hover:text-gray-200 hover:bg-red-700 dark:text-white dark:hover:text-gray-200 dark:hover:bg-red-700/50',
  info: 'text-white hover:text-gray-200 hover:bg-blue-700 dark:text-white dark:hover:text-gray-200 dark:hover:bg-blue-700/50',
  warning: 'text-white hover:text-gray-200 hover:bg-yellow-700 dark:text-white dark:hover:text-gray-200 dark:hover:bg-yellow-700/50',
}

export function Toast({ id, type, title, description, duration = 5000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const Icon = toastIcons[type]

  const handleClose = useCallback(() => {
    setIsLeaving(true)
    setTimeout(() => {
      onClose(id)
    }, 300)
  }, [id, onClose])

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    
    // Auto-close timer
    const autoCloseTimer = setTimeout(() => {
      handleClose()
    }, duration)

    return () => {
      clearTimeout(timer)
      clearTimeout(autoCloseTimer)
    }
  }, [duration, handleClose])

  return (
    <div
      className={cn(
        'min-w-0 max-w-full border rounded-lg shadow-lg pointer-events-auto transition-all duration-300 transform',
        toastStyles[type],
        isVisible && !isLeaving ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      )}
    >
      <div className="p-3 sm:p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5" style={{ color: 'white' }} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium break-words" style={{ color: 'white' }}>{title}</p>
            {description && (
              <p className="mt-1 text-xs sm:text-sm opacity-90 break-words leading-relaxed" style={{ color: 'white' }}>{description}</p>
            )}
          </div>
          <div className="flex-shrink-0">
            <button
              className="inline-flex focus:outline-none transition-colors duration-200 p-1 rounded-md"
              style={{ color: 'white' }}
              onClick={handleClose}
              aria-label="Close notification"
            >
              <X className="h-3 w-3 sm:h-4 sm:w-4" style={{ color: 'white' }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ToastContainerProps {
  toasts: ToastProps[]
  onClose: (id: string) => void
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-4 left-2 right-2 sm:left-auto sm:right-4 sm:max-w-md z-50 space-y-2 pointer-events-none">
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto w-full">
          <Toast {...toast} onClose={onClose} />
        </div>
      ))}
    </div>
  )
}
