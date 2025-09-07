'use client'

import React from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  CheckCircle, 
  Circle, 
  Clock, 
  Star,
  TrendingUp,
  Target
} from 'lucide-react'
import { calculateProgress } from '@/lib/utils'

export function CompletionStatus() {
  const { state } = useResume()
  const progress = calculateProgress(state.resume)

  const sections = [
    {
      id: 'personal',
      title: 'Personal Information',
      completed: !!(state.resume.personalInfo?.firstName && state.resume.personalInfo?.lastName && state.resume.personalInfo?.email),
      weight: 20
    },
    {
      id: 'experience',
      title: 'Work Experience',
      completed: state.resume.experiences && state.resume.experiences.length > 0,
      weight: 30
    },
    {
      id: 'education',
      title: 'Education',
      completed: state.resume.education && state.resume.education.length > 0,
      weight: 15
    },
    {
      id: 'skills',
      title: 'Skills',
      completed: state.resume.skills && state.resume.skills.length > 0,
      weight: 20
    },
    {
      id: 'projects',
      title: 'Projects',
      completed: state.resume.projects && state.resume.projects.length > 0,
      weight: 15
    }
  ]

  const completedSections = sections.filter(section => section.completed).length
  const totalSections = sections.length

  const getCompletionLevel = () => {
    if (progress >= 90) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' }
    if (progress >= 70) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' }
    if (progress >= 50) return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' }
    return { level: 'Needs Work', color: 'text-red-600', bgColor: 'bg-red-100' }
  }

  const completionLevel = getCompletionLevel()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900">
          <Target className="w-5 h-5 mr-2 text-blue-600" />
          Resume Completion Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-gray-900">
        {/* Overall Progress */}
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Star className="w-6 h-6 text-yellow-500" />
            <span className="text-2xl font-bold text-gray-900">{progress}%</span>
            <span className="text-gray-600">Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
            <div 
              className="h-3 bg-blue-600 rounded-full transition-all duration-1000"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${completionLevel.bgColor} ${completionLevel.color}`}>
            {completionLevel.level}
          </div>
        </div>

        {/* Section Status */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Section Status</h4>
          {sections.map((section) => (
            <div key={section.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                {section.completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <Circle className="w-5 h-5 text-gray-400" />
                )}
                <span className={`font-medium ${section.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                  {section.title}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">{section.weight}%</span>
                {section.completed && <TrendingUp className="w-4 h-4 text-green-600" />}
              </div>
            </div>
          ))}
        </div>

        {/* Completion Stats */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{completedSections}</div>
            <div className="text-sm text-gray-600">Sections Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalSections - completedSections}</div>
            <div className="text-sm text-gray-600">Remaining</div>
          </div>
        </div>

        {/* Next Steps */}
        {progress < 100 && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h5 className="font-medium text-blue-900 mb-2">Next Steps</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              {!sections.find(s => s.id === 'personal')?.completed && (
                <li>• Complete your personal information</li>
              )}
              {!sections.find(s => s.id === 'experience')?.completed && (
                <li>• Add your work experience</li>
              )}
              {!sections.find(s => s.id === 'skills')?.completed && (
                <li>• Include relevant skills</li>
              )}
              {!sections.find(s => s.id === 'education')?.completed && (
                <li>• Add your education background</li>
              )}
              {!sections.find(s => s.id === 'projects')?.completed && (
                <li>• Showcase your projects</li>
              )}
            </ul>
          </div>
        )}

        {progress === 100 && (
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <h5 className="font-medium text-green-900 mb-1">Resume Complete!</h5>
            <p className="text-sm text-green-800">Your resume is ready for review and export.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
