import { FormField } from './types'

// 生成唯一ID
export const generateId = () => `field_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

// 获取字段宽度类名
export const getWidthClass = (width?: string) => {
  switch (width) {
    case 'half':
      return 'w-1/2'
    case 'third':
      return 'w-1/3'
    case 'quarter':
      return 'w-1/4'
    default:
      return 'w-full'
  }
}

// 更新容器内的字段
export const updateContainerField = (
  formFields: FormField[],
  containerId: string,
  updatedChildren: FormField[]
) => {
  return formFields.map((field) =>
    field.id === containerId ? { ...field, children: updatedChildren } : field
  )
}

// 查找字段（包括嵌套在容器内的字段）
export const findField = (formFields: FormField[], fieldId: string): FormField | null => {
  for (const field of formFields) {
    if (field.id === fieldId) {
      return field
    }

    if (field.type === 'container' && field.children) {
      const found = findField(field.children, fieldId)
      if (found) return found
    }
  }

  return null
}
