import { DeleteOutlined, DragOutlined, HolderOutlined } from '@ant-design/icons'
import { Button, Form, Space } from 'antd'
import classNames from 'classnames'
import React from 'react'

import { FormDesignerProps } from '../types'
import { getWidthClass } from '../utils'

const FormDesigner: React.FC<FormDesignerProps> = ({
  formFields,
  selectedField,
  draggedField,
  dragOverContainer,
  onDrop,
  onDragOver,
  onSelectField,
  onDeleteField,
  setFormFields,
  setDragOverContainer,
  renderFormField
}) => {
  return (
    <div className="flex-1 p-4 h-full overflow-auto form-designer">
      <div className="bg-white rounded-lg shadow-sm p-6 min-h-[calc(100%-2rem)]">
        <div
          className={classNames(
            'min-h-[600px] border-2 border-dashed rounded-lg p-6 transition-all drop-area',
            draggedField ? 'border-blue-400 bg-blue-50 drag-over' : 'border-gray-200'
          )}
          onDrop={(e) => onDrop(e)}
          onDragOver={onDragOver}
        >
          {formFields.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="text-center">
                <DragOutlined className="text-4xl mb-2" />
                <p>拖拽字段到此处开始设计表单</p>
              </div>
            </div>
          ) : (
            <Form layout="vertical">
              <div className="flex flex-wrap gap-4">
                {formFields.map((field, index) => (
                  <div
                    key={field.id}
                    className={classNames(
                      'relative group p-3 border rounded-md transition-all field-item',
                      getWidthClass(field.width),
                      selectedField?.id === field.id
                        ? 'border-blue-500 bg-blue-50 selected'
                        : 'border-transparent hover:border-blue-300'
                    )}
                    onClick={() => onSelectField(field)}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('field_id', field.id)
                      e.dataTransfer.setData('field_index', String(index))
                      e.dataTransfer.setData('field_type', 'root')
                      // 设置拖拽图像
                      const dragImage = document.createElement('div')
                      dragImage.textContent = field.label || '字段'
                      dragImage.style.padding = '4px 8px'
                      dragImage.style.background = '#f0f0f0'
                      dragImage.style.border = '1px solid #d9d9d9'
                      dragImage.style.borderRadius = '4px'
                      dragImage.style.position = 'absolute'
                      dragImage.style.top = '-1000px'
                      document.body.appendChild(dragImage)
                      e.dataTransfer.setDragImage(dragImage, 0, 0)
                      setTimeout(() => document.body.removeChild(dragImage), 0)
                    }}
                    onDragOver={(e) => {
                      e.preventDefault()
                      e.currentTarget.classList.add('drag-over-field')
                    }}
                    onDragLeave={(e) => {
                      e.currentTarget.classList.remove('drag-over-field')
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      e.currentTarget.classList.remove('drag-over-field')

                      const draggedId = e.dataTransfer.getData('field_id')
                      const draggedIndex = parseInt(e.dataTransfer.getData('field_index'))
                      const draggedType = e.dataTransfer.getData('field_type')

                      if (draggedType === 'root' && draggedId !== field.id) {
                        // 重新排序根级字段
                        const newFields = [...formFields]
                        const draggedField = newFields[draggedIndex]
                        newFields.splice(draggedIndex, 1)
                        const dropIndex = index > draggedIndex ? index - 1 : index
                        newFields.splice(dropIndex, 0, draggedField)
                        setFormFields(newFields)
                      }
                    }}
                  >
                    {field.type === 'container' ? (
                      <div
                        className={classNames(
                          'rounded-md border-2 border-dashed p-4 min-h-[120px] container-field',
                          dragOverContainer === field.id
                            ? 'border-blue-400 bg-blue-50 drag-over'
                            : 'border-gray-300'
                        )}
                        onDrop={(e) => {
                          e.stopPropagation()
                          onDrop(e, field.id)
                        }}
                        onDragOver={(e) => {
                          e.preventDefault()
                          setDragOverContainer(field.id)
                        }}
                        onDragLeave={(e) => {
                          e.preventDefault()
                          setDragOverContainer(null)
                        }}
                      >
                        <div className="font-medium text-gray-700 mb-3 container-title">
                          {field.containerTitle || '分区标题'}
                        </div>

                        {field.children && field.children.length > 0 ? (
                          <div className="flex flex-wrap gap-3">
                            {field.children.map((childField, childIndex) => (
                              <div
                                key={childField.id}
                                className={classNames(
                                  'relative group/child p-2 border border-transparent rounded-md hover:border-blue-300',
                                  getWidthClass(childField.width),
                                  {
                                    'border-blue-500 bg-blue-50':
                                      selectedField?.id === childField.id
                                  }
                                )}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onSelectField(childField)
                                }}
                                draggable
                                onDragStart={(e) => {
                                  e.stopPropagation()
                                  e.dataTransfer.setData('field_id', childField.id)
                                  e.dataTransfer.setData('field_index', String(childIndex))
                                  e.dataTransfer.setData('field_type', 'child')
                                  e.dataTransfer.setData('parent_id', field.id)
                                  // 设置拖拽图像
                                  const dragImage = document.createElement('div')
                                  dragImage.textContent = childField.label || '字段'
                                  dragImage.style.padding = '4px 8px'
                                  dragImage.style.background = '#f0f0f0'
                                  dragImage.style.border = '1px solid #d9d9d9'
                                  dragImage.style.borderRadius = '4px'
                                  dragImage.style.position = 'absolute'
                                  dragImage.style.top = '-1000px'
                                  document.body.appendChild(dragImage)
                                  e.dataTransfer.setDragImage(dragImage, 0, 0)
                                  setTimeout(() => document.body.removeChild(dragImage), 0)
                                }}
                                onDragOver={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  e.currentTarget.classList.add('drag-over-field')
                                }}
                                onDragLeave={(e) => {
                                  e.currentTarget.classList.remove('drag-over-field')
                                }}
                                onDrop={(e) => {
                                  e.preventDefault()
                                  e.stopPropagation()
                                  e.currentTarget.classList.remove('drag-over-field')

                                  const draggedId = e.dataTransfer.getData('field_id')
                                  const draggedIndex = parseInt(
                                    e.dataTransfer.getData('field_index')
                                  )
                                  const draggedType = e.dataTransfer.getData('field_type')
                                  const draggedParentId = e.dataTransfer.getData('parent_id')

                                  if (
                                    draggedType === 'child' &&
                                    draggedParentId === field.id &&
                                    draggedId !== childField.id
                                  ) {
                                    // 重新排序容器内字段
                                    const newFields = [...formFields]
                                    const containerIndex = newFields.findIndex(
                                      (f) => f.id === field.id
                                    )
                                    if (containerIndex !== -1) {
                                      const container = newFields[containerIndex]
                                      const children = [...(container.children || [])]
                                      const draggedChild = children[draggedIndex]
                                      children.splice(draggedIndex, 1)
                                      const dropIndex =
                                        childIndex > draggedIndex ? childIndex - 1 : childIndex
                                      children.splice(dropIndex, 0, draggedChild)
                                      newFields[containerIndex] = { ...container, children }
                                      setFormFields(newFields)
                                    }
                                  }
                                }}
                              >
                                <Form.Item
                                  label={childField.label}
                                  name={childField.id}
                                  rules={[
                                    {
                                      required: childField.required,
                                      message: `请填写${childField.label}`
                                    }
                                  ]}
                                  className="mb-0"
                                >
                                  {renderFormField(childField)}
                                </Form.Item>

                                {/* 容器内字段操作按钮 */}
                                <div className="absolute top-1 right-1 opacity-0 group-hover/child:opacity-100 transition-opacity flex space-x-1">
                                  <Button
                                    size="small"
                                    icon={<HolderOutlined />}
                                    className="drag-handle"
                                    onClick={(e) => e.stopPropagation()}
                                  />
                                  <Button
                                    size="small"
                                    danger
                                    icon={<DeleteOutlined />}
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      onDeleteField(childField.id, field.id)
                                    }}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center justify-center h-20 text-gray-400 empty-container">
                            <div className="text-center">
                              <DragOutlined className="text-2xl mb-1" />
                              <p className="text-sm">拖拽字段到此分区</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Form.Item
                        label={field.label}
                        name={field.id}
                        rules={[{ required: field.required, message: `请填写${field.label}` }]}
                        className="mb-0"
                      >
                        {renderFormField(field)}
                      </Form.Item>
                    )}

                    {/* 操作按钮 */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 field-actions">
                      <Space>
                        <Button
                          size="small"
                          icon={<HolderOutlined />}
                          className="drag-handle"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Button
                          size="small"
                          danger
                          icon={<DeleteOutlined />}
                          onClick={(e) => {
                            e.stopPropagation()
                            onDeleteField(field.id)
                          }}
                        />
                      </Space>
                    </div>
                  </div>
                ))}
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormDesigner
