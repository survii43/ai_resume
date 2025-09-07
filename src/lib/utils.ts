import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  const d = new Date(date)
  return d.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long' 
  })
}

export function calculateProgress(resume: any): number {
  let completed = 0
  const total = 5

  if (resume.personalInfo?.firstName && resume.personalInfo?.lastName && resume.personalInfo?.email) {
    completed++
  }
  if (resume.experiences && resume.experiences.length > 0) {
    completed++
  }
  if (resume.education && resume.education.length > 0) {
    completed++
  }
  if (resume.skills && resume.skills.length > 0) {
    completed++
  }
  if (resume.projects && resume.projects.length > 0) {
    completed++
  }

  return Math.round((completed / total) * 100)
}

export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

export function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3)
    .filter((word, index, arr) => arr.indexOf(word) === index)
    .slice(0, 20)
}
