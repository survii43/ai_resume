'use client'

import React, { useState, useEffect } from 'react'
import { useResume } from '@/contexts/ResumeContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { 
  Palette, 
  Type, 
  Layout, 
  Settings, 
  Eye, 
  Download, 
  Save,
  RotateCcw,
  Check,
  Sparkles
} from 'lucide-react'
import { TemplatePreview } from './TemplatePreview'

interface TemplateSettings {
  template: string
  colorScheme: string
  fontSize: string
  fontFamily: string
  layout: string
  showDividers: boolean
  showIcons: boolean
  compactMode: boolean
  title: string
  isPublic: boolean
}

export function TemplateConfig() {
  const { state, setTemplate, updatePersonalInfo } = useResume()
  const { resume } = state
  
  const [settings, setSettings] = useState<TemplateSettings>({
    template: resume.template || 'classic',
    colorScheme: 'blue',
    fontSize: 'base',
    fontFamily: 'sans',
    layout: 'single',
    showDividers: true,
    showIcons: true,
    compactMode: false,
    title: resume.title || 'My Professional Resume',
    isPublic: resume.isPublic || false
  })

  const [previewMode, setPreviewMode] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Update settings when resume changes
  useEffect(() => {
    setSettings(prev => ({
      ...prev,
      template: resume.template || 'classic',
      title: resume.title || 'My Professional Resume',
      isPublic: resume.isPublic || false
    }))
  }, [resume])

  // Track changes
  useEffect(() => {
    const hasChanges = settings.template !== (resume.template || 'classic') ||
                      settings.title !== (resume.title || 'My Professional Resume') ||
                      settings.isPublic !== (resume.isPublic || false)
    setHasChanges(hasChanges)
  }, [settings, resume])

  const colorSchemes = [
    { name: 'Blue', value: 'blue', primary: 'blue-600', secondary: 'blue-100', preview: 'bg-blue-500' },
    { name: 'Green', value: 'green', primary: 'green-600', secondary: 'green-100', preview: 'bg-green-500' },
    { name: 'Purple', value: 'purple', primary: 'purple-600', secondary: 'purple-100', preview: 'bg-purple-500' },
    { name: 'Red', value: 'red', primary: 'red-600', secondary: 'red-100', preview: 'bg-red-500' },
    { name: 'Indigo', value: 'indigo', primary: 'indigo-600', secondary: 'indigo-100', preview: 'bg-indigo-500' },
    { name: 'Teal', value: 'teal', primary: 'teal-600', secondary: 'teal-100', preview: 'bg-teal-500' },
    { name: 'Orange', value: 'orange', primary: 'orange-600', secondary: 'orange-100', preview: 'bg-orange-500' },
    { name: 'Gray', value: 'gray', primary: 'gray-600', secondary: 'gray-100', preview: 'bg-gray-500' },
  ]

  const fontSizes = [
    { name: 'Small', value: 'sm', class: 'text-sm' },
    { name: 'Medium', value: 'base', class: 'text-base' },
    { name: 'Large', value: 'lg', class: 'text-lg' },
    { name: 'Extra Large', value: 'xl', class: 'text-xl' },
  ]

  const fontFamilies = [
    { name: 'Sans Serif', value: 'sans', class: 'font-sans' },
    { name: 'Serif', value: 'serif', class: 'font-serif' },
    { name: 'Monospace', value: 'mono', class: 'font-mono' },
  ]

  const layouts = [
    { name: 'Single Column', value: 'single', description: 'Traditional single column layout' },
    { name: 'Two Column', value: 'two-column', description: 'Side-by-side content sections' },
    { name: 'Sidebar', value: 'sidebar', description: 'Contact info in sidebar' },
  ]

  const templates = [
    { 
      name: 'Classic', 
      value: 'classic', 
      description: 'Traditional professional layout',
      preview: 'bg-gradient-to-br from-gray-100 to-gray-200',
      icon: '📄',
      category: 'Professional',
      features: ['ATS-friendly', 'Clean layout', 'Easy to read']
    },
    { 
      name: 'Modern', 
      value: 'modern', 
      description: 'Clean contemporary design',
      preview: 'bg-gradient-to-br from-blue-100 to-blue-200',
      icon: '✨',
      category: 'Contemporary',
      features: ['Modern styling', 'Visual appeal', 'Tech-focused']
    },
    { 
      name: 'Creative', 
      value: 'creative', 
      description: 'Unique artistic layout',
      preview: 'bg-gradient-to-br from-purple-100 to-purple-200',
      icon: '🎨',
      category: 'Creative',
      features: ['Unique design', 'Visual impact', 'Stand out']
    },
    { 
      name: 'Professional', 
      value: 'professional', 
      description: 'Executive-level presentation',
      preview: 'bg-gradient-to-br from-indigo-100 to-indigo-200',
      icon: '💼',
      category: 'Executive',
      features: ['Executive style', 'High-end look', 'Leadership focus']
    },
    { 
      name: 'Minimalist', 
      value: 'minimalist', 
      description: 'Clean and simple design',
      preview: 'bg-gradient-to-br from-white to-gray-100',
      icon: '⚪',
      category: 'Minimal',
      features: ['Clean lines', 'Simple layout', 'Focus on content']
    },
    { 
      name: 'Executive', 
      value: 'executive', 
      description: 'C-suite and senior level',
      preview: 'bg-gradient-to-br from-slate-100 to-slate-200',
      icon: '👔',
      category: 'Executive',
      features: ['Senior level', 'Authority', 'Strategic focus']
    },
  ]

  const updateSetting = (key: keyof TemplateSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    // Update resume with new settings
    setTemplate(settings.template)
    // You can add more update functions here for other settings
    setHasChanges(false)
  }

  const resetSettings = () => {
    setSettings({
      template: 'classic',
      colorScheme: 'blue',
      fontSize: 'base',
      fontFamily: 'sans',
      layout: 'single',
      showDividers: true,
      showIcons: true,
      compactMode: false,
      title: 'My Professional Resume',
      isPublic: false
    })
  }

  return (
    <div className="space-y-6 text-gray-900">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Template Configuration</h2>
          <p className="text-gray-600">Customize your resume appearance and settings</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setPreviewMode(!previewMode)}
            className="flex items-center"
          >
            <Eye className="w-4 h-4 mr-2" />
            {previewMode ? 'Hide Preview' : 'Show Preview'}
          </Button>
          {hasChanges && (
            <Button
              onClick={saveSettings}
              className="flex items-center bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          )}
        </div>
      </div>

      {/* Template Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layout className="w-5 h-5 mr-2 text-blue-600" />
            Template Style
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.value}
                onClick={() => updateSetting('template', template.value)}
                className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg hover:-translate-y-1 ${
                  settings.template === template.value
                    ? 'border-blue-500 bg-blue-50 shadow-lg ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-lg ${template.preview} flex items-center justify-center text-3xl shadow-sm`}>
                    {template.icon}
                  </div>
                  <div className="mb-2">
                    <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full mb-1">
                      {template.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{template.description}</p>
                  </div>
                  
                  <div className="space-y-1">
                    {template.features.map((feature, index) => (
                      <div key={index} className="text-xs text-gray-500 flex items-center justify-center">
                        <div className="w-1 h-1 bg-gray-400 rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  
                  {settings.template === template.value && (
                    <div className="mt-3 flex items-center justify-center text-blue-600">
                      <Check className="w-4 h-4 mr-1" />
                      <span className="text-xs font-medium">Selected</span>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Scheme */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="w-5 h-5 mr-2 text-purple-600" />
            Color Scheme
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
            {colorSchemes.map((scheme) => (
              <button
                key={scheme.value}
                onClick={() => updateSetting('colorScheme', scheme.value)}
                className={`p-3 rounded-lg border-2 transition-all hover:scale-105 ${
                  settings.colorScheme === scheme.value
                    ? 'border-purple-500 bg-purple-50 shadow-md'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className={`w-8 h-8 mx-auto mb-2 rounded-full ${scheme.preview} shadow-sm`} />
                  <span className="text-xs font-medium text-gray-700">{scheme.name}</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Type className="w-5 h-5 mr-2 text-green-600" />
            Typography
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Font Size
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {fontSizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => updateSetting('fontSize', size.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    settings.fontSize === size.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`${size.class} font-medium text-gray-900 mb-1`}>
                      Aa
                    </div>
                    <span className="text-xs text-gray-600">{size.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Font Family
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {fontFamilies.map((family) => (
                <button
                  key={family.value}
                  onClick={() => updateSetting('fontFamily', family.value)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    settings.fontFamily === family.value
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-center">
                    <div className={`${family.class} text-gray-900 mb-1`}>
                      Sample Text
                    </div>
                    <span className="text-xs text-gray-600">{family.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Layout Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="w-5 h-5 mr-2 text-orange-600" />
            Layout Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-3 block">
              Page Layout
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {layouts.map((layout) => (
                <button
                  key={layout.value}
                  onClick={() => updateSetting('layout', layout.value)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    settings.layout === layout.value
                      ? 'border-orange-500 bg-orange-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h4 className="font-medium text-gray-900 mb-1">{layout.name}</h4>
                  <p className="text-xs text-gray-600">{layout.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">Display Options</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Show Section Dividers
                  </label>
                  <p className="text-xs text-gray-500">Add visual separators between sections</p>
                </div>
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={settings.showDividers}
                  onChange={(e) => updateSetting('showDividers', e.target.checked)}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Show Contact Icons
                  </label>
                  <p className="text-xs text-gray-500">Display icons next to contact information</p>
                </div>
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={settings.showIcons}
                  onChange={(e) => updateSetting('showIcons', e.target.checked)}
                />
              </div>
              
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Compact Mode
                  </label>
                  <p className="text-xs text-gray-500">Reduce spacing for a more compact layout</p>
                </div>
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  checked={settings.compactMode}
                  onChange={(e) => updateSetting('compactMode', e.target.checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resume Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="w-5 h-5 mr-2 text-indigo-600" />
            Resume Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Input
              label="Resume Title"
              value={settings.title}
              onChange={(e) => updateSetting('title', e.target.value)}
              placeholder="My Professional Resume"
            />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <label className="text-sm font-medium text-gray-700">
                Make Resume Public
              </label>
              <p className="text-xs text-gray-500">Allow others to view your resume with a shareable link</p>
            </div>
            <input 
              type="checkbox" 
              className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              checked={settings.isPublic}
              onChange={(e) => updateSetting('isPublic', e.target.checked)}
            />
          </div>

          <div className="flex items-center justify-between pt-4 border-t">
            <Button
              variant="outline"
              onClick={resetSettings}
              className="flex items-center"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset to Defaults
            </Button>
            
            {hasChanges && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-orange-600">• Unsaved changes</span>
                <Button
                  onClick={saveSettings}
                  className="flex items-center bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Template Preview Modal */}
      <TemplatePreview
        isVisible={previewMode}
        onClose={() => setPreviewMode(false)}
        settings={settings}
      />
    </div>
  )
}
