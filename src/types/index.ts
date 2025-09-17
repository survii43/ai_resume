export interface PersonalInfo {
  id?: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  location?: string
  website?: string
  linkedin?: string
  github?: string
  summary?: string
}

export interface Experience {
  id?: string
  company: string
  position: string
  location?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description?: string
  order: number
}

export interface Education {
  id?: string
  institution: string
  degree: string
  field?: string
  location?: string
  startDate: string
  endDate?: string
  gpa?: string
  description?: string
  order: number
}

export interface Skill {
  id?: string
  name: string
  level: number // 1-5 scale
  category: string
  order: number
}

export interface Project {
  id?: string
  name: string
  description?: string
  technologies?: string
  url?: string
  githubUrl?: string
  startDate?: string
  endDate?: string
  order: number
}

export interface TemplateSettings {
  template: string
  colorScheme: string
  fontSize: string
  fontFamily: string
  layout: string
  showDividers: boolean
  showIcons: boolean
  compactMode: boolean
  convertToBullets: boolean
  bulletStyle: 'dash' | 'dot' | 'arrow' | 'number'
}

export interface Resume {
  id?: string
  title: string
  template: string
  templateSettings?: TemplateSettings
  isPublic: boolean
  shareToken?: string
  personalInfo?: PersonalInfo
  experiences: Experience[]
  education: Education[]
  skills: Skill[]
  projects: Project[]
  createdAt?: string
  updatedAt?: string
}

export interface AISuggestion {
  type: 'summary' | 'bullet' | 'tailor'
  content: string
  confidence: number
}

export interface ProgressData {
  personalInfo: boolean
  experiences: boolean
  education: boolean
  skills: boolean
  projects: boolean
  total: number
}

export interface ATSScore {
  score: number
  suggestions: string[]
  keywords: string[]
  missingKeywords: string[]
}
