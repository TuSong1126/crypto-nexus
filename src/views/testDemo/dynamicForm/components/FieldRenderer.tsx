import { DragOutlined, UploadOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, DatePicker, Input, Radio, Select, Upload } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { FormField } from '../types'

interface FieldRendererProps {
  field: FormField
  dragOverContainer: string | null
  onDrop: (e: React.DragEvent, containerId?: string) => void
  setDragOverContainer: (id: string | null) => void
  onSelectField: (field: FormField) => void
  onDeleteField: (fieldId: string, parentId?: string) => void
  renderFormField: (field: FormField) => React.ReactNode
}

const FieldRenderer: React.FC<FieldRendererProps> = ({
  field,
  dragOverContainer,
  onDrop,
  setDragOverContainer,
  onSelectField,
  renderFormField
}) => {
  if (!field.visible) return null

  const commonProps = {
    placeholder: field.placeholder,
    required: field.required
  }

  switch (field.type) {
    case 'input':
      return <Input {...commonProps} className="field-input" />

    case 'select':
      return (
        <Select {...commonProps} className="w-full field-select">
          {field.options?.map((option) => (
            <Select.Option key={option.value} value={option.value}>
              {option.label}
            </Select.Option>
          ))}
        </Select>
      )

    case 'checkbox':
      return (
        <Checkbox.Group className="w-full field-checkbox-group">
          {field.options?.map((option) => (
            <Checkbox key={option.value} value={option.value} className="block mb-2 field-checkbox">
              {option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      )

    case 'radio':
      return (
        <Radio.Group className="w-full field-radio-group">
          {field.options?.map((option) => (
            <Radio key={option.value} value={option.value} className="block mb-2 field-radio">
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      )

    case 'datePicker':
      return <DatePicker {...commonProps} className="w-full field-datepicker" />

    case 'upload':
      return (
        <Upload className="field-upload">
          <Button icon={<UploadOutlined />}>点击上传</Button>
        </Upload>
      )

    case 'container':
      return (
        <Card
          title={field.containerTitle || '分区标题'}
          className={classNames('min-h-[120px] border-2 border-dashed field-container', {
            'border-blue-400 bg-blue-50 drag-over': dragOverContainer === field.id,
            'border-gray-300': dragOverContainer !== field.id
          })}
          style={field.containerStyle}
          onDrop={(e) => onDrop(e, field.id)}
          onDragOver={(e) => {
            e.preventDefault()
            setDragOverContainer(field.id)
          }}
          onDragLeave={(e) => {
            e.preventDefault()
            setDragOverContainer(null)
          }}
        >
          {field.children && field.children.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {field.children.map((childField) => (
                <div
                  key={childField.id}
                  className="relative group p-2 border border-transparent rounded hover:border-blue-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectField(childField)
                  }}
                >
                  {renderFormField(childField)}
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-20 text-gray-400">
              <div className="text-center">
                <DragOutlined className="text-2xl mb-1" />
                <p className="text-sm">拖拽字段到此分区</p>
              </div>
            </div>
          )}
        </Card>
      )

    default:
      return null
  }
}

export default FieldRenderer
