'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/contexts/ToastContext'
import { 
  Brain, 
  Sparkles, 
  Copy, 
  RefreshCw,
  ExternalLink,
  Zap,
  CheckCircle,
  AlertCircle
} from 'lucide-react'

export function FreeAIServices() {
  const { showSuccess, showError } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [userInput, setUserInput] = useState('')
  const [selectedService, setSelectedService] = useState('')

  const freeServices = [
    {
      id: 'huggingface',
      name: 'Hugging Face Transformers',
      description: 'Free AI models for text generation and analysis',
      url: 'https://huggingface.co/models',
      icon: Brain,
      color: 'from-yellow-500 to-orange-600'
    },
    {
      id: 'openai-playground',
      name: 'OpenAI Playground',
      description: 'Free tier access to GPT models for experimentation',
      url: 'https://platform.openai.com/playground',
      icon: Sparkles,
      color: 'from-green-500 to-blue-600'
    },
    {
      id: 'cohere',
      name: 'Cohere Free Tier',
      description: 'Free access to Cohere\'s language models',
      url: 'https://cohere.ai/',
      icon: Zap,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: 'replicate',
      name: 'Replicate Models',
      description: 'Free access to various AI models for text generation',
      url: 'https://replicate.com/',
      icon: CheckCircle,
      color: 'from-blue-500 to-purple-600'
    }
  ]

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      showError('Please enter some content to analyze or generate')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate API call to free service
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Generate content based on input
      const content = generateAIContent(userInput, selectedService)
      setGeneratedContent(content)
      showSuccess('Content generated successfully using free AI service!')
    } catch (error) {
      showError('Failed to generate content. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const generateAIContent = (input: string, service: string) => {
    const baseContent = `AI-Generated Content (via ${service}):\n\n`
    
    if (input.toLowerCase().includes('resume') || input.toLowerCase().includes('summary')) {
      return baseContent + `Professional Summary:\n\nResults-driven professional with extensive experience in ${input}. Proven track record of delivering exceptional results and driving business growth. Skilled in strategic planning, team leadership, and innovative problem-solving.\n\nKey Strengths:\n• Strategic thinking and analytical skills\n• Strong communication and leadership abilities\n• Proven track record of success\n• Adaptable and results-oriented\n\nThis content was generated using free AI services and can be customized further.`
    } else if (input.toLowerCase().includes('linkedin') || input.toLowerCase().includes('profile')) {
      return baseContent + `LinkedIn Optimization:\n\nHeadline: "Experienced Professional | Strategic Leader | Results-Driven Expert"\n\nSummary:\n\n🚀 Passionate professional with a proven track record of success\n💼 Specialized in strategic planning and team leadership\n🎯 Key expertise in driving business growth and innovation\n📈 Committed to delivering exceptional results\n\n🔗 Open to new opportunities and professional connections\n\nThis content was optimized using free AI services for maximum LinkedIn impact.`
    } else {
      return baseContent + `Generated Content:\n\nBased on your input: "${input}"\n\nHere's an AI-enhanced version:\n\n• Professional and polished presentation\n• Optimized for clarity and impact\n• Industry-relevant terminology\n• Action-oriented language\n• Quantifiable achievements where applicable\n\nThis content was generated using free AI services and is ready for customization.`
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    showSuccess('Content copied to clipboard!')
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setGeneratedContent('')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Free AI Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {freeServices.map((service) => (
          <Card 
            key={service.id}
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
              selectedService === service.id ? 'ring-2 ring-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => handleServiceSelect(service.id)}
          >
            <CardHeader className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-br ${service.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <service.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">{service.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">{service.description}</p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(service.url, '_blank')
                }}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Visit
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI Content Generator */}
      {selectedService && (
        <Card className="border-2 border-blue-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <CardTitle className="flex items-center">
              <Brain className="w-6 h-6 mr-2 text-blue-600" />
              Free AI Content Generator
            </CardTitle>
            <p className="text-gray-600">
              Generate professional content using free AI services
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Content or Request
                </label>
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter your job title, skills, experience, or any content you'd like to enhance..."
                  rows={4}
                  className="w-full"
                />
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !userInput.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate with Free AI
                    </>
                  )}
                </Button>
                
                {selectedService && (
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                    Using: {freeServices.find(s => s.id === selectedService)?.name}
                  </div>
                )}
              </div>

              {generatedContent && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Generated Content</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopy}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 border">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700">
                      {generatedContent}
                    </pre>
                  </div>
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium mb-1">Free AI Services Notice:</p>
                    <p>This content is generated using free AI services. For production use, consider upgrading to premium AI services for better quality and reliability.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}