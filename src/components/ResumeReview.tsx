'use client'

import React, { useState, useEffect } from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  CheckCircle, 
  AlertCircle, 
  Star, 
  TrendingUp, 
  FileText, 
  Target,
  Lightbulb,
  BarChart3,
  Clock,
  Users
} from 'lucide-react'
import { calculateProgress } from '@/lib/utils'

interface ReviewItem {
  id: string
  title: string
  status: 'complete' | 'incomplete' | 'warning'
  score: number
  maxScore: number
  suggestions: string[]
  category: 'content' | 'format' | 'ats' | 'optimization'
}

export function ResumeReview() {
  const { state } = useResume()
  const [reviewItems, setReviewItems] = useState<ReviewItem[]>([])
  const [overallScore, setOverallScore] = useState(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  useEffect(() => {
    analyzeResume()
  }, [state.resume])

  const analyzeResume = () => {
    setIsAnalyzing(true)
    
    // Simulate analysis delay
    setTimeout(() => {
      const items: ReviewItem[] = []
      const resume = state.resume

      // Personal Information Analysis
      const personalInfoScore = calculatePersonalInfoScore(resume.personalInfo)
      items.push({
        id: 'personal-info',
        title: 'Personal Information',
        status: personalInfoScore >= 80 ? 'complete' : personalInfoScore >= 60 ? 'warning' : 'incomplete',
        score: personalInfoScore,
        maxScore: 100,
        suggestions: getPersonalInfoSuggestions(resume.personalInfo),
        category: 'content'
      })

      // Experience Analysis
      const experienceScore = calculateExperienceScore(resume.experiences)
      items.push({
        id: 'experience',
        title: 'Work Experience',
        status: experienceScore >= 80 ? 'complete' : experienceScore >= 60 ? 'warning' : 'incomplete',
        score: experienceScore,
        maxScore: 100,
        suggestions: getExperienceSuggestions(resume.experiences),
        category: 'content'
      })

      // Skills Analysis
      const skillsScore = calculateSkillsScore(resume.skills)
      items.push({
        id: 'skills',
        title: 'Skills & Competencies',
        status: skillsScore >= 80 ? 'complete' : skillsScore >= 60 ? 'warning' : 'incomplete',
        score: skillsScore,
        maxScore: 100,
        suggestions: getSkillsSuggestions(resume.skills),
        category: 'content'
      })

      // Education Analysis
      const educationScore = calculateEducationScore(resume.education)
      items.push({
        id: 'education',
        title: 'Education',
        status: educationScore >= 80 ? 'complete' : educationScore >= 60 ? 'warning' : 'incomplete',
        score: educationScore,
        maxScore: 100,
        suggestions: getEducationSuggestions(resume.education),
        category: 'content'
      })

      // ATS Optimization Analysis
      const atsScore = calculateATSScore(resume)
      items.push({
        id: 'ats-optimization',
        title: 'ATS Optimization',
        status: atsScore >= 80 ? 'complete' : atsScore >= 60 ? 'warning' : 'incomplete',
        score: atsScore,
        maxScore: 100,
        suggestions: getATSSuggestions(resume),
        category: 'ats'
      })

      // Format & Design Analysis
      const formatScore = calculateFormatScore(resume)
      items.push({
        id: 'format-design',
        title: 'Format & Design',
        status: formatScore >= 80 ? 'complete' : formatScore >= 60 ? 'warning' : 'incomplete',
        score: formatScore,
        maxScore: 100,
        suggestions: getFormatSuggestions(resume),
        category: 'format'
      })

      setReviewItems(items)
      
      // Calculate overall score
      const totalScore = items.reduce((sum, item) => sum + item.score, 0)
      const maxTotalScore = items.reduce((sum, item) => sum + item.maxScore, 0)
      setOverallScore(Math.round((totalScore / maxTotalScore) * 100))
      
      setIsAnalyzing(false)
    }, 1500)
  }

  const calculatePersonalInfoScore = (personalInfo: any) => {
    let score = 0
    if (personalInfo?.firstName) score += 20
    if (personalInfo?.lastName) score += 20
    if (personalInfo?.email) score += 20
    if (personalInfo?.phone) score += 15
    if (personalInfo?.location) score += 15
    if (personalInfo?.summary) score += 10
    return score
  }

  const calculateExperienceScore = (experiences: any[]) => {
    if (!experiences || experiences.length === 0) return 0
    
    let score = 0
    const hasRecentExperience = experiences.some(exp => {
      const endDate = exp.endDate || new Date().toISOString().slice(0, 7)
      const monthsAgo = (new Date().getTime() - new Date(endDate).getTime()) / (1000 * 60 * 60 * 24 * 30)
      return monthsAgo <= 24
    })
    
    if (hasRecentExperience) score += 30
    if (experiences.length >= 2) score += 20
    if (experiences.some(exp => exp.description && exp.description.length > 50)) score += 25
    if (experiences.some(exp => exp.description?.includes('managed') || exp.description?.includes('developed'))) score += 25
    
    return Math.min(score, 100)
  }

  const calculateSkillsScore = (skills: any[]) => {
    if (!skills || skills.length === 0) return 0
    
    let score = 0
    if (skills.length >= 5) score += 30
    if (skills.length >= 10) score += 20
    if (skills.some(skill => skill.category === 'technical')) score += 25
    if (skills.some(skill => skill.category === 'soft')) score += 25
    
    return Math.min(score, 100)
  }

  const calculateEducationScore = (education: any[]) => {
    if (!education || education.length === 0) return 0
    
    let score = 0
    if (education.length >= 1) score += 50
    if (education.some(edu => edu.degree)) score += 30
    if (education.some(edu => edu.institution)) score += 20
    
    return Math.min(score, 100)
  }

  const calculateATSScore = (resume: any) => {
    let score = 0
    
    // Check for ATS-friendly elements
    if (resume.personalInfo?.email) score += 15
    if (resume.personalInfo?.phone) score += 15
    if (resume.experiences && resume.experiences.length > 0) score += 20
    if (resume.skills && resume.skills.length > 0) score += 15
    if (resume.personalInfo?.summary) score += 15
    if (resume.education && resume.education.length > 0) score += 20
    
    return Math.min(score, 100)
  }

  const calculateFormatScore = (resume: any) => {
    let score = 0
    
    // Check for consistent formatting
    if (resume.personalInfo?.firstName && resume.personalInfo?.lastName) score += 30
    if (resume.experiences && resume.experiences.length > 0) score += 25
    if (resume.skills && resume.skills.length > 0) score += 25
    if (resume.personalInfo?.summary) score += 20
    
    return Math.min(score, 100)
  }

  const getPersonalInfoSuggestions = (personalInfo: any) => {
    const suggestions = []
    if (!personalInfo?.summary) suggestions.push('Add a professional summary to highlight your key strengths')
    if (!personalInfo?.linkedin) suggestions.push('Include your LinkedIn profile for professional networking')
    if (!personalInfo?.github && personalInfo?.skills?.some((s: any) => s.category === 'technical')) {
      suggestions.push('Add your GitHub profile to showcase your technical work')
    }
    return suggestions
  }

  const getExperienceSuggestions = (experiences: any[]) => {
    const suggestions = []
    if (!experiences || experiences.length === 0) {
      suggestions.push('Add your work experience to demonstrate your professional background')
    } else {
      if (experiences.some(exp => !exp.description)) {
        suggestions.push('Add detailed descriptions for each role with quantifiable achievements')
      }
      if (experiences.length < 2) {
        suggestions.push('Consider adding more work experience or relevant projects')
      }
    }
    return suggestions
  }

  const getSkillsSuggestions = (skills: any[]) => {
    const suggestions = []
    if (!skills || skills.length === 0) {
      suggestions.push('Add relevant skills to showcase your competencies')
    } else {
      if (skills.length < 5) suggestions.push('Add more skills to demonstrate your expertise')
      if (!skills.some(skill => skill.category === 'technical')) {
        suggestions.push('Include technical skills relevant to your field')
      }
      if (!skills.some(skill => skill.category === 'soft')) {
        suggestions.push('Add soft skills like leadership, communication, and teamwork')
      }
    }
    return suggestions
  }

  const getEducationSuggestions = (education: any[]) => {
    const suggestions = []
    if (!education || education.length === 0) {
      suggestions.push('Add your educational background')
    } else {
      if (education.some(edu => !edu.degree)) {
        suggestions.push('Include degree information for each education entry')
      }
    }
    return suggestions
  }

  const getATSSuggestions = (resume: any) => {
    const suggestions = []
    if (!resume.personalInfo?.summary) {
      suggestions.push('Add a professional summary with relevant keywords')
    }
    if (!resume.skills || resume.skills.length < 5) {
      suggestions.push('Include more skills with industry-standard keywords')
    }
    suggestions.push('Use standard section headings (Experience, Education, Skills)')
    suggestions.push('Avoid graphics, tables, or complex formatting')
    return suggestions
  }

  const getFormatSuggestions = (resume: any) => {
    const suggestions = []
    if (!resume.personalInfo?.firstName || !resume.personalInfo?.lastName) {
      suggestions.push('Ensure your full name is prominently displayed')
    }
    suggestions.push('Use consistent formatting throughout the resume')
    suggestions.push('Keep the resume to 1-2 pages maximum')
    suggestions.push('Use bullet points for easy scanning')
    return suggestions
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-red-600" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'content':
        return <FileText className="w-4 h-4" />
      case 'format':
        return <Target className="w-4 h-4" />
      case 'ats':
        return <BarChart3 className="w-4 h-4" />
      case 'optimization':
        return <TrendingUp className="w-4 h-4" />
      default:
        return <Lightbulb className="w-4 h-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-gray-900">
          <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
          Resume Review & Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-900">
        {/* Overall Score */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Overall Resume Score</h3>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{overallScore}/100</span>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className={`h-3 rounded-full transition-all duration-1000 ${
                overallScore >= 80 ? 'bg-green-500' : 
                overallScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${overallScore}%` }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {overallScore >= 80 ? 'Excellent! Your resume is well-optimized.' :
             overallScore >= 60 ? 'Good start! Consider the suggestions below.' :
             'Needs improvement. Focus on the areas below.'}
          </p>
        </div>

        {/* Analysis Status */}
        {isAnalyzing ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
            <span className="text-gray-600">Analyzing your resume...</span>
          </div>
        ) : (
          <>
            {/* Review Items */}
            <div className="space-y-4">
              {reviewItems.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(item.status)}
                      <div className="flex items-center space-x-2">
                        {getCategoryIcon(item.category)}
                        <h4 className="font-medium text-gray-900">{item.title}</h4>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(item.score)} ${getScoreColor(item.score)}`}>
                      {item.score}/{item.maxScore}
                    </div>
                  </div>
                  
                  {item.suggestions.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Suggestions:</h5>
                      <ul className="space-y-1">
                        {item.suggestions.map((suggestion, index) => (
                          <li key={index} className="text-sm text-gray-600 flex items-start">
                            <Lightbulb className="w-3 h-3 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            {suggestion}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4 border-t">
              <Button 
                onClick={analyzeResume}
                variant="outline"
                className="flex items-center"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Re-analyze Resume
              </Button>
              
              <Button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="outline"
                className="flex items-center"
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Go to Step 1
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
