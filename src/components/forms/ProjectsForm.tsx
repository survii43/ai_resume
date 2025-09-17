'use client'

import React, { useState } from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Project } from '@/types'
import { Trash2, Sparkles, Copy, Check, X } from 'lucide-react'
import { generateId } from '@/lib/utils'

export function ProjectsForm() {
  const { state, addProject, updateProject, deleteProject } = useResume()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Project>({
    name: '',
    description: '',
    technologies: '',
    url: '',
    githubUrl: '',
    startDate: '',
    endDate: '',
    order: state.resume.projects.length,
  })

  const handleInputChange = (field: keyof Project, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    if (editingId) {
      updateProject({ ...formData, id: editingId })
    } else {
      addProject({ ...formData, id: generateId() })
    }
    resetForm()
  }

  const handleEdit = (project: Project) => {
    setFormData(project)
    setEditingId(project.id!)
  }

  const handleDelete = (id: string) => {
    deleteProject(id)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      technologies: '',
      url: '',
      githubUrl: '',
      startDate: '',
      endDate: '',
      order: state.resume.projects.length,
    })
    setEditingId(null)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-900">Projects</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 text-gray-900">
        <Input
          label="Project Name"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="E-commerce Website"
        />

        <Textarea
          label="Description"
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          placeholder="Describe your project, what it does, and your role in it..."
          rows={4}
        />

        <Input
          label="Technologies Used"
          value={formData.technologies}
          onChange={(e) => handleInputChange('technologies', e.target.value)}
          placeholder="React, Node.js, MongoDB, AWS"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Live URL (Optional)"
            value={formData.url}
            onChange={(e) => handleInputChange('url', e.target.value)}
            placeholder="https://myproject.com"
          />
          <Input
            label="GitHub URL (Optional)"
            value={formData.githubUrl}
            onChange={(e) => handleInputChange('githubUrl', e.target.value)}
            placeholder="https://github.com/username/project"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Date (Optional)"
            type="month"
            value={formData.startDate}
            onChange={(e) => handleInputChange('startDate', e.target.value)}
          />
          <Input
            label="End Date (Optional)"
            type="month"
            value={formData.endDate}
            onChange={(e) => handleInputChange('endDate', e.target.value)}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={resetForm}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {editingId ? 'Update Project' : 'Add Project'}
          </Button>
        </div>

        {state.resume.projects.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Projects</h3>
            {state.resume.projects.map((project) => (
              <div key={project.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium">{project.name}</h4>
                    {project.description && (
                      <p className="text-gray-600 mt-1">{project.description}</p>
                    )}
                    {project.technologies && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Technologies:</span> {project.technologies}
                      </p>
                    )}
                    <div className="flex space-x-4 mt-2">
                      {project.url && (
                        <a 
                          href={project.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
                      {project.githubUrl && (
                        <a 
                          href={project.githubUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 text-sm hover:underline"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                    {(project.startDate || project.endDate) && (
                      <p className="text-sm text-gray-500 mt-1">
                        {project.startDate} - {project.endDate || 'Present'}
                      </p>
                    )}
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(project.id!)}
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
