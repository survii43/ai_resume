'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { 
  FileText, 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  CheckCircle,
  ArrowLeft,
  AlertTriangle,
  Users,
  Globe,
  Server,
  Key
} from 'lucide-react'

export default function PrivacyPage() {
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
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full mb-4">
            <Shield className="w-4 h-4 mr-1" />
            Privacy-First Approach
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Privacy <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Policy</span>
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Your privacy is our top priority. Learn how we protect your data and maintain complete transparency 
            in our data handling practices.
          </p>
          <div className="text-sm text-gray-600">
            Last updated: December 2024
          </div>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Privacy Promise</h2>
            <p className="text-xl text-gray-700">
              We believe your personal data should remain private and secure
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>Local Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  All AI processing happens locally on your device. Your data never leaves your computer.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>No Data Storage</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We don't store your resume data on our servers. Everything is processed locally.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>No Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We don't track your browsing behavior or collect analytics on your resume content.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Key className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>You Own Your Data</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Your resume data belongs to you. Export it anytime in multiple formats.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Personal Information</h3>
                <p className="text-gray-700 mb-4">
                  When you use ResumeAI, we may collect the following information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Account information (email address, name) if you choose to create an account</li>
                  <li>Resume content that you input into our application</li>
                  <li>Usage analytics (page views, feature usage) - anonymized and aggregated</li>
                  <li>Device information (browser type, operating system) for technical support</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  We use your information solely to provide and improve our services:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Process your resume data locally using AI models</li>
                  <li>Provide personalized suggestions and improvements</li>
                  <li>Generate ATS-optimized content</li>
                  <li>Improve our application performance and user experience</li>
                  <li>Provide customer support when requested</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Data Processing and Storage</h2>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start">
                  <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-green-800 mb-2">Local Processing Only</h3>
                    <p className="text-green-700">
                      All AI processing, including content generation, ATS optimization, and resume analysis, 
                      happens locally on your device using the Ollama AI framework. Your resume data never 
                      leaves your computer and is not transmitted to our servers.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Sharing and Disclosure</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  We do not share, sell, or disclose your personal information to third parties, except in the following limited circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, property, or safety, or that of our users</li>
                  <li>In connection with a business transfer or acquisition</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  We implement appropriate technical and organizational measures to protect your information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Local processing eliminates server-side data breaches</li>
                  <li>Encrypted data transmission for any necessary server communication</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and authentication measures</li>
                  <li>Secure development practices and code reviews</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Rights and Choices</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Access:</strong> Request a copy of any personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Export your resume data in multiple formats</li>
                  <li><strong>Objection:</strong> Object to processing of your personal information</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for data processing at any time</li>
                </ul>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Cookies and Tracking</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700 mb-4">
                  We use minimal cookies and tracking technologies:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Essential cookies for application functionality</li>
                  <li>Analytics cookies (anonymized) to improve user experience</li>
                  <li>No third-party advertising cookies</li>
                  <li>No cross-site tracking or behavioral profiling</li>
                </ul>
                <p className="text-gray-700 mt-4">
                  You can control cookie settings through your browser preferences.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children's Privacy</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700">
                  ResumeAI is not intended for children under 13 years of age. We do not knowingly collect 
                  personal information from children under 13. If you are a parent or guardian and believe 
                  your child has provided us with personal information, please contact us immediately.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. International Data Transfers</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700">
                  Since all data processing occurs locally on your device, there are no international data 
                  transfers of your personal information. Your data remains on your device and is not 
                  transmitted across international borders.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <p className="text-gray-700">
                  We may update this Privacy Policy from time to time. We will notify you of any changes 
                  by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                  We encourage you to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Privacy Policy or our data practices, please contact us:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Email:</strong> privacy@resumeai.com</p>
                  <p><strong>Address:</strong> ResumeAI Privacy Team, 123 Innovation Drive, Tech City, TC 12345</p>
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
            Questions About Privacy?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're committed to transparency and protecting your privacy. Contact us with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all shadow-lg">
                Contact Us
              </Button>
            </Link>
            <Link href="/builder">
              <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 hover:scale-105 transition-all">
                Start Building
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
