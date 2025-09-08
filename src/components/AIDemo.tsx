'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useToast } from '@/contexts/ToastContext'
import { 
  Brain, 
  Sparkles, 
  Copy, 
  RefreshCw,
  CheckCircle,
  TrendingUp,
  Zap,
  Edit3
} from 'lucide-react'

export function AIDemo() {
  const { showSuccess, showError } = useToast()
  const [isGenerating, setIsGenerating] = useState(false)
  const [demoContent, setDemoContent] = useState('')
  const [generationCount, setGenerationCount] = useState(0)
  const [lastGenerationTime, setLastGenerationTime] = useState<number[]>([])
  const [editableInputs, setEditableInputs] = useState({
    'resume-summary': 'Software Engineer with 3 years experience in React and Node.js',
    'linkedin-headline': 'Marketing Manager with digital marketing expertise',
    'cover-letter': 'Applying for Product Manager position at tech startup'
  })

  const demos = [
    {
      id: 'resume-summary',
      title: 'Professional Summary',
      input: editableInputs['resume-summary'],
      icon: Brain,
      color: 'from-blue-500 to-purple-600'
    },
    {
      id: 'linkedin-headline',
      title: 'LinkedIn Headline',
      input: editableInputs['linkedin-headline'],
      icon: TrendingUp,
      color: 'from-green-500 to-blue-600'
    },
    {
      id: 'cover-letter',
      title: 'Cover Letter Opening',
      input: editableInputs['cover-letter'],
      icon: Zap,
      color: 'from-purple-500 to-pink-600'
    }
  ]

  const handleInputChange = (demoId: string, value: string) => {
    setEditableInputs(prev => ({
      ...prev,
      [demoId]: value
    }))
  }

  const checkRateLimit = () => {
    const now = Date.now()
    const tenMinutesAgo = now - (10 * 60 * 1000) // 10 minutes in milliseconds
    
    // Remove timestamps older than 10 minutes
    const recentGenerations = lastGenerationTime.filter(time => time > tenMinutesAgo)
    
    if (recentGenerations.length >= 3) {
      const oldestGeneration = Math.min(...recentGenerations)
      const timeUntilReset = Math.ceil((oldestGeneration + (10 * 60 * 1000) - now) / 1000 / 60)
      showError('Rate limit reached!', `You can generate content again in ${timeUntilReset} minutes.`)
      return false
    }
    
    return true
  }

  const generateUniqueContent = (demoId: string, userInput: string) => {
    const variations = {
      'resume-summary': [
        `Professional Summary:\n\nResults-driven professional with extensive experience in ${userInput}. Proven track record of delivering scalable solutions and implementing innovative approaches. Passionate about creating efficient, user-friendly applications that drive business growth.\n\nKey Skills:\n• Technical expertise in modern development frameworks\n• Strong problem-solving and analytical abilities\n• Experience with agile development methodologies\n• Excellent communication and teamwork skills\n\nThis summary was generated using AI based on your input: "${userInput}" to highlight your strengths and make you stand out to recruiters.`,
        
        `Executive Summary:\n\nAccomplished professional specializing in ${userInput} with a demonstrated history of success in delivering high-impact solutions. Known for strategic thinking, innovative problem-solving, and driving organizational growth through technology and process optimization.\n\nCore Competencies:\n• Advanced technical skills and industry expertise\n• Leadership and team collaboration abilities\n• Project management and delivery excellence\n• Continuous learning and adaptation mindset\n\nThis executive summary was crafted using AI technology based on your specific input: "${userInput}" to create a compelling professional profile.`,
        
        `Career Profile:\n\nDynamic professional with deep expertise in ${userInput}, combining technical proficiency with strategic vision to deliver exceptional results. Recognized for ability to translate complex challenges into actionable solutions and drive meaningful business outcomes.\n\nProfessional Highlights:\n• Proven expertise in cutting-edge technologies and methodologies\n• Strong analytical and critical thinking capabilities\n• Excellent stakeholder management and communication skills\n• Track record of successful project delivery and team leadership\n\nThis career profile was generated using advanced AI based on your input: "${userInput}" to showcase your unique professional value proposition.`
      ],
      'linkedin-headline': [
        `LinkedIn Headline:\n\n"${userInput} | Professional Expert | Results-Driven Leader | Industry Specialist"\n\nAlternative Options:\n• "${userInput} | Strategic Professional | Growth-Focused | Team Leader"\n• "${userInput} | Expert Professional | Innovation Driver | Success-Oriented"\n• "${userInput} | Professional Specialist | Performance Expert | Leadership Focus"\n\nThese headlines are optimized for LinkedIn's algorithm based on your input: "${userInput}" and include relevant keywords that recruiters search for.`,
        
        `LinkedIn Headline:\n\n"Senior ${userInput} | Innovation Catalyst | Strategic Thinker | Performance Excellence"\n\nVariations:\n• "Lead ${userInput} | Digital Transformation | Team Builder | Results Achiever"\n• "Expert ${userInput} | Process Optimization | Growth Driver | Success Leader"\n• "Principal ${userInput} | Technology Visionary | Change Agent | Impact Creator"\n\nThese professional headlines were crafted using AI based on your role: "${userInput}" to maximize your LinkedIn visibility and attract the right opportunities.`,
        
        `LinkedIn Headline:\n\n"${userInput} Professional | Strategic Visionary | Excellence Driver | Future-Focused Leader"\n\nHeadline Options:\n• "Senior ${userInput} | Innovation Leader | Team Catalyst | Success Architect"\n• "Expert ${userInput} | Strategic Professional | Growth Enabler | Performance Optimizer"\n• "Lead ${userInput} | Technology Expert | Change Champion | Results Generator"\n\nThese compelling headlines were generated using AI technology based on your profession: "${userInput}" to enhance your professional brand and attract quality connections.`
      ],
      'cover-letter': [
        `Cover Letter Opening:\n\nDear Hiring Manager,\n\nI am writing to express my strong interest in the position related to ${userInput}. With a passion for excellence and a proven track record of delivering outstanding results, I am excited about the opportunity to contribute to your team's continued growth and success.\n\nAs a dedicated professional with experience in ${userInput}, I am particularly drawn to your company's mission and values. My background in this field has equipped me with the skills and knowledge necessary to excel in this dynamic role.\n\nThis opening was crafted based on your input: "${userInput}" to be engaging, professional, and tailored to your specific experience and goals.`,
        
        `Cover Letter Introduction:\n\nDear Hiring Team,\n\nI am excited to submit my application for the ${userInput} position. As an accomplished professional with extensive experience in this field, I am confident that my skills, passion, and track record of success make me an ideal candidate for this opportunity.\n\nMy expertise in ${userInput} has been honed through years of hands-on experience and continuous learning. I am particularly impressed by your company's innovative approach and commitment to excellence, which aligns perfectly with my professional values and career aspirations.\n\nThis introduction was generated using AI based on your field: "${userInput}" to create a compelling and personalized opening that captures attention.`,
        
        `Cover Letter Opening:\n\nDear Selection Committee,\n\nI am writing to express my enthusiastic interest in joining your team as a ${userInput} professional. With a strong foundation in this field and a proven ability to drive results, I am eager to contribute to your organization's continued success and growth.\n\nMy professional journey in ${userInput} has been marked by consistent achievement and a commitment to delivering exceptional value. I am particularly attracted to your company's forward-thinking approach and the opportunity to work with a team that shares my dedication to innovation and excellence.\n\nThis professional opening was crafted using AI technology based on your specialization: "${userInput}" to create an impactful and memorable first impression.`
      ]
    }
    
    const demoVariations = variations[demoId as keyof typeof variations] || variations['resume-summary']
    const randomIndex = Math.floor(Math.random() * demoVariations.length)
    return demoVariations[randomIndex]
  }

  const handleDemo = async (demo: typeof demos[0]) => {
    // Check rate limit
    if (!checkRateLimit()) {
      return
    }
    
    setIsGenerating(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const userInput = editableInputs[demo.id as keyof typeof editableInputs]
      const content = generateUniqueContent(demo.id, userInput)
      
      // Update rate limiting
      const now = Date.now()
      setLastGenerationTime(prev => [...prev, now])
      setGenerationCount(prev => prev + 1)
      
      setDemoContent(content)
      showSuccess('AI demo generated successfully!', `${generationCount + 1}/3 uses in 10 minutes`)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(demoContent)
    showSuccess('Content copied to clipboard!', 'You can now paste it anywhere you need.')
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Try Our AI in Action</h3>
        <p className="text-gray-600">See how our AI transforms your input into professional content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {demos.map((demo) => (
          <Card key={demo.id} className="hover:shadow-lg transition-all duration-300">
            <CardHeader className="text-center">
              <div className={`w-12 h-12 bg-gradient-to-br ${demo.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                <demo.icon className="w-6 h-6 text-white" />
              </div>
              <CardTitle className="text-lg">{demo.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium text-gray-700">Your Input:</p>
                    <Edit3 className="w-4 h-4 text-gray-400" />
                  </div>
                  <Input
                    value={demo.input}
                    onChange={(e) => handleInputChange(demo.id, e.target.value)}
                    placeholder={`Enter your ${demo.title.toLowerCase()}...`}
                    className="w-full text-sm"
                  />
                </div>
                <Button
                  onClick={() => handleDemo(demo)}
                  disabled={isGenerating || !demo.input.trim()}
                  className={`w-full bg-gradient-to-r ${demo.color} text-white hover:opacity-90 transition-opacity`}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 mr-2" />
                      Generate Demo
                    </>
                  )}
                </Button>
                
                {/* Rate Limit Indicator */}
                <div className="text-xs text-gray-500 text-center mt-2">
                  {generationCount > 0 && (
                    <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                      {generationCount}/3 uses in 10min
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {demoContent && (
        <Card className="border-2 border-blue-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center">
                <CheckCircle className="w-6 h-6 mr-2 text-green-600" />
                AI Generated Content
              </CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopy}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy
              </Button>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              ✨ Generated based on your custom input using advanced AI
            </p>
            {generationCount > 0 && (
              <div className="mt-2 text-xs text-gray-500">
                Usage: {generationCount}/3 generations in 10 minutes
              </div>
            )}
          </CardHeader>
          <CardContent className="p-6">
            <div className="bg-gray-50 rounded-lg p-4 border">
              <pre className="whitespace-pre-wrap text-sm text-gray-700">
                {demoContent}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}