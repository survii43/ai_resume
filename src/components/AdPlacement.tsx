'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/Card'

interface AdPlacementProps {
  size: 'banner' | 'rectangle' | 'square' | 'skyscraper' | 'mobile-banner' | 'mobile-rectangle'
  className?: string
  placeholder?: string
}

export function AdPlacement({ size, className = '', placeholder }: AdPlacementProps) {
  const getAdDimensions = () => {
    switch (size) {
      case 'banner':
        return 'h-24 md:h-32' // 728x90, 970x90
      case 'rectangle':
        return 'h-48 md:h-60' // 300x250, 336x280
      case 'square':
        return 'h-48 w-48 md:h-60 md:w-60' // 250x250, 300x300
      case 'skyscraper':
        return 'h-96 w-32 md:h-[600px] md:w-40' // 160x600, 300x600
      case 'mobile-banner':
        return 'h-16 w-full' // 320x50
      case 'mobile-rectangle':
        return 'h-48 w-full' // 320x250
      default:
        return 'h-24'
    }
  }

  const getAdContent = () => {
    if (placeholder) return placeholder
    
    switch (size) {
      case 'banner':
        return 'Advertisement - 728x90'
      case 'rectangle':
        return 'Advertisement - 300x250'
      case 'square':
        return 'Advertisement - 250x250'
      case 'skyscraper':
        return 'Advertisement - 160x600'
      case 'mobile-banner':
        return 'Advertisement - 320x50'
      case 'mobile-rectangle':
        return 'Advertisement - 320x250'
      default:
        return 'Advertisement'
    }
  }

  return (
    <Card className={`${getAdDimensions()} ${className} border-dashed border-2 border-gray-300 bg-gray-50`}>
      <CardContent className="flex items-center justify-center h-full">
        <div className="text-center text-gray-500">
          <div className="text-xs font-medium mb-1">AD SPACE</div>
          <div className="text-xs">{getAdContent()}</div>
        </div>
      </CardContent>
    </Card>
  )
}
