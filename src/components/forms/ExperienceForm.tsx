'use client'

import React, { useState } from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { useAI } from '@/contexts/AIContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Experience } from '@/types'
import { Trash2, Sparkles } from 'lucide-react'
import { generateId } from '@/lib/utils'

export function ExperienceForm() {
  const { state, addExperience, updateExperience, deleteExperience } = useResume()
  const { improveBulletPoint, state: aiState } = useAI()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Experience>({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    isCurrent: false,
    description: '',
    order: state.resume.experiences.length,
  })


  const handleInputChange = (field: keyof Experience, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }


  const handleSave = () => {
    if (editingId) {
      updateExperience({ ...formData, id: editingId })
    } else {
      addExperience({ ...formData, id: generateId() })
    }
    resetForm()
  }

  const handleEdit = (experience: Experience) => {
    setFormData(experience)
    setEditingId(experience.id!)
  }

  const handleDelete = (id: string) => {
    deleteExperience(id)
  }

  const resetForm = () => {
    setFormData({
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      order: state.resume.experiences.length,
    })
    setEditingId(null)
  }

  const handleImproveDescription = async () => {
    if (!formData.description) return

    try {
      const improvedDescription = await improveBulletPoint(
        formData.description,
        `${formData.position} at ${formData.company}`
      )
      setFormData(prev => ({ ...prev, description: improvedDescription }))
    } catch (error) {
      console.error('Failed to improve description:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">Work Experience</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company"
            value={formData.company}
            onChange={(e) => handleInputChange('company', e.target.value)}
            placeholder="Acme Inc."
          />
          <Input
            label="Position"
            value={formData.position}
            onChange={(e) => handleInputChange('position', e.target.value)}
            placeholder="Software Engineer"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
          <Input
            label="Start Date"
            type="month"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />
          <Input
            label="End Date"
            type="month"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
            disabled={formData.isCurrent}
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isCurrent"
            checked={formData.isCurrent}
            onChange={(e) => handleInputChange('isCurrent', e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="isCurrent" className="text-sm text-gray-700">
            I currently work here
          </label>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <Button
              variant="outline"
              size="sm"
              onClick={handleImproveDescription}
              loading={aiState.isLoading}
              disabled={!formData.description}
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Improve
            </Button>
          </div>
          <Textarea
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            placeholder="Describe your key responsibilities and achievements..."
            rows={4}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={resetForm}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editingId ? 'Update Experience' : 'Add Experience'}
          </Button>
        </div>

        {state.resume.experiences.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Experiences</h3>
            {state.resume.experiences.map((experience) => (
              <div key={experience.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{experience.position}</h4>
                    <p className="text-gray-600">{experience.company}</p>
                    <p className="text-sm text-gray-500">
                      {experience.startDate} - {experience.isCurrent ? 'Present' : experience.endDate}
                    </p>
                    {experience.description && (
                      <p className="text-sm mt-2">{experience.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(experience)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(experience.id!)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
