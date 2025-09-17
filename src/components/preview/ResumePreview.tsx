'use client'

import React from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { formatDate } from '@/lib/utils'
import { Star } from 'lucide-react'

const convertToBulletPoints = (description: string, bulletStyle: string) => {
  if (!description) return []
  
  // Split by common separators and clean up
  let sentences = description
    .split(/[.!?]+/)
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .map(s => s.replace(/^[-—•→\d+\.\s]+/, '').trim()) // Remove existing bullets
    .filter(s => s.length > 15) // Filter out very short fragments
  
  // If no sentences found, try splitting by other patterns
  if (sentences.length === 0) {
    sentences = description
      .split(/[,;]+/)
      .map(s => s.trim())
      .filter(s => s.length > 15)
  }
  
  // If still no sentences, create meaningful bullets from the description
  if (sentences.length === 0) {
    const words = description.split(' ')
    if (words.length > 10) {
      const midPoint = Math.floor(words.length / 2)
      sentences = [
        words.slice(0, midPoint).join(' '),
        words.slice(midPoint).join(' ')
      ]
    } else {
      sentences = [description]
    }
  }
  
  return sentences.map((sentence, index) => {
    let bullet = ''
    switch (bulletStyle) {
      case 'dash':
        bullet = '—'
        break
      case 'dot':
        bullet = '•'
        break
      case 'arrow':
        bullet = '→'
        break
      case 'number':
        bullet = `${index + 1}.`
        break
      default:
        bullet = '—'
    }
    return `${bullet} ${sentence}`
  })
}

