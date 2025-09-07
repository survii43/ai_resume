'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
import { ResumeProvider } from '@/contexts/ResumeContext'
import { AIProvider } from '@/contexts/AIContext'
import { ToastProvider } from '@/contexts/ToastContext'

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ToastProvider>
        <ResumeProvider>
          <AIProvider>
            {children}
          </AIProvider>
        </ResumeProvider>
      </ToastProvider>
    </SessionProvider>
  )
}
