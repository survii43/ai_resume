'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { IconButton } from '@/components/ui/IconButton'

interface ResponsiveSidebarProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  title?: string
  className?: string
}

export function ResponsiveSidebar({ 
  isOpen, 
  onClose, 
  children, 
  title,
  className 
}: ResponsiveSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          className
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {title && (
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          )}
          <IconButton
            icon={X}
            variant="ghost"
            size="sm"
            onClick={onClose}
            tooltip="Close sidebar"
          />
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto h-full">
          {children}
        </div>
      </div>
    </>
  )
}
