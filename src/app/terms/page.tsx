'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  FileText, 
  Scale, 
  Shield, 
  AlertTriangle, 
  CheckCircle,
  ArrowLeft,
  Users,
  Globe,
  Lock,
  Zap,
  Heart
} from 'lucide-react'

export default function TermsPage() {
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
          <div className="inline-flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-sm font-medium rounded-full mb-4">
            <Scale className="w-4 h-4 mr-1" />
            Legal Terms
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms & <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Conditions</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Please read these terms carefully before using ResumeAI. By using our service, 
            you agree to be bound by these terms and conditions.
          </p>
          <div className="text-sm text-gray-600">
            Last updated: December 2024
          </div>
        </div>
      </section>

      {/* Key Terms Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Terms Summary</h2>
            <p className="text-xl text-gray-700">
              Important points about using ResumeAI
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Free to Use</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  ResumeAI is free to use with no hidden fees or subscription requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Privacy Protected</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Your data is processed locally and never stored on our servers.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>User Responsibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  You are responsible for the accuracy and content of your resume.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>Service Availability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We strive for 99.9% uptime but cannot guarantee uninterrupted service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  By accessing and using ResumeAI ("the Service"), you accept and agree to be bound by the terms 
                  and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p className="text-gray-700">
                  These Terms of Service ("Terms") govern your use of our website and services operated by ResumeAI 
                  ("us", "we", or "our").
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  ResumeAI is an AI-powered resume building platform that provides:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Resume templates and formatting tools</li>
                  <li>AI-powered content suggestions and improvements</li>
                  <li>ATS (Applicant Tracking System) optimization features</li>
                  <li>Export capabilities in multiple formats (PDF, DOCX, JSON)</li>
                  <li>Local AI processing using Ollama framework</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts and Registration</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  While ResumeAI can be used without creating an account, certain features may require registration:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>You must provide accurate and complete information when registering</li>
                  <li>You are responsible for maintaining the confidentiality of your account</li>
                  <li>You must notify us immediately of any unauthorized use of your account</li>
                  <li>We reserve the right to suspend or terminate accounts that violate these terms</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibilities and Conduct</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  As a user of ResumeAI, you agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Provide accurate and truthful information in your resume</li>
                  <li>Not use the service for any illegal or unauthorized purpose</li>
                  <li>Not attempt to gain unauthorized access to our systems</li>
                  <li>Not use the service to create resumes for fraudulent purposes</li>
                  <li>Respect intellectual property rights of others</li>
                  <li>Not distribute or share inappropriate or offensive content</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Privacy and Data Protection</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start">
                  <Shield className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Privacy-First Approach</h3>
                    <p className="text-green-700 mb-4">
                      ResumeAI is designed with privacy as a core principle:
                    </p>
                    <ul className="list-disc list-inside text-green-700 space-y-2">
                      <li>All AI processing occurs locally on your device</li>
                      <li>Your resume data is not stored on our servers</li>
                      <li>We do not track or monitor your resume content</li>
                      <li>You maintain complete control over your data</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual Property Rights</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  Intellectual property rights are protected as follows:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>You retain ownership of all content you create using ResumeAI</li>
                  <li>ResumeAI's software, templates, and AI models are our intellectual property</li>
                  <li>You may not reverse engineer, copy, or distribute our software</li>
                  <li>You grant us a limited license to process your data locally for service provision</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Service Availability and Modifications</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  We strive to provide reliable service but cannot guarantee:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Uninterrupted or error-free service</li>
                  <li>Compatibility with all devices or browsers</li>
                  <li>Availability of specific features at all times</li>
                  <li>Performance of third-party AI models (Ollama)</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  We reserve the right to modify, suspend, or discontinue the service at any time.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Legal Notice</h3>
                    <p className="text-yellow-700 mb-4">
                      ResumeAI is provided "as is" without warranties of any kind. We are not liable for:
                    </p>
                    <ul className="list-disc list-inside text-yellow-700 space-y-2">
                      <li>Any loss of data or resume content</li>
                      <li>Employment decisions based on resumes created with our service</li>
                      <li>Technical issues or service interruptions</li>
                      <li>Third-party AI model performance or availability</li>
                      <li>Indirect, incidental, or consequential damages</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Termination</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  Either party may terminate this agreement at any time:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>You may stop using the service at any time</li>
                  <li>We may suspend or terminate access for violations of these terms</li>
                  <li>Termination does not affect your ownership of content you created</li>
                  <li>We may discontinue the service with reasonable notice</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Governing Law and Disputes</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  These terms are governed by the laws of the jurisdiction where ResumeAI is incorporated. 
                  Any disputes will be resolved through:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Good faith negotiation as the first step</li>
                  <li>Binding arbitration if negotiation fails</li>
                  <li>Individual claims only (no class actions)</li>
                  <li>Jurisdiction in our local courts for legal proceedings</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700">
                  We may update these Terms of Service from time to time. We will notify users of any 
                  material changes by posting the new terms on this page and updating the "Last updated" date. 
                  Your continued use of the service after such changes constitutes acceptance of the new terms.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> legal@resumeai.com</p>
                  <p><strong>Address:</strong> ResumeAI Legal Team, 123 Innovation Drive, Tech City, TC 12345</p>
                  <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Now that you understand our terms, start building your professional resume with ResumeAI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/builder">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                Start Building
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 transition-all">
                Have Questions?
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
