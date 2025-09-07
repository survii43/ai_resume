import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  Sparkles, 
  FileText, 
  Download, 
  Users, 
  Shield, 
  Zap,
  Brain,
  Target,
  ArrowRight
} from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <FileText className="w-8 h-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">ResumeAI</span>
            </div>
            <div className="flex space-x-4">
              <Link href="/auth/signin">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/builder">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Build Your Perfect Resume with{' '}
              <span className="text-blue-600">AI Power</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Create professional, ATS-optimized resumes in minutes. Our AI helps you craft compelling content, 
              improve bullet points, and tailor your resume to any job description.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/builder">
                <Button size="lg" className="w-full sm:w-auto">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Start Building Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <FileText className="w-5 h-5 mr-2" />
                View Templates
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              No credit card required • Privacy-first • 100% Free
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose ResumeAI?
            </h2>
            <p className="text-xl text-gray-700">
              The most advanced AI-powered resume builder with privacy-first approach
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>AI-Powered Content</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Generate professional summaries, improve bullet points, and get personalized suggestions 
                  powered by advanced AI models running locally on your device.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>ATS Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Get real-time ATS score feedback and keyword suggestions to ensure your resume 
                  passes through applicant tracking systems.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>Privacy-First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Your data stays on your device. We use local AI models, so your personal information 
                  never leaves your computer.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>Lightning Fast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Build and customize your resume in minutes with our intuitive drag-and-drop interface 
                  and real-time preview.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>Multiple Formats</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Export your resume in PDF, DOCX, or JSON formats. All templates are optimized 
                  for both digital and print applications.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>Collaboration</CardTitle>
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
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who have already created winning resumes with ResumeAI
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
          <p className="text-sm text-blue-200 mt-4">
            Free forever • No credit card required • Privacy guaranteed
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <FileText className="w-8 h-8 text-blue-400 mr-2" />
                <span className="text-xl font-bold">ResumeAI</span>
              </div>
              <p className="text-gray-400">
                The most advanced AI-powered resume builder with privacy-first approach.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Resume Builder</a></li>
                <li><a href="#" className="hover:text-white">Templates</a></li>
                <li><a href="#" className="hover:text-white">AI Features</a></li>
                <li><a href="#" className="hover:text-white">Export Options</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Resume Tips</a></li>
                <li><a href="#" className="hover:text-white">Career Guide</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
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