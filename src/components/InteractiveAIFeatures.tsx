'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Textarea } from '@/components/ui/Textarea'
import { useToast } from '@/contexts/ToastContext'
import { 
  Brain, 
  Target, 
  Users, 
  Sparkles, 
  Copy, 
  RefreshCw
} from 'lucide-react'

export function InteractiveAIFeatures() {
  const { showSuccess, showError } = useToast()
  const [activeFeature, setActiveFeature] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedContent, setGeneratedContent] = useState('')
  const [userInput, setUserInput] = useState('')

  const features = [
    {
      id: 'content-generator',
      title: 'AI Content Generator',
      description: 'Generate professional summaries and bullet points using ChatGPT-4 Turbo',
      icon: Brain,
      color: 'from-blue-500 to-purple-600',
      buttonColor: 'from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
    },
    {
      id: 'ats-checker',
      title: 'ATS Score Checker',
      description: 'Get instant feedback on your resume\'s ATS compatibility and optimization',
      icon: Target,
      color: 'from-green-500 to-blue-600',
      buttonColor: 'from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700'
    },
    {
      id: 'linkedin-optimizer',
      title: 'LinkedIn Optimizer',
      description: 'Optimize your LinkedIn profile with AI-generated headlines and summaries',
      icon: Users,
      color: 'from-purple-500 to-pink-600',
      buttonColor: 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
    }
  ]

  const handleFeatureClick = (featureId: string) => {
    setActiveFeature(featureId)
    setGeneratedContent('')
    setUserInput('')
  }

  const handleGenerate = async () => {
    if (!userInput.trim()) {
      showError('Please enter some content to analyze or generate')
      return
    }

    setIsGenerating(true)
    
    try {
      // Simulate AI generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      let content = ''
      switch (activeFeature) {
        case 'content-generator':
          content = `Professional Summary:\n\nResults-driven software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable web applications using React, Node.js, and cloud technologies. Passionate about creating innovative solutions that drive business growth and enhance user experience.\n\nKey Achievements:\n• Led development of a microservices architecture that improved system performance by 40%\n• Implemented CI/CD pipelines reducing deployment time by 60%\n• Mentored junior developers and established coding best practices\n• Collaborated with cross-functional teams to deliver 15+ successful projects`
          break
        case 'ats-checker':
          content = `ATS Score: 92/100 ✅\n\nStrengths:\n• Strong keyword optimization (95% match)\n• Clean formatting and structure\n• Quantified achievements present\n• Relevant skills highlighted\n\nRecommendations:\n• Add more industry-specific keywords\n• Include more metrics in achievements\n• Consider adding a skills section\n\nKeywords Found: JavaScript, React, Node.js, Python, AWS, Docker, Git`
          break
        case 'linkedin-optimizer':
          content = `LinkedIn Headline:\n"Senior Software Engineer | Full-Stack Developer | React & Node.js Expert | Cloud Solutions Architect"\n\nLinkedIn Summary:\n\n🚀 Passionate Software Engineer with 5+ years of experience building scalable web applications\n\n💼 Currently leading full-stack development projects using modern technologies including React, Node.js, and cloud platforms\n\n🎯 Specialized in:\n• Frontend: React, TypeScript, Next.js\n• Backend: Node.js, Python, Express\n• Cloud: AWS, Docker, Kubernetes\n• Databases: PostgreSQL, MongoDB\n\n📈 Key Achievements:\n• Improved system performance by 40% through microservices architecture\n• Reduced deployment time by 60% with CI/CD implementation\n• Successfully delivered 15+ projects with cross-functional teams\n\n🔗 Open to new opportunities and collaborations. Let's connect!`
          break
      }
      
      setGeneratedContent(content)
      showSuccess('AI content generated successfully!')
    } catch (error) {
      showError('Failed to generate content. Please try again.')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent)
    showSuccess('Content copied to clipboard!')
  }

  const getPlaceholder = () => {
    switch (activeFeature) {
      case 'content-generator':
        return 'Enter your job title, experience, or key skills...'
      case 'ats-checker':
        return 'Paste your resume content to check ATS compatibility...'
      case 'linkedin-optimizer':
        return 'Enter your current role, skills, and achievements...'
      default:
        return 'Enter your content...'
    }
  }

  if (activeFeature) {
    const feature = features.find(f => f.id === activeFeature)
    if (!feature) return null

    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-blue-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setActiveFeature(null)}
              >
                Back
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {activeFeature === 'ats-checker' ? 'Resume Content' : 'Your Information'}
                </label>
                <Textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder={getPlaceholder()}
                  rows={4}
                  className="w-full"
                />
              </div>
              
              <Button
                onClick={handleGenerate}
                disabled={isGenerating || !userInput.trim()}
                className={`w-full bg-gradient-to-r ${feature.buttonColor} text-white`}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>

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
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                      {generatedContent}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature) => (
        <Card 
          key={feature.id}
          className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
          onClick={() => handleFeatureClick(feature.id)}
        >
          <CardHeader>
            <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="group-hover:text-blue-600 transition-colors">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 mb-4">
              {feature.description}
            </p>
            <Button className={`w-full bg-gradient-to-r ${feature.buttonColor} text-white`}>
              Try {feature.title.split(' ')[0]}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}