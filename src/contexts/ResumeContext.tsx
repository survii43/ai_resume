'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import { Resume, PersonalInfo, Experience, Education, Skill, Project } from '@/types'

interface ResumeState {
  resume: Resume
  currentStep: number
  isLoading: boolean
  error: string | null
}

type ResumeAction =
  | { type: 'SET_RESUME'; payload: Resume }
  | { type: 'UPDATE_PERSONAL_INFO'; payload: PersonalInfo }
  | { type: 'ADD_EXPERIENCE'; payload: Experience }
  | { type: 'UPDATE_EXPERIENCE'; payload: Experience }
  | { type: 'DELETE_EXPERIENCE'; payload: string }
  | { type: 'REORDER_EXPERIENCES'; payload: Experience[] }
  | { type: 'ADD_EDUCATION'; payload: Education }
  | { type: 'UPDATE_EDUCATION'; payload: Education }
  | { type: 'DELETE_EDUCATION'; payload: string }
  | { type: 'REORDER_EDUCATION'; payload: Education[] }
  | { type: 'ADD_SKILL'; payload: Skill }
  | { type: 'UPDATE_SKILL'; payload: Skill }
  | { type: 'DELETE_SKILL'; payload: string }
  | { type: 'REORDER_SKILLS'; payload: Skill[] }
  | { type: 'ADD_PROJECT'; payload: Project }
  | { type: 'UPDATE_PROJECT'; payload: Project }
  | { type: 'DELETE_PROJECT'; payload: string }
  | { type: 'REORDER_PROJECTS'; payload: Project[] }
  | { type: 'SET_TEMPLATE'; payload: string }
  | { type: 'SET_STEP'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }

const initialState: ResumeState = {
  resume: {
    title: 'My Resume',
    template: 'classic',
    isPublic: false,
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: '',
      summary: '',
    },
    experiences: [],
    education: [],
    skills: [],
    projects: [],
  },
  currentStep: 1,
  isLoading: false,
  error: null,
}

function resumeReducer(state: ResumeState, action: ResumeAction): ResumeState {
  switch (action.type) {
    case 'SET_RESUME':
      return { ...state, resume: action.payload }
    
    case 'UPDATE_PERSONAL_INFO':
      return {
        ...state,
        resume: { ...state.resume, personalInfo: action.payload }
      }
    
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          experiences: [...state.resume.experiences, action.payload]
        }
      }
    
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          experiences: state.resume.experiences.map(exp =>
            exp.id === action.payload.id ? action.payload : exp
          )
        }
      }
    
    case 'DELETE_EXPERIENCE':
      return {
        ...state,
        resume: {
          ...state.resume,
          experiences: state.resume.experiences.filter(exp => exp.id !== action.payload)
        }
      }
    
    case 'REORDER_EXPERIENCES':
      return {
        ...state,
        resume: { ...state.resume, experiences: action.payload }
      }
    
    case 'ADD_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: [...state.resume.education, action.payload]
        }
      }
    
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: state.resume.education.map(edu =>
            edu.id === action.payload.id ? action.payload : edu
          )
        }
      }
    
    case 'DELETE_EDUCATION':
      return {
        ...state,
        resume: {
          ...state.resume,
          education: state.resume.education.filter(edu => edu.id !== action.payload)
        }
      }
    
    case 'REORDER_EDUCATION':
      return {
        ...state,
        resume: { ...state.resume, education: action.payload }
      }
    
    case 'ADD_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: [...state.resume.skills, action.payload]
        }
      }
    
    case 'UPDATE_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: state.resume.skills.map(skill =>
            skill.id === action.payload.id ? action.payload : skill
          )
        }
      }
    
    case 'DELETE_SKILL':
      return {
        ...state,
        resume: {
          ...state.resume,
          skills: state.resume.skills.filter(skill => skill.id !== action.payload)
        }
      }
    
    case 'REORDER_SKILLS':
      return {
        ...state,
        resume: { ...state.resume, skills: action.payload }
      }
    
    case 'ADD_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: [...state.resume.projects, action.payload]
        }
      }
    
    case 'UPDATE_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: state.resume.projects.map(project =>
            project.id === action.payload.id ? action.payload : project
          )
        }
      }
    
    case 'DELETE_PROJECT':
      return {
        ...state,
        resume: {
          ...state.resume,
          projects: state.resume.projects.filter(project => project.id !== action.payload)
        }
      }
    
    case 'REORDER_PROJECTS':
      return {
        ...state,
        resume: { ...state.resume, projects: action.payload }
      }
    
    case 'SET_TEMPLATE':
      return {
        ...state,
        resume: { ...state.resume, template: action.payload }
      }
    
    case 'SET_STEP':
      return { ...state, currentStep: action.payload }
    
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    
    default:
      return state
  }
}

