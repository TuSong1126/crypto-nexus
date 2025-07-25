import React from 'react'

// 字段类型定义
export interface FormField {
  id: string
  type: 'input' | 'select' | 'checkbox' | 'radio' | 'datePicker' | 'upload' | 'container'
  label: string
  placeholder?: string
  required?: boolean
  options?: { label: string; value: string }[]
  defaultValue?: any
  visible?: boolean
  containerTitle?: string
  containerStyle?: any
  children?: FormField[]
  width?: 'full' | 'half' | 'third' | 'quarter' // 字段宽度占比
  parentId?: string // 父容器ID
}

// 属性配置面板组件属性
export interface PropertyPanelProps {
  field: FormField
  onUpdate: (field: FormField) => void
}

// 字段库组件属性
export interface FieldLibraryProps {
  onDragStart: (field: FormField) => void
  onDragEnd: () => void
}

// 表单设计器组件属性
export interface FormDesignerProps {
  formFields: FormField[]
  selectedField: FormField | null
  draggedField: FormField | null
  dragOverContainer: string | null
  onDrop: (e: React.DragEvent, containerId?: string) => void
  onDragOver: (e: React.DragEvent) => void
  onSelectField: (field: FormField) => void
  onDeleteField: (fieldId: string, parentId?: string) => void
  onMoveField: (fieldId: string, direction: 'up' | 'down') => void
  setDragOverContainer: (id: string | null) => void
  setFormFields: (fields: FormField[] | ((prev: FormField[]) => FormField[])) => void
  renderFormField: (field: FormField) => React.ReactNode
}

// 预览抽屉组件属性
export interface PreviewDrawerProps {
  visible: boolean
  onClose: () => void
  formFields: FormField[]
  renderFormField: (field: FormField) => React.ReactNode
}
