'use client'

import React from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

const templates = [
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional, clean design perfect for corporate environments',
    preview: 'bg-gradient-to-br from-gray-100 to-gray-200',
  },
  {
    id: 'modern',
    name: 'Modern',
    description: 'Contemporary design with subtle colors and modern typography',
    preview: 'bg-gradient-to-br from-blue-100 to-blue-200',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Bold, colorful design perfect for creative professionals',
    preview: 'bg-gradient-to-br from-purple-100 to-purple-200',
  },
]

export function TemplateSelector() {
  const { state, setTemplate } = useResume()
  const { resume } = state

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Template</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all ${
                resume.template === template.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setTemplate(template.id)}
            >
              {resume.template === template.id && (
                <div className="absolute top-2 right-2">
                  <Check className="w-5 h-5 text-blue-600" />
                </div>
              )}
              <div className={`h-24 rounded mb-3 ${template.preview} flex items-center justify-center`}>
                <span className="text-gray-500 text-sm font-medium">{template.name}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
              <p className="text-sm text-gray-600">{template.description}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
