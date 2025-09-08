'use client'

import React, { useRef, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Download, FileText, Share2, File, Mail, Link, QrCode, Printer, Eye, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { useResume } from '@/contexts/ResumeContext'
import { useToast } from '@/contexts/ToastContext'

interface ExportButtonsProps {
  resumeRef: React.RefObject<HTMLDivElement>
}

export function ExportButtons({ resumeRef }: ExportButtonsProps) {
  const { state } = useResume()
  const { showSuccess, showError } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [exportFormat, setExportFormat] = useState<'pdf' | 'docx' | 'json' | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const handleExportPDF = async () => {
    if (!resumeRef.current) {
      showError('Resume content not found')
      return
    }

    setIsExporting(true)
    setExportFormat('pdf')

    try {
      // Create canvas from the resume content
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: resumeRef.current.scrollWidth,
        height: resumeRef.current.scrollHeight,
        logging: false,
      })

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      // Calculate dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight()
      const imgWidth = canvas.width
      const imgHeight = canvas.height
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
      const imgX = (pdfWidth - imgWidth * ratio) / 2
      const imgY = 0

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio)

      // Generate filename
      const name = state.resume.personalInfo?.firstName || 'Resume'
      const filename = `${name}_Resume.pdf`

      // Download PDF
      pdf.save(filename)
      showSuccess('PDF exported successfully!')
    } catch (error) {
      console.error('Error generating PDF:', error)
      showError('Failed to generate PDF. Please try again.')
    } finally {
      setIsExporting(false)
      setExportFormat(null)
    }
  }

  const handleExportDOCX = async () => {
    setIsExporting(true)
    setExportFormat('docx')
    
    try {
      // For now, show a message that DOCX export is coming soon
      showError('DOCX export is coming soon! For now, please use PDF export.')
    } catch (error) {
      showError('Failed to export DOCX')
    } finally {
      setIsExporting(false)
      setExportFormat(null)
    }
  }

  const handleExportJSON = () => {
    setIsExporting(true)
    setExportFormat('json')
    
    try {
      // Export resume data as JSON
      const resumeData = {
        personalInfo: state.resume.personalInfo,
        experiences: state.resume.experiences,
        education: state.resume.education,
        skills: state.resume.skills,
        projects: state.resume.projects,
        template: state.resume.template,
        title: state.resume.title,
        isPublic: state.resume.isPublic,
        exportedAt: new Date().toISOString(),
        version: '1.0'
      }

      const dataStr = JSON.stringify(resumeData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      
      const name = state.resume.personalInfo?.firstName || 'Resume'
      const filename = `${name}_Resume_Data.json`
      
      const link = document.createElement('a')
      link.href = url
      link.download = filename
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
      
      showSuccess('Resume data exported successfully!')
    } catch (error) {
      showError('Failed to export resume data')
    } finally {
      setIsExporting(false)
      setExportFormat(null)
    }
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${state.resume.personalInfo?.firstName || 'My'} Resume`,
          text: 'Check out my professional resume',
          url: window.location.href,
        })
        showSuccess('Resume shared successfully!')
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href)
        showSuccess('Resume link copied to clipboard!')
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        showError('Failed to share resume')
      }
    }
  }

  const handlePrint = () => {
    if (!resumeRef.current) {
      showError('Resume content not found')
      return
    }
    
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Resume - ${state.resume.personalInfo?.firstName || 'My'} Resume</title>
            <style>
              body { margin: 0; padding: 20px; font-family: Arial, sans-serif; }
              @media print { body { margin: 0; padding: 0; } }
            </style>
          </head>
          <body>
            ${resumeRef.current.innerHTML}
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`${state.resume.personalInfo?.firstName || 'My'} Resume`)
    const body = encodeURIComponent('Please find my resume attached.')
    const mailtoLink = `mailto:?subject=${subject}&body=${body}`
    window.open(mailtoLink)
  }

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* PDF Export - Primary */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">PDF Export</h3>
                  <p className="text-sm text-gray-600">High-quality PDF format</p>
                </div>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircle className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Recommended</span>
              </div>
            </div>
            <Button
              onClick={handleExportPDF}
              loading={isExporting && exportFormat === 'pdf'}
              className="w-full"
              size="lg"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting && exportFormat === 'pdf' ? 'Generating PDF...' : 'Export as PDF'}
            </Button>
          </CardContent>
        </Card>

        {/* DOCX Export */}
        <Card className="hover:shadow-lg transition-all duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">DOCX Export</h3>
                  <p className="text-sm text-gray-600">Editable Word document</p>
                </div>
              </div>
              <div className="flex items-center text-orange-600">
                <AlertCircle className="w-5 h-5 mr-1" />
                <span className="text-sm font-medium">Coming Soon</span>
              </div>
            </div>
            <Button
              onClick={handleExportDOCX}
              loading={isExporting && exportFormat === 'docx'}
              variant="outline"
              className="w-full"
              size="lg"
            >
              <FileText className="w-4 h-4 mr-2" />
              {isExporting && exportFormat === 'docx' ? 'Generating DOCX...' : 'Export as DOCX'}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Additional Export Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Download className="w-5 h-5 mr-2 text-blue-600" />
            Additional Export Options
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button
              onClick={handleExportJSON}
              loading={isExporting && exportFormat === 'json'}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
            >
              <File className="w-6 h-6 mb-2" />
              <span className="text-sm">JSON Data</span>
            </Button>
            
            <Button
              onClick={handlePrint}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
            >
              <Printer className="w-6 h-6 mb-2" />
              <span className="text-sm">Print</span>
            </Button>
            
            <Button
              onClick={handleEmail}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
            >
              <Mail className="w-6 h-6 mb-2" />
              <span className="text-sm">Email</span>
            </Button>
            
            <Button
              onClick={() => setShowPreview(!showPreview)}
              variant="outline"
              className="flex flex-col items-center p-4 h-auto"
            >
              <Eye className="w-6 h-6 mb-2" />
              <span className="text-sm">Preview</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Share Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-gray-900">
            <Share2 className="w-5 h-5 mr-2 text-green-600" />
            Share Your Resume
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <Link className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">Share Link</h4>
                  <p className="text-sm text-gray-600">Copy link to share with others</p>
                </div>
              </div>
              <Button
                onClick={handleShare}
                variant="outline"
                size="sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <QrCode className="w-5 h-5 mr-3 text-gray-600" />
                <div>
                  <h4 className="font-medium text-gray-900">QR Code</h4>
                  <p className="text-sm text-gray-600">Generate QR code for easy sharing</p>
                </div>
              </div>
              <Button
                onClick={() => showError('QR Code generation coming soon!')}
                variant="outline"
                size="sm"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <Lightbulb className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-1">Export Tips</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• PDF format is recommended for job applications</li>
                <li>• Use a descriptive filename with your name</li>
                <li>• Keep file size under 5MB for email attachments</li>
                <li>• Test your PDF on different devices before sending</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
