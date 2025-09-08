'use client'

import React from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { Button } from '@/components/ui/Button'
import { LucideIcon } from 'lucide-react'

interface ActionItem {
  icon: LucideIcon
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  disabled?: boolean
  loading?: boolean
  tooltip?: string
}

interface ResponsiveActionBarProps {
  actions: ActionItem[]
  className?: string
}

export function ResponsiveActionBar({ actions, className = '' }: ResponsiveActionBarProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Desktop: Show all actions with labels */}
      <div className="hidden sm:flex items-center gap-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant || 'outline'}
            size="sm"
            onClick={action.onClick}
            disabled={action.disabled}
            className="transition-all duration-200 hover:scale-105 hover:shadow-md"
          >
            <action.icon className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        ))}
      </div>

      {/* Mobile: Show only icons */}
      <div className="flex items-center gap-1 sm:hidden">
        {actions.map((action, index) => (
          <IconButton
            key={index}
            icon={action.icon}
            variant={action.variant || 'outline'}
            size="sm"
            onClick={action.onClick}
            disabled={action.disabled}
            loading={action.loading}
            tooltip={action.tooltip || action.label}
          />
        ))}
      </div>
    </div>
  )
}
