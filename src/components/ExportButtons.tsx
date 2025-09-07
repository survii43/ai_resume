'use client'

import React, { useRef } from 'react'
import { Button } from '@/components/ui/Button'
import { Download, FileText, Share2, File } from 'lucide-react'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

interface ExportButtonsProps {
  resumeRef: React.RefObject<HTMLDivElement>
}

export function ExportButtons({ resumeRef }: ExportButtonsProps) {
  const handleExportPDF = async () => {
    if (!resumeRef.current) {
      alert('Resume content not found')
      return
    }

    try {
      // Show loading state
      const button = document.querySelector('[data-export="pdf"]') as HTMLButtonElement
      if (button) {
        button.disabled = true
        button.textContent = 'Generating PDF...'
      }

      // Create canvas from the resume content
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: resumeRef.current.scrollWidth,
        height: resumeRef.current.scrollHeight,
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

      // Download PDF
      pdf.save('resume.pdf')

      // Reset button state
      if (button) {
        button.disabled = false
        button.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Export as PDF'
      }
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
      
      // Reset button state
      const button = document.querySelector('[data-export="pdf"]') as HTMLButtonElement
      if (button) {
        button.disabled = false
        button.innerHTML = '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>Export as PDF'
      }
    }
  }

  const handleExportDOCX = () => {
    // Placeholder for DOCX export
    alert('DOCX export coming soon!')
  }

  const handleExportJSON = () => {
    // Export resume data as JSON
    const resumeData = {
      personalInfo: {},
      experiences: [],
      education: [],
      skills: [],
      projects: [],
      template: 'classic',
      // Add actual resume data here
    }

    const dataStr = JSON.stringify(resumeData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'resume-data.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Resume',
        text: 'Check out my professional resume',
        url: window.location.href,
      })
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Resume link copied to clipboard!')
    }
  }

  return (
    <div className="space-y-3">
      <Button
        onClick={handleExportPDF}
        data-export="pdf"
        className="w-full"
      >
        <Download className="w-4 h-4 mr-2" />
        Export as PDF
      </Button>
      
      <div className="grid grid-cols-2 gap-2">
        <Button
          onClick={handleExportDOCX}
          variant="outline"
          size="sm"
        >
          <FileText className="w-4 h-4 mr-2" />
          DOCX
        </Button>
        
        <Button
          onClick={handleExportJSON}
          variant="outline"
          size="sm"
        >
          <File className="w-4 h-4 mr-2" />
          JSON
        </Button>
      </div>
      
      <Button
        onClick={handleShare}
        variant="outline"
        className="w-full"
      >
        <Share2 className="w-4 h-4 mr-2" />
        Share Resume
      </Button>
    </div>
  )
}
