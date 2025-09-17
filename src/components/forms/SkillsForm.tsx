'use client'

import React, { useState } from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Skill } from '@/types'
import { Trash2, Star, Edit } from 'lucide-react'
import { generateId } from '@/lib/utils'
import { IconButton } from '../ui/IconButton'

export function SkillsForm() {
  const { state, addSkill, updateSkill, deleteSkill } = useResume()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Skill>({
    name: '',
    level: 3,
    category: 'technical',
    order: state.resume.skills.length,
  })

  const skillCategories = [
    { value: 'technical', label: 'Technical' },
    { value: 'soft', label: 'Soft Skills' },
    { value: 'language', label: 'Languages' },
    { value: 'certification', label: 'Certifications' },
  ]

  const handleInputChange = (field: keyof Skill, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (editingId) {
      updateSkill({ ...formData, id: editingId })
    } else {
      addSkill({ ...formData, id: generateId() })
    }
    resetForm()
  }

  const handleEdit = (skill: Skill) => {
    setFormData(skill)
    setEditingId(skill.id!)
  }

  const handleDelete = (id: string) => {
    deleteSkill(id)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      level: 3,
      category: 'technical',
      order: state.resume.skills.length,
    })
    setEditingId(null)
  }

  const renderStars = (level: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < level ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  const getSkillsByCategory = () => {
    const categories: { [key: string]: Skill[] } = {}
    state.resume.skills.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = []
      }
      categories[skill.category].push(skill)
    })
    return categories
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">Skills</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Skill Name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="JavaScript"
          />
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => handleInputChange('category', e.target.value)}
              className="w-full h-10 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900 !text-gray-900"
            >
              {skillCategories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Proficiency Level
          </label>
          <div className="flex items-center space-x-4">
            <input
              type="range"
              min="1"
              max="5"
              value={formData.level}
              onChange={(e) => handleInputChange('level', parseInt(e.target.value))}
              className="flex-1"
            />
            <div className="flex items-center space-x-1">
              {renderStars(formData.level)}
            </div>
            <span className="text-sm text-gray-600 w-8">
              {formData.level}/5
            </span>
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={resetForm}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editingId ? 'Update Skill' : 'Add Skill'}
          </Button>
        </div>

        {state.resume.skills.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Skills</h3>
            {Object.entries(getSkillsByCategory()).map(([category, skills]) => (
              <div key={category} className="space-y-2">
                <h4 className="font-medium text-gray-700 capitalize">
                  {skillCategories.find(c => c.value === category)?.label}
                </h4>
                <div className="grid grid-cols-1 gap-2">
                  {skills.map((skill) => (
                    <div key={skill.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-lg gap-2">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <span className="font-medium text-sm sm:text-base truncate">{skill.name}</span>
                        <div className="flex items-center space-x-1 flex-shrink-0">
                          {renderStars(skill.level)}
                        </div>
                      </div>
                      <div className="flex space-x-2 flex-shrink-0">
                        <IconButton variant="outline" size="sm" icon={Edit} onClick={() => handleEdit(skill)}/>
                        <IconButton variant="destructive" size="sm" icon={Trash2} onClick={() => handleDelete(skill.id!)}/>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
