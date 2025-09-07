'use client'

import React, { useState } from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Education } from '@/types'
import { Trash2 } from 'lucide-react'
import { generateId } from '@/lib/utils'

export function EducationForm() {
  const { state, addEducation, updateEducation, deleteEducation } = useResume()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Education>({
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: '',
    description: '',
    order: state.resume.education.length,
  })

  const handleInputChange = (field: keyof Education, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (editingId) {
      updateEducation({ ...formData, id: editingId })
    } else {
      addEducation({ ...formData, id: generateId() })
    }
    resetForm()
  }

  const handleEdit = (education: Education) => {
    setFormData(education)
    setEditingId(education.id!)
  }

  const handleDelete = (id: string) => {
    deleteEducation(id)
  }

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      field: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      description: '',
      order: state.resume.education.length,
    })
    setEditingId(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">Education</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Institution"
            value={formData.institution}
            onChange={(e) => handleInputChange('institution', e.target.value)}
            placeholder="University of California"
          />
          <Input
            label="Degree"
            value={formData.degree}
            onChange={(e) => handleInputChange('degree', e.target.value)}
            placeholder="Bachelor of Science"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Field of Study"
            value={formData.field}
            onChange={(e) => handleInputChange('field', e.target.value)}
            placeholder="Computer Science"
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="Berkeley, CA"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
          />
          <Input
            label="GPA (Optional)"
            value={formData.gpa}
            onChange={(e) => handleInputChange('gpa', e.target.value)}
            placeholder="3.8"
          />
        </div>

        <Textarea
          label="Description (Optional)"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Relevant coursework, honors, or achievements..."
          rows={3}
        />

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={resetForm}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editingId ? 'Update Education' : 'Add Education'}
          </Button>
        </div>

        {state.resume.education.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Education</h3>
            {state.resume.education.map((education) => (
              <div key={education.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{education.degree}</h4>
                    <p className="text-gray-600">{education.institution}</p>
                    {education.field && (
                      <p className="text-sm text-gray-500">{education.field}</p>
                    )}
                    <p className="text-sm text-gray-500">
                      {education.startDate} - {education.endDate || 'Present'}
                    </p>
                    {education.gpa && (
                      <p className="text-sm text-gray-500">GPA: {education.gpa}</p>
                    )}
                    {education.description && (
                      <p className="text-sm mt-2">{education.description}</p>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(education)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(education.id!)}
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
