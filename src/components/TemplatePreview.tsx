'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Eye, X } from 'lucide-react'

interface TemplatePreviewProps {
  isVisible: boolean
  onClose: () => void
  settings: {
    template: string
    colorScheme: string
    fontSize: string
    fontFamily: string
    layout: string
    showDividers: boolean
    showIcons: boolean
    compactMode: boolean
  }
}

export function TemplatePreview({ isVisible, onClose, settings }: TemplatePreviewProps) {
  if (!isVisible) return null

  const getColorClasses = (colorScheme: string) => {
    const colors = {
      blue: { primary: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', accent: 'bg-blue-100' },
      green: { primary: 'text-green-600', bg: 'bg-green-50', border: 'border-green-200', accent: 'bg-green-100' },
      purple: { primary: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-200', accent: 'bg-purple-100' },
      red: { primary: 'text-red-600', bg: 'bg-red-50', border: 'border-red-200', accent: 'bg-red-100' },
      indigo: { primary: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-200', accent: 'bg-indigo-100' },
      teal: { primary: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-200', accent: 'bg-teal-100' },
      orange: { primary: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', accent: 'bg-orange-100' },
      gray: { primary: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', accent: 'bg-gray-100' },
    }
    return colors[colorScheme as keyof typeof colors] || colors.blue
  }

  const getTemplateStyles = (template: string) => {
    const styles = {
      classic: {
        header: 'text-center',
        section: 'mb-6',
        divider: 'border-t-2',
        spacing: 'space-y-4'
      },
      modern: {
        header: 'text-left',
        section: 'mb-8',
        divider: 'border-t border-dashed',
        spacing: 'space-y-6'
      },
      creative: {
        header: 'text-center',
        section: 'mb-8',
        divider: 'border-t-4 border-double',
        spacing: 'space-y-6'
      },
      professional: {
        header: 'text-center',
        section: 'mb-6',
        divider: 'border-t-2',
        spacing: 'space-y-4'
      },
      minimalist: {
        header: 'text-left',
        section: 'mb-4',
        divider: 'border-t',
        spacing: 'space-y-3'
      },
      executive: {
        header: 'text-center',
        section: 'mb-6',
        divider: 'border-t-2',
        spacing: 'space-y-4'
      }
    }
    return styles[template as keyof typeof styles] || styles.classic
  }

  const getFontSizeClass = (fontSize: string) => {
    const sizes = {
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    }
    return sizes[fontSize as keyof typeof sizes] || 'text-base'
  }

  const getFontFamilyClass = (fontFamily: string) => {
    const families = {
      sans: 'font-sans',
      serif: 'font-serif',
      mono: 'font-mono',
    }
    return families[fontFamily as keyof typeof families] || 'font-sans'
  }

  const colors = getColorClasses(settings.colorScheme)
  const fontSizeClass = getFontSizeClass(settings.fontSize)
  const fontFamilyClass = getFontFamilyClass(settings.fontFamily)
  const templateStyles = getTemplateStyles(settings.template)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Eye className="w-5 h-5 mr-2 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Template Preview</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto">
            {/* Resume Preview */}
            <div className={`${fontFamilyClass} ${fontSizeClass} ${templateStyles.spacing}`}>
              {/* Header */}
              <div className={`${templateStyles.header} ${templateStyles.section} ${settings.compactMode ? 'mb-4' : ''}`}>
                <h1 className={`text-2xl font-bold ${colors.primary} ${settings.compactMode ? 'text-xl' : 'text-2xl'}`}>
                  John Doe
                </h1>
                <div className={`flex items-center ${templateStyles.header === 'text-center' ? 'justify-center' : 'justify-start'} space-x-4 mt-2 ${settings.compactMode ? 'mt-1' : 'mt-2'}`}>
                  <span className="text-gray-600">john.doe@email.com</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">+1 (555) 123-4567</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600">San Francisco, CA</span>
                </div>
              </div>

              {settings.showDividers && <hr className={`${templateStyles.divider} ${colors.border} ${templateStyles.section}`} />}

              {/* Professional Summary */}
              <div className={`${templateStyles.section} ${settings.compactMode ? 'mb-4' : ''}`}>
                <h2 className={`text-lg font-semibold ${colors.primary} mb-3 ${settings.compactMode ? 'mb-2' : 'mb-3'}`}>
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  Experienced software engineer with 5+ years of expertise in full-stack development, 
                  specializing in React, Node.js, and cloud technologies. Proven track record of delivering 
                  scalable solutions and leading cross-functional teams.
                </p>
              </div>

              {settings.showDividers && <hr className={`${templateStyles.divider} ${colors.border} ${templateStyles.section}`} />}

              {/* Experience */}
              <div className={`${templateStyles.section} ${settings.compactMode ? 'mb-4' : ''}`}>
                <h2 className={`text-lg font-semibold ${colors.primary} mb-4 ${settings.compactMode ? 'mb-3' : 'mb-4'}`}>
                  Work Experience
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">Senior Software Engineer</h3>
                      <span className="text-gray-600 text-sm">2020 - Present</span>
                    </div>
                    <p className={`text-gray-600 mb-2 ${settings.compactMode ? 'mb-1' : 'mb-2'}`}>
                      Tech Corp, San Francisco, CA
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Led development of microservices architecture serving 1M+ users</li>
                      <li>Improved application performance by 40% through code optimization</li>
                      <li>Mentored junior developers and conducted code reviews</li>
                    </ul>
                  </div>

                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">Software Engineer</h3>
                      <span className="text-gray-600 text-sm">2018 - 2020</span>
                    </div>
                    <p className={`text-gray-600 mb-2 ${settings.compactMode ? 'mb-1' : 'mb-2'}`}>
                      StartupXYZ, San Francisco, CA
                    </p>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>Developed React-based web applications with modern UI/UX</li>
                      <li>Collaborated with design team to implement responsive layouts</li>
                      <li>Participated in agile development processes and sprint planning</li>
                    </ul>
                  </div>
                </div>
              </div>

              {settings.showDividers && <hr className={`${templateStyles.divider} ${colors.border} ${templateStyles.section}`} />}

              {/* Skills */}
              <div className={`${templateStyles.section} ${settings.compactMode ? 'mb-4' : ''}`}>
                <h2 className={`text-lg font-semibold ${colors.primary} mb-3 ${settings.compactMode ? 'mb-2' : 'mb-3'}`}>
                  Technical Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'].map((skill) => (
                    <span
                      key={skill}
                      className={`px-3 py-1 rounded-full text-sm ${colors.accent} ${colors.primary} border ${colors.border}`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {settings.showDividers && <hr className={`${templateStyles.divider} ${colors.border} ${templateStyles.section}`} />}

              {/* Education */}
              <div className={templateStyles.section}>
                <h2 className={`text-lg font-semibold ${colors.primary} mb-3 ${settings.compactMode ? 'mb-2' : 'mb-3'}`}>
                  Education
                </h2>
                <div>
                  <h3 className="font-semibold text-gray-900">Bachelor of Science in Computer Science</h3>
                  <p className="text-gray-600">University of California, Berkeley • 2014 - 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
