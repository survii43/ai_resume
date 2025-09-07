'use client'

import React, { useState, useEffect } from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { useAI } from '@/contexts/AIContext'
import { useToast } from '@/contexts/ToastContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { PersonalInfo } from '@/types'
import { Sparkles, CheckCircle2, AlertCircle } from 'lucide-react'

export function PersonalInfoForm() {
  const { state, updatePersonalInfo } = useResume()
  const { generateSummary, state: aiState } = useAI()
  const { showSuccess, showError } = useToast()
  const [formData, setFormData] = useState<PersonalInfo>(
    state.resume.personalInfo || {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
    }
  )
  const [errors, setErrors] = useState<Partial<PersonalInfo>>({})
  const [touched, setTouched] = useState<Partial<Record<keyof PersonalInfo, boolean>>>({})

  const validateField = (field: keyof PersonalInfo, value: string): string | undefined => {
    switch (field) {
      case 'firstName':
      case 'lastName':
        return value.trim() ? undefined : 'This field is required'
      case 'email':
        if (!value.trim()) return 'Email is required'
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(value) ? undefined : 'Please enter a valid email address'
      case 'phone':
        if (!value.trim()) return undefined // Phone is optional
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
        return phoneRegex.test(value.replace(/[\s\-\(\)]/g, '')) ? undefined : 'Please enter a valid phone number'
      case 'website':
      case 'linkedin':
      case 'github':
        if (!value.trim()) return undefined // These are optional
        const urlRegex = /^https?:\/\/.+\..+/
        return urlRegex.test(value) || value.startsWith('linkedin.com/') || value.startsWith('github.com/') 
          ? undefined 
          : 'Please enter a valid URL'
      default:
        return undefined
    }
  }

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Validate field if it's been touched
    if (touched[field]) {
      const error = validateField(field, value)
      setErrors(prev => ({ ...prev, [field]: error }))
    }
  }

  const handleBlur = (field: keyof PersonalInfo) => {
    setTouched(prev => ({ ...prev, [field]: true }))
    const error = validateField(field, formData[field])
    setErrors(prev => ({ ...prev, [field]: error }))
  }

  const handleSave = () => {
    // Mark all fields as touched
    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key as keyof PersonalInfo] = true
      return acc
    }, {} as Record<keyof PersonalInfo, boolean>)
    setTouched(allTouched)

    // Validate all fields
    const newErrors: Partial<PersonalInfo> = {}
    Object.keys(formData).forEach(key => {
      const field = key as keyof PersonalInfo
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })
    setErrors(newErrors)

    // If no errors, save the data
    if (Object.keys(newErrors).length === 0) {
      updatePersonalInfo(formData)
      showSuccess('Personal Information Saved', 'Your personal information has been saved successfully!')
    } else {
      showError('Validation Error', 'Please fix the errors before saving.')
    }
  }

  const handleGenerateSummary = async () => {
    if (!formData.firstName || !formData.lastName) {
      showError('Missing Information', 'Please fill in your first and last name first.')
      return
    }

    try {
      const summary = await generateSummary(formData, state.resume.experiences)
      setFormData(prev => ({ ...prev, summary }))
      showSuccess('Summary Generated', 'AI has generated a professional summary for you!')
    } catch (error) {
      console.error('Failed to generate summary:', error)
      showError('Generation Failed', 'Failed to generate summary. Please try again.')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">Personal Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            value={formData.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            onBlur={() => handleBlur('firstName')}
            placeholder="John"
            error={touched.firstName ? errors.firstName : undefined}
          />
          <Input
            label="Last Name"
            value={formData.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            onBlur={() => handleBlur('lastName')}
            placeholder="Doe"
            error={touched.lastName ? errors.lastName : undefined}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="john.doe@email.com"
            error={touched.email ? errors.email : undefined}
          />
          <Input
            label="Phone"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="+1 (555) 123-4567"
            error={touched.phone ? errors.phone : undefined}
          />
        </div>

        <Input
          label="Location"
          value={formData.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          onBlur={() => handleBlur('location')}
          placeholder="San Francisco, CA"
          error={touched.location ? errors.location : undefined}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Website"
            value={formData.website}
            onChange={(e) => handleInputChange('website', e.target.value)}
            onBlur={() => handleBlur('website')}
            placeholder="https://johndoe.com"
            error={touched.website ? errors.website : undefined}
          />
          <Input
            label="LinkedIn"
            value={formData.linkedin}
            onChange={(e) => handleInputChange('linkedin', e.target.value)}
            onBlur={() => handleBlur('linkedin')}
            placeholder="linkedin.com/in/johndoe"
            error={touched.linkedin ? errors.linkedin : undefined}
          />
          <Input
            label="GitHub"
            value={formData.github}
            onChange={(e) => handleInputChange('github', e.target.value)}
            onBlur={() => handleBlur('github')}
            placeholder="github.com/johndoe"
            error={touched.github ? errors.github : undefined}
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Professional Summary
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleGenerateSummary}
              loading={aiState.isLoading}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Generate
            </Button>
          </div>
          <Textarea
            value={formData.summary}
            onChange={(e) => handleInputChange('summary', e.target.value)}
            placeholder="Write a compelling professional summary that highlights your key strengths and career focus..."
            rows={4}
          />
        </div>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            Save Personal Information
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
