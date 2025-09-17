'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import { Tooltip } from './Tooltip'

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: LucideIcon
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  tooltip?: string
  showLabel?: boolean
  label?: string
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ 
    className, 
    icon: Icon, 
    variant = 'primary', 
    size = 'md', 
    loading = false, 
    tooltip,
    showLabel = false,
    label,
    children,
    disabled, 
    ...props 
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none transform active:scale-95'
    
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:scale-105',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 hover:shadow-md hover:scale-105',
      outline: 'border border-gray-300 bg-transparent text-gray-900 hover:bg-gray-50 hover:border-gray-400 hover:shadow-md hover:scale-105',
      ghost: 'text-gray-900 hover:bg-gray-100 hover:scale-105',
      destructive: 'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg hover:scale-105',
    }
    
    const sizes = {
      sm: 'h-8 w-8 p-1.5',
      md: 'h-10 w-10 p-2',
      lg: 'h-12 w-12 p-3',
    }

    const iconSizes = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    }

    const buttonContent = (
      <button
        className={cn(
          baseClasses,
          variants[variant],
          sizes[size],
          showLabel && 'w-auto px-3 gap-2',
          className
        )}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <svg className={cn(iconSizes[size], 'animate-spin')} viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <Icon className={iconSizes[size]} />
        )}
        {showLabel && label && (
          <span className="text-sm font-medium hidden sm:inline">
            {label}
          </span>
        )}
        {children}
      </button>
    )

    if (tooltip) {
      return (
        <Tooltip content={tooltip}>
          {buttonContent}
        </Tooltip>
      )
    }

    return buttonContent
  }
)

IconButton.displayName = 'IconButton'

export { IconButton }
