'use client'

import React from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import {
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useResume } from '@/contexts/ResumeContext'
import { ResumePreview } from './preview/ResumePreview'
import { GripVertical } from 'lucide-react'

interface DraggableSectionProps {
  id: string
  title: string
  children: React.ReactNode
}

function DraggableSection({ id, title, children }: DraggableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'z-50' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        <button
          {...attributes}
          {...listeners}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
        >
          <GripVertical className="w-4 h-4 text-gray-400" />
        </button>
      </div>
      {children}
    </div>
  )
}

export function DraggablePreview() {
  const { state, dispatch } = useResume()
  const { resume } = state

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const sections = [
    { id: 'personal', title: 'Personal Information', component: null },
    { id: 'summary', title: 'Professional Summary', component: null },
    { id: 'experience', title: 'Work Experience', component: null },
    { id: 'education', title: 'Education', component: null },
    { id: 'skills', title: 'Skills', component: null },
    { id: 'projects', title: 'Projects', component: null },
  ]

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event

    if (active.id !== over?.id) {
      // Here you would update the section order in your state
      // For now, we'll just log the new order
      console.log('New section order:', active.id, 'moved to position of', over?.id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">Resume Preview</h3>
        <p className="text-sm text-gray-500">Drag sections to reorder</p>
      </div>
      
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={sections.map(s => s.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-6">
            {sections.map((section) => (
              <DraggableSection key={section.id} id={section.id} title={section.title}>
                <div className="border rounded-lg p-4 bg-white">
                  <p className="text-sm text-gray-500">
                    {section.title} content will appear here
                  </p>
                </div>
              </DraggableSection>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}
