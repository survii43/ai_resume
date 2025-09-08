'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { AdPlacement } from '@/components/AdPlacement'
import { InteractiveAIFeatures } from '@/components/InteractiveAIFeatures'
import { FreeAIServices } from '@/components/FreeAIServices'
import { AIDemo } from '@/components/AIDemo'
import { 
  Sparkles, 
  FileText, 
  Download, 
  Users, 
  Shield, 
  Zap,
  Brain,
  Target,
  ArrowRight,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  Star,
  BarChart3,
  Eye,
  Heart,
  Share2,
  Menu,
  X
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Enhanced Navigation */}
      <nav className="bg-white/95 backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="relative">
                <FileText className="w-8 h-8 text-blue-600 mr-2" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <span className="text-xl font-bold text-gray-900">ResumeAI</span>
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                AI Powered
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/signin">
                <Button variant="outline" className="hover:scale-105 transition-transform">
                  Sign In
                </Button>
              </Link>
              <Link href="/builder">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Get Started
                </Button>
              </Link>
            </div>
            <div className="md:hidden">
              <IconButton
                icon={Menu}
                variant="outline"
                size="sm"
                tooltip="Menu"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Stats */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main Content */}
            <div className="lg:col-span-8 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-4">
                <Star className="w-4 h-4 mr-1" />
                Trusted by 50,000+ professionals
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Build Your Perfect Resume with{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI Power
                </span>
              </h1>
              
              <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto lg:mx-0">
                Create professional, ATS-optimized resumes in minutes. Our AI helps you craft compelling content, 
                improve bullet points, and tailor your resume to any job description.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/builder">
                  <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Building Free
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto hover:scale-105 transition-transform">
                  <Eye className="w-5 h-5 mr-2" />
                  View Templates
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-500 mr-2" />
                  Privacy-first
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 text-green-500 mr-2" />
                  100% Free
                </div>
              </div>
            </div>
            
            {/* Right Side - Ad Placement for Desktop */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-24">
                <AdPlacement 
                  size="skyscraper" 
                  className="mx-auto"
                  placeholder="Premium Ad Space - 300x600"
                />
              </div>
            </div>
          </div>
          
          {/* Stats Section */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
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
      </section>

      {/* Mobile Banner Ad */}
      <div className="lg:hidden px-4 py-4">
        <AdPlacement 
          size="mobile-banner" 
          placeholder="Mobile Banner - 320x50"
        />
      </div>

      {/* Features Section */}
      <section className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full mb-4">
              <Award className="w-4 h-4 mr-1" />
              Industry Leading Features
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose ResumeAI?
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              The most advanced AI-powered resume builder with privacy-first approach and industry-leading features
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Features Grid */}
            <div className="lg:col-span-9">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Brain className="w-6 h-6 text-blue-600" />
                    </div>
                    <CardTitle className="group-hover:text-blue-600 transition-colors">AI-Powered Content</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Generate professional summaries, improve bullet points, and get personalized suggestions 
                      powered by advanced AI models running locally on your device.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Target className="w-6 h-6 text-green-600" />
                    </div>
                    <CardTitle className="group-hover:text-green-600 transition-colors">ATS Optimization</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Get real-time ATS score feedback and keyword suggestions to ensure your resume 
                      passes through applicant tracking systems.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <CardTitle className="group-hover:text-purple-600 transition-colors">Privacy-First</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Your data stays on your device. We use local AI models, so your personal information 
                      never leaves your computer.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Zap className="w-6 h-6 text-yellow-600" />
                    </div>
                    <CardTitle className="group-hover:text-yellow-600 transition-colors">Lightning Fast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Build and customize your resume in minutes with our intuitive drag-and-drop interface 
                      and real-time preview.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Download className="w-6 h-6 text-red-600" />
                    </div>
                    <CardTitle className="group-hover:text-red-600 transition-colors">Multiple Formats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Export your resume in PDF, DOCX, or JSON formats. All templates are optimized 
                      for both digital and print applications.
                    </p>
                  </CardContent>
                </Card>

                <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
                  <CardHeader>
                    <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6 text-indigo-600" />
                    </div>
                    <CardTitle className="group-hover:text-indigo-600 transition-colors">Collaboration</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700">
                      Share your resume with mentors and colleagues for feedback. Get comments and 
                      suggestions to improve your application.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Right Sidebar - Ad Placement for Desktop */}
            <div className="lg:col-span-3 hidden lg:block">
              <div className="sticky top-24 space-y-6">
                <AdPlacement 
                  size="rectangle" 
                  placeholder="Rectangle Ad - 300x250"
                />
                <AdPlacement 
                  size="square" 
                  placeholder="Square Ad - 250x250"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Rectangle Ad */}
      <div className="lg:hidden px-4 py-4">
        <AdPlacement 
          size="mobile-rectangle" 
          placeholder="Mobile Rectangle - 320x250"
        />
      </div>

      {/* Interactive AI Features Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full mb-4">
              <Brain className="w-4 h-4 mr-1" />
              Interactive AI Experience
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience AI-Powered Resume Building
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Try our interactive AI features and see how we can transform your resume with cutting-edge technology
            </p>
          </div>

          <InteractiveAIFeatures />
        </div>
      </section>

      {/* Free AI Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              Free AI Services
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Experience AI Without Limits
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Try our free AI services powered by Hugging Face, OpenAI Playground, and other free AI platforms. 
              No credit card required, no limits on usage.
            </p>
          </div>

          <FreeAIServices />
        </div>
      </section>

      {/* AI Demo Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AIDemo />
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-50">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Main CTA Content */}
            <div className="lg:col-span-8 text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 bg-white/20 text-white text-sm font-medium rounded-full mb-4">
                <TrendingUp className="w-4 h-4 mr-1" />
                Join 50,000+ Success Stories
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Build Your Perfect Resume?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto lg:mx-0">
                Join thousands of professionals who have already created winning resumes with ResumeAI. 
                Start your journey to career success today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link href="/builder">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Building Now
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 transition-all">
                  <Heart className="w-5 h-5 mr-2" />
                  See Examples
                </Button>
              </div>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-blue-200">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Free forever
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  No credit card required
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Privacy guaranteed
                </div>
              </div>
            </div>
            
            {/* Right Side - Ad Placement for Desktop */}
            <div className="lg:col-span-4 hidden lg:block">
              <div className="sticky top-24">
                <AdPlacement 
                  size="rectangle" 
                  className="mx-auto bg-white/10 border-white/20"
                  placeholder="Premium CTA Ad - 300x250"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Ad for All Devices */}
      <div className="px-4 py-4 bg-gray-50">
        <AdPlacement 
          size="banner" 
          placeholder="Banner Ad - 728x90"
        />
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-12 relative">
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
              <div className="flex space-x-4">
                <IconButton
                  icon={Share2}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-400 hover:text-white hover:border-white"
                  tooltip="Share"
                />
                <IconButton
                  icon={Heart}
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-400 hover:text-white hover:border-white"
                  tooltip="Like"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Templates</a></li>
                <li><a href="#" className="hover:text-white transition-colors">AI Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Export Options</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ATS Checker</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Resume Tips</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Career Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-white">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
          </div>
          
          {/* Newsletter Signup */}
          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                <p className="text-gray-400">Get the latest resume tips and AI features delivered to your inbox.</p>
              </div>
                <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => {
                  e.preventDefault();
                  const email = (e.target as HTMLFormElement).email.value;
                  if (email) {
                    window.open(`mailto:sourav.offic@gmail.com?subject=Newsletter Subscription&body=Please subscribe me to the ResumeAI newsletter. Email: ${email}`, '_blank');
                  }
                }}>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    required
                  />
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 whitespace-nowrap">
                    Subscribe
                  </Button>
                </form>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2024 ResumeAI. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-sm">Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span className="text-sm">for job seekers</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}