'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  FileText, 
  Users, 
  Target, 
  Shield, 
  Brain, 
  Award,
  Heart,
  Globe,
  Zap,
  CheckCircle,
  ArrowLeft,
  Mail,
  Linkedin,
  Github,
  Twitter
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="relative">
                <FileText className="w-8 h-8 text-blue-600 mr-2" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">ResumeAI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="outline" className="hover:scale-105 transition-transform">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <Link href="/builder">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">ResumeAI</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            We're on a mission to democratize professional resume building by combining the power of AI 
            with privacy-first principles, helping millions of job seekers create winning resumes.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To empower every job seeker with AI-powered tools that create professional, 
                ATS-optimized resumes while maintaining complete privacy and data security.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Privacy-First Approach</h3>
                    <p className="text-gray-600">Your data stays on your device. No cloud storage, no data mining.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">AI-Powered Intelligence</h3>
                    <p className="text-gray-600">Advanced AI models help you craft compelling content and optimize for ATS systems.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900">Accessibility for All</h3>
                    <p className="text-gray-600">Free forever, no credit card required, works on any device.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
                    <div className="text-sm text-gray-600">Resumes Created</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600 mb-2">95%</div>
                    <div className="text-sm text-gray-600">ATS Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">2.5M</div>
                    <div className="text-sm text-gray-600">AI Suggestions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">4.9★</div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
            <p className="text-xl text-gray-700">
              Born from the frustration of traditional resume builders
            </p>
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              ResumeAI was founded in 2024 by a team of AI researchers and career development experts 
              who were frustrated with the limitations of traditional resume builders. We noticed that 
              most tools either compromised user privacy by storing data in the cloud, or provided 
              generic templates that didn't leverage the power of modern AI.
            </p>
            
            <p className="text-gray-700 mb-6">
              Our solution was to create a privacy-first, AI-powered resume builder that runs locally 
              on your device. By using advanced language models like Ollama, we can provide intelligent 
              suggestions, ATS optimization, and content improvement without ever sending your personal 
              data to external servers.
            </p>
            
            <p className="text-gray-700">
              Today, ResumeAI helps thousands of job seekers create professional resumes that stand out 
              in the competitive job market, all while maintaining complete control over their personal information.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-700">
              Passionate individuals working to revolutionize resume building
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <CardTitle>Alex Chen</CardTitle>
                <p className="text-blue-600 font-medium">CEO & Co-Founder</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  AI researcher with 10+ years in machine learning. Former Google AI engineer 
                  passionate about democratizing AI tools.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <CardTitle>Sarah Johnson</CardTitle>
                <p className="text-green-600 font-medium">CTO & Co-Founder</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Privacy advocate and full-stack developer. Expert in local AI deployment 
                  and user data protection.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-green-600 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <CardTitle>Michael Rodriguez</CardTitle>
                <p className="text-purple-600 font-medium">Head of Product</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Career development expert with 15+ years in HR. Former LinkedIn product manager 
                  focused on user experience.
                </p>
                <div className="flex justify-center space-x-3">
                  <a href="#" className="text-gray-400 hover:text-purple-600 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-700">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Privacy First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Your data never leaves your device. We believe in complete user privacy and data sovereignty.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>User-Centric</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Every feature is designed with the user's success in mind. We prioritize user experience above all.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Innovation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We continuously push the boundaries of what's possible with AI and resume building technology.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Professional resume building should be accessible to everyone, regardless of their background or budget.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust ResumeAI for their career success
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                Start Building Now
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 transition-all">
                <Mail className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <div className="flex items-center mb-4">
                <div className="relative">
                  <FileText className="w-8 h-8 text-blue-400 mr-2" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                <span className="text-xl font-bold">ResumeAI</span>
              </div>
              <p className="text-gray-400 mb-4">
                The most advanced AI-powered resume builder with privacy-first approach.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/builder" className="hover:text-white transition-colors">Resume Builder</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Export Options</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ResumeAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
