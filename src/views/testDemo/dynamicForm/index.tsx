// 导入样式
import './styles.scss'

import { EyeOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React, { useCallback, useState } from 'react'

// 导入组件
import FieldLibrary from './components/FieldLibrary'
import FieldRenderer from './components/FieldRenderer'
import FormDesigner from './components/FormDesigner'
import PreviewDrawer from './components/PreviewDrawer'
import PropertyPanel from './components/PropertyPanel'
// 导入类型和常量
import { FormField } from './types'
import { generateId } from './utils'

const DynamicFormBuilder: React.FC = () => {
  // 状态管理
  const [formFields, setFormFields] = useState<FormField[]>([])
  const [selectedField, setSelectedField] = useState<FormField | null>(null)
  const [previewVisible, setPreviewVisible] = useState(false)
  const [draggedField, setDraggedField] = useState<FormField | null>(null)
  const [dragOverContainer, setDragOverContainer] = useState<string | null>(null)

  // 拖拽开始
  const handleDragStart = useCallback((field: FormField) => {
    setDraggedField({ ...field, id: generateId() })
  }, [])

  // 拖拽结束
  const handleDragEnd = useCallback(() => {
    setDraggedField(null)
  }, [])

  // 放置到表单区域
  const handleDrop = useCallback(
    (e: React.DragEvent, containerId?: string) => {
      e.preventDefault()
      e.stopPropagation()
      if (draggedField) {
        const newField = { ...draggedField, parentId: containerId }
        if (containerId) {
          // 添加到容器内
          setFormFields((prev) =>
            prev.map((field) =>
              field.id === containerId
                ? { ...field, children: [...(field.children || []), newField] }
                : field
            )
          )
        } else {
          // 添加到根级别
          setFormFields((prev) => [...prev, newField])
        }
        setDraggedField(null)
        setDragOverContainer(null)
      }
    },
    [draggedField]
  )

  // 允许放置
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
  }, [])

  // 删除字段
  const handleDeleteField = useCallback(
    (fieldId: string, parentId?: string) => {
      if (parentId) {
        // 从容器中删除
        setFormFields((prev) =>
          prev.map((field) =>
            field.id === parentId
              ? { ...field, children: field.children?.filter((child) => child.id !== fieldId) }
              : field
          )
        )
      } else {
        // 从根级别删除
        setFormFields((prev) => prev.filter((field) => field.id !== fieldId))
      }
      if (selectedField?.id === fieldId) {
        setSelectedField(null)
      }
    },
    [selectedField]
  )

  // 选择字段
  const handleSelectField = useCallback(
    (field: FormField) => {
      // 确保获取最新的字段数据
      if (field.parentId) {
        // 如果是容器内的字段，从formFields中找到最新的数据
        const parentField = formFields.find((f) => f.id === field.parentId)
        if (parentField && parentField.children) {
          const updatedField = parentField.children.find((f) => f.id === field.id)
          if (updatedField) {
            setSelectedField(updatedField)
            return
          }
        }
      } else {
        // 如果是根级字段，从formFields中找到最新的数据
        const updatedField = formFields.find((f) => f.id === field.id)
        if (updatedField) {
          setSelectedField(updatedField)
          return
        }
      }

      // 如果找不到更新的字段，则使用传入的字段
      setSelectedField(field)
    },
    [formFields]
  )

  // 更新字段属性
  const handleUpdateField = useCallback((updatedField: FormField) => {
    if (updatedField.parentId) {
      // 更新容器内的字段
      setFormFields((prev) =>
        prev.map((field) =>
          field.id === updatedField.parentId
            ? {
                ...field,
                children: field.children?.map((child) =>
                  child.id === updatedField.id ? updatedField : child
                )
              }
            : field
        )
      )
    } else {
      // 更新根级别字段
      setFormFields((prev) =>
        prev.map((field) => (field.id === updatedField.id ? updatedField : field))
      )
    }
    setSelectedField(updatedField)
  }, [])

  // 字段移动（上移/下移）
  const handleMoveField = useCallback((fieldId: string, direction: 'up' | 'down') => {
    setFormFields((prev) => {
      const index = prev.findIndex((field) => field.id === fieldId)
      if ((direction === 'up' && index > 0) || (direction === 'down' && index < prev.length - 1)) {
        const newFields = [...prev]
        const targetIndex = direction === 'up' ? index - 1 : index + 1
        ;[newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]]
        return newFields
      }
      return prev
    })
  }, [])

  // 渲染字段组件
  const renderFormField = useCallback(
    (field: FormField) => {
      return (
        <FieldRenderer
          field={field}
          dragOverContainer={dragOverContainer}
          onDrop={handleDrop}
          setDragOverContainer={setDragOverContainer}
          onSelectField={handleSelectField}
          onDeleteField={handleDeleteField}
          renderFormField={renderFormField}
        />
      )
    },
    [dragOverContainer, handleDrop, handleSelectField, handleDeleteField]
  )

  return (
    <div className="h-screen flex bg-gray-100 overflow-hidden dynamic-form-builder">
      {/* 左侧字段库 */}
      <FieldLibrary onDragStart={handleDragStart} onDragEnd={handleDragEnd} />

      {/* 中间表单区域 */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <div className="flex justify-between items-center p-4 bg-white border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">动态表单设计器</h2>
          <Button type="primary" icon={<EyeOutlined />} onClick={() => setPreviewVisible(true)}>
            预览表单
          </Button>
        </div>

        <FormDesigner
          formFields={formFields}
          selectedField={selectedField}
          draggedField={draggedField}
          dragOverContainer={dragOverContainer}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onSelectField={handleSelectField}
          onDeleteField={handleDeleteField}
          onMoveField={handleMoveField}
          setDragOverContainer={setDragOverContainer}
          setFormFields={setFormFields}
          renderFormField={renderFormField}
        />
      </div>

      {/* 右侧属性配置 */}
      <div className="w-80 bg-white border-l border-gray-200 h-full overflow-hidden">
        {selectedField ? (
          <PropertyPanel field={selectedField} onUpdate={handleUpdateField} />
        ) : (
          <div className="h-full flex items-center justify-center text-gray-400 p-4">
            <div className="text-center">
              <p>请选择一个字段进行配置</p>
            </div>
          </div>
        )}
      </div>

      {/* 预览抽屉 */}
      <PreviewDrawer
        visible={previewVisible}
        onClose={() => setPreviewVisible(false)}
        formFields={formFields}
        renderFormField={renderFormField}
      />
    </div>
  )
}

export default DynamicFormBuilder
