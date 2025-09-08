'use client'

import React, { useState } from 'react'
import { IconButton } from '@/components/ui/IconButton'
import { cn } from '@/lib/utils'
import { Plus, X, ChevronUp, ChevronDown } from 'lucide-react'

interface FloatingAction {
  icon: React.ComponentType<{ className?: string }>
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
}

interface FloatingActionButtonProps {
  actions: FloatingAction[]
  className?: string
}

export function FloatingActionButton({ actions, className }: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  if (actions.length === 0) return null

  return (
    <div className={cn('fixed bottom-6 right-6 z-40', className)}>
      {/* Action buttons */}
      <div
        className={cn(
          'flex flex-col-reverse gap-3 mb-3 transition-all duration-300 transform',
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        {actions.map((action, index) => (
          <div
            key={index}
            className="flex items-center gap-3 bg-white rounded-lg shadow-lg p-2 border"
          >
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">
              {action.label}
            </span>
            <IconButton
              icon={action.icon}
              variant={action.variant || 'primary'}
              size="sm"
              onClick={action.onClick}
            />
          </div>
        ))}
      </div>

      {/* Main FAB */}
      <IconButton
        icon={isOpen ? X : Plus}
        variant="primary"
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="shadow-lg hover:shadow-xl"
      />
    </div>
  )
}