interface ResumeContextType {
  state: ResumeState
  dispatch: React.Dispatch<ResumeAction>
  updatePersonalInfo: (info: PersonalInfo) => void
  addExperience: (experience: Experience) => void
  updateExperience: (experience: Experience) => void
  deleteExperience: (id: string) => void
  reorderExperiences: (experiences: Experience[]) => void
  addEducation: (education: Education) => void
  updateEducation: (education: Education) => void
  deleteEducation: (id: string) => void
  reorderEducation: (education: Education[]) => void
  addSkill: (skill: Skill) => void
  updateSkill: (skill: Skill) => void
  deleteSkill: (id: string) => void
  reorderSkills: (skills: Skill[]) => void
  addProject: (project: Project) => void
  updateProject: (project: Project) => void
  deleteProject: (id: string) => void
  reorderProjects: (projects: Project[]) => void
  setTemplate: (template: string) => void
  setStep: (step: number) => void
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined)

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState)

  const updatePersonalInfo = (info: PersonalInfo) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: info })
  }

  const addExperience = (experience: Experience) => {
    dispatch({ type: 'ADD_EXPERIENCE', payload: experience })
  }

  const updateExperience = (experience: Experience) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: experience })
  }

  const deleteExperience = (id: string) => {
    dispatch({ type: 'DELETE_EXPERIENCE', payload: id })
  }

  const reorderExperiences = (experiences: Experience[]) => {
    dispatch({ type: 'REORDER_EXPERIENCES', payload: experiences })
  }

  const addEducation = (education: Education) => {
    dispatch({ type: 'ADD_EDUCATION', payload: education })
  }

  const updateEducation = (education: Education) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: education })
  }

  const deleteEducation = (id: string) => {
    dispatch({ type: 'DELETE_EDUCATION', payload: id })
  }

  const reorderEducation = (education: Education[]) => {
    dispatch({ type: 'REORDER_EDUCATION', payload: education })
  }

  const addSkill = (skill: Skill) => {
    dispatch({ type: 'ADD_SKILL', payload: skill })
  }

  const updateSkill = (skill: Skill) => {
    dispatch({ type: 'UPDATE_SKILL', payload: skill })
  }

  const deleteSkill = (id: string) => {
    dispatch({ type: 'DELETE_SKILL', payload: id })
  }

  const reorderSkills = (skills: Skill[]) => {
    dispatch({ type: 'REORDER_SKILLS', payload: skills })
  }

  const addProject = (project: Project) => {
    dispatch({ type: 'ADD_PROJECT', payload: project })
  }

  const updateProject = (project: Project) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: project })
  }

  const deleteProject = (id: string) => {
    dispatch({ type: 'DELETE_PROJECT', payload: id })
  }

  const reorderProjects = (projects: Project[]) => {
    dispatch({ type: 'REORDER_PROJECTS', payload: projects })
  }

  const setTemplate = (template: string) => {
    dispatch({ type: 'SET_TEMPLATE', payload: template })
  }

  const setStep = (step: number) => {
    dispatch({ type: 'SET_STEP', payload: step })
  }

  const value: ResumeContextType = {
    state,
    dispatch,
    updatePersonalInfo,
    addExperience,
    updateExperience,
    deleteExperience,
    reorderExperiences,
    addEducation,
    updateEducation,
    deleteEducation,
    reorderEducation,
    addSkill,
    updateSkill,
    deleteSkill,
    reorderSkills,
    addProject,
    updateProject,
    deleteProject,
    reorderProjects,
    setTemplate,
    setStep,
  }

  return (
    <ResumeContext.Provider value={value}>
      {children}
    </ResumeContext.Provider>
  )
}

export function useResume() {
  const context = useContext(ResumeContext)
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider')
  }
  return context
}