export function ResumePreview() {
  const { state } = useResume()
  const { resume } = state
  
  // Get template settings with defaults
  const templateSettings = resume.templateSettings || {
    template: 'classic',
    colorScheme: 'blue',
    fontSize: 'base',
    fontFamily: 'sans',
    layout: 'single',
    showDividers: true,
    showIcons: true,
    compactMode: false,
    convertToBullets: true,
    bulletStyle: 'dash',
  }

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < level ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const getSkillsByCategory = () => {
    const categories: { [key: string]: any[] } = {}
    if (resume.skills && resume.skills.length > 0) {
      resume.skills.forEach(skill => {
        if (!categories[skill.category]) {
          categories[skill.category] = []
        }
        categories[skill.category].push(skill)
      })
    }
    return categories
  }


  // Show placeholder if no data
  if (!resume.personalInfo?.firstName && !resume.personalInfo?.lastName) {
    return (
      <div className="bg-white p-8 max-w-4xl mx-auto shadow-lg">
        <div className="text-center text-gray-500">
          <h2 className="text-2xl font-semibold mb-4">Resume Preview</h2>
          <p className="text-lg">Start filling out the form to see your resume preview here</p>
          <div className="mt-8 p-6 border-2 border-dashed border-gray-300 rounded-lg">
            <p className="text-sm text-gray-400">
              Your resume will appear here as you add information
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (templateSettings.template === 'modern') {
    return <ModernTemplate resume={resume} templateSettings={templateSettings} renderStars={renderStars} getSkillsByCategory={getSkillsByCategory} />
  }

  if (templateSettings.template === 'creative') {
    return <CreativeTemplate resume={resume} templateSettings={templateSettings} renderStars={renderStars} getSkillsByCategory={getSkillsByCategory} />
  }

  return <ClassicTemplate resume={resume} templateSettings={templateSettings} renderStars={renderStars} getSkillsByCategory={getSkillsByCategory} />
}

function ClassicTemplate({ resume, templateSettings, renderStars, getSkillsByCategory }: any) {
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

  const colors = getColorClasses(templateSettings.colorScheme)
  const fontSizeClass = getFontSizeClass(templateSettings.fontSize)
  const fontFamilyClass = getFontFamilyClass(templateSettings.fontFamily)

  return (
    <div className={`bg-white p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto shadow-lg text-gray-900 ${fontFamilyClass} ${fontSizeClass} ${templateSettings.compactMode ? 'space-y-4' : 'space-y-6'}`}>
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          {resume.personalInfo?.firstName} {resume.personalInfo?.lastName}
        </h1>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-gray-600 mt-2 text-sm sm:text-base">
          {resume.personalInfo?.email && <span className="break-all">{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
        </div>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-blue-600 mt-2 text-sm sm:text-base">
          {resume.personalInfo?.website && <span className="break-all">{resume.personalInfo.website}</span>}
          {resume.personalInfo?.linkedin && <span className="break-all">{resume.personalInfo.linkedin}</span>}
          {resume.personalInfo?.github && <span className="break-all">{resume.personalInfo.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.personalInfo?.summary && (
        <div className={templateSettings.compactMode ? 'mb-4' : 'mb-8'}>
          <h2 className={`text-xl font-semibold ${colors.primary} mb-3 ${templateSettings.showDividers ? `border-b-2 ${colors.border}` : ''}`}>
            Professional Summary
          </h2>
          <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experiences && resume.experiences.length > 0 && (
        <div className={templateSettings.compactMode ? 'mb-4' : 'mb-8'}>
          <h2 className={`text-xl font-semibold ${colors.primary} mb-3 ${templateSettings.showDividers ? `border-b-2 ${colors.border}` : ''}`}>
            Work Experience
          </h2>
          {resume.experiences?.map((exp: any) => (
            <div key={exp.id} className="mb-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                  <p className={`${colors.primary} font-medium`}>{exp.company}</p>
                  {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                </div>
                <div className="text-right text-gray-600">
                  <p>{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                </div>
              </div>
              {exp.description && (
                <div className="text-gray-700 mt-2">
                  {templateSettings.convertToBullets ? (
                    <ul className="list-none space-y-1">
                      {convertToBulletPoints(exp.description, templateSettings.bulletStyle).map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <span className="mr-2 text-gray-600">
                            {templateSettings.bulletStyle === 'dash' ? '—' :
                             templateSettings.bulletStyle === 'dot' ? '•' :
                             templateSettings.bulletStyle === 'arrow' ? '→' :
                             templateSettings.bulletStyle === 'number' ? `${index + 1}.` : '—'}
                          </span>
                          <span>{bullet.replace(/^[—•→\d+\.\s]+/, '')}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>{exp.description}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education && resume.education.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-300">
            Education
          </h2>
          {resume.education?.map((edu: any) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <p className="text-blue-600 font-medium">{edu.institution}</p>
                  {edu.field && <p className="text-gray-600">{edu.field}</p>}
                  {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                </div>
                <div className="text-right text-gray-600">
                  <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</p>
                </div>
              </div>
              {edu.description && (
                <p className="text-gray-700 mt-2">{edu.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {resume.skills && resume.skills.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-300">
            Skills
          </h2>
          {Object.entries(getSkillsByCategory()).map(([category, skills]) => (
            <div key={category} className="mb-4">
              <h3 className="font-semibold text-gray-800 capitalize mb-2">{category}</h3>
              <div className="grid grid-cols-2 gap-2">
                {(skills as any[]).map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <span className="text-gray-700">{skill.name}</span>
                    <div className="flex items-center space-x-1">
                      {renderStars(skill.level)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects && resume.projects.length > 0 && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-3 border-b-2 border-gray-300">
            Projects
          </h2>
          {resume.projects?.map((project: any) => (
            <div key={project.id} className="mb-4">
              <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
              {project.description && (
                <p className="text-gray-700 mt-1">{project.description}</p>
              )}
              {project.technologies && (
                <p className="text-gray-600 text-sm mt-1">Technologies: {project.technologies}</p>
              )}
              <div className="flex space-x-4 mt-2">
                {project.url && (
                  <a href={project.url} className="text-blue-600 text-sm hover:underline">
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} className="text-blue-600 text-sm hover:underline">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ModernTemplate({ resume, templateSettings, renderStars, getSkillsByCategory }: any) {
  return (
    <div className="bg-white max-w-4xl mx-auto shadow-lg">
      {/* Header with colored background */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8">
        <h1 className="text-3xl font-bold">
          {resume.personalInfo?.firstName} {resume.personalInfo?.lastName}
        </h1>
        <div className="flex flex-wrap justify-center space-x-4 text-blue-100 mt-2">
          {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
        </div>
        <div className="flex justify-center space-x-4 text-blue-200 mt-2">
          {resume.personalInfo?.website && <span>{resume.personalInfo.website}</span>}
          {resume.personalInfo?.linkedin && <span>{resume.personalInfo.linkedin}</span>}
          {resume.personalInfo?.github && <span>{resume.personalInfo.github}</span>}
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {resume.personalInfo?.summary && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-6 bg-blue-600 mr-3"></div>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-6 bg-blue-600 mr-3"></div>
              Work Experience
            </h2>
            {resume.experiences?.map((exp: any) => (
              <div key={exp.id} className="mb-6 border-l-4 border-blue-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                  </div>
                  <div className="text-right text-gray-600">
                    <p>{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 mt-2">
                    {templateSettings.convertToBullets ? (
                      <ul className="list-none space-y-1">
                        {convertToBulletPoints(exp.description, templateSettings.bulletStyle).map((bullet, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 text-gray-600">
                              {templateSettings.bulletStyle === 'dash' ? '—' :
                               templateSettings.bulletStyle === 'dot' ? '•' :
                               templateSettings.bulletStyle === 'arrow' ? '→' :
                               templateSettings.bulletStyle === 'number' ? `${index + 1}.` : '—'}
                            </span>
                            <span>{bullet.replace(/^[—•→\d+\.\s-]+/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{exp.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-6 bg-blue-600 mr-3"></div>
              Education
            </h2>
            {resume.education?.map((edu: any) => (
              <div key={edu.id} className="mb-4 border-l-4 border-blue-200 pl-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-gray-600">
                    <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</p>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-6 bg-blue-600 mr-3"></div>
              Skills
            </h2>
            {Object.entries(getSkillsByCategory()).map(([category, skills]) => (
              <div key={category} className="mb-4">
                <h3 className="font-semibold text-gray-800 capitalize mb-2">{category}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(skills as any[]).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <span className="text-gray-700">{skill.name}</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(skill.level)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-1 h-6 bg-blue-600 mr-3"></div>
              Projects
            </h2>
            {resume.projects?.map((project: any) => (
              <div key={project.id} className="mb-4 border-l-4 border-blue-200 pl-4">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                {project.description && (
                  <p className="text-gray-700 mt-1">{project.description}</p>
                )}
                {project.technologies && (
                  <p className="text-gray-600 text-sm mt-1">Technologies: {project.technologies}</p>
                )}
                <div className="flex space-x-4 mt-2">
                  {project.url && (
                    <a href={project.url} className="text-blue-600 text-sm hover:underline">
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="text-blue-600 text-sm hover:underline">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function CreativeTemplate({ resume, templateSettings, renderStars, getSkillsByCategory }: any) {
  return (
    <div className="bg-white max-w-4xl mx-auto shadow-lg">
      {/* Creative Header */}
      <div className="bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full -ml-12 -mb-12"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-2">
            {resume.personalInfo?.firstName} {resume.personalInfo?.lastName}
          </h1>
          <div className="flex flex-wrap justify-center space-x-4 text-purple-100 mt-2">
            {resume.personalInfo?.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo?.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo?.location && <span>{resume.personalInfo.location}</span>}
          </div>
          <div className="flex justify-center space-x-4 text-purple-200 mt-2">
            {resume.personalInfo?.website && <span>{resume.personalInfo.website}</span>}
            {resume.personalInfo?.linkedin && <span>{resume.personalInfo.linkedin}</span>}
            {resume.personalInfo?.github && <span>{resume.personalInfo.github}</span>}
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Summary */}
        {resume.personalInfo?.summary && (
          <div className="mb-8 bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{resume.personalInfo.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experiences.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
              Work Experience
            </h2>
            {resume.experiences.map((exp: any, index: number) => (
              <div key={exp.id} className={`mb-6 p-4 rounded-lg ${index % 2 === 0 ? 'bg-purple-50' : 'bg-blue-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-purple-600 font-medium">{exp.company}</p>
                    {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                  </div>
                  <div className="text-right text-gray-600">
                    <p>{formatDate(exp.startDate)} - {exp.isCurrent ? 'Present' : formatDate(exp.endDate)}</p>
                  </div>
                </div>
                {exp.description && (
                  <div className="text-gray-700 mt-2">
                    {templateSettings.convertToBullets ? (
                      <ul className="list-none space-y-1">
                        {convertToBulletPoints(exp.description, templateSettings.bulletStyle).map((bullet, index) => (
                          <li key={index} className="flex items-start">
                            <span className="mr-2 text-gray-600">
                              {templateSettings.bulletStyle === 'dash' ? '—' :
                               templateSettings.bulletStyle === 'dot' ? '•' :
                               templateSettings.bulletStyle === 'arrow' ? '→' :
                               templateSettings.bulletStyle === 'number' ? `${index + 1}.` : '—'}
                            </span>
                            <span>{bullet.replace(/^[—•→\d+\.\s-]+/, '')}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{exp.description}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
              Education
            </h2>
            {resume.education.map((edu: any, index: number) => (
              <div key={edu.id} className={`mb-4 p-4 rounded-lg ${index % 2 === 0 ? 'bg-purple-50' : 'bg-blue-50'}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-purple-600 font-medium">{edu.institution}</p>
                    {edu.field && <p className="text-gray-600">{edu.field}</p>}
                    {edu.gpa && <p className="text-gray-600 text-sm">GPA: {edu.gpa}</p>}
                  </div>
                  <div className="text-right text-gray-600">
                    <p>{formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Present'}</p>
                  </div>
                </div>
                {edu.description && (
                  <p className="text-gray-700 mt-2">{edu.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
              Skills
            </h2>
            {Object.entries(getSkillsByCategory()).map(([category, skills]) => (
              <div key={category} className="mb-4">
                <h3 className="font-semibold text-gray-800 capitalize mb-2">{category}</h3>
                <div className="grid grid-cols-2 gap-2">
                  {(skills as any[]).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between p-2 bg-gradient-to-r from-purple-50 to-blue-50 rounded">
                      <span className="text-gray-700">{skill.name}</span>
                      <div className="flex items-center space-x-1">
                        {renderStars(skill.level)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
              <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
              Projects
            </h2>
            {resume.projects.map((project: any, index: number) => (
              <div key={project.id} className={`mb-4 p-4 rounded-lg ${index % 2 === 0 ? 'bg-purple-50' : 'bg-blue-50'}`}>
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                {project.description && (
                  <p className="text-gray-700 mt-1">{project.description}</p>
                )}
                {project.technologies && (
                  <p className="text-gray-600 text-sm mt-1">Technologies: {project.technologies}</p>
                )}
                <div className="flex space-x-4 mt-2">
                  {project.url && (
                    <a href={project.url} className="text-purple-600 text-sm hover:underline">
                      Live Demo
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} className="text-purple-600 text-sm hover:underline">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
