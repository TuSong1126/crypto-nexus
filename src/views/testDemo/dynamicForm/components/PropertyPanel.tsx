import { Button, Checkbox, Divider, Form, Input, Select } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'

import { WIDTH_OPTIONS } from '../constants'
import { PropertyPanelProps } from '../types'

const PropertyPanel: React.FC<PropertyPanelProps> = ({ field, onUpdate }) => {
  const [form] = useForm()

  const handleFieldChange = (changedValues: any) => {
    const updatedField = { ...field, ...changedValues }
    onUpdate(updatedField)
  }

  if (!field) return null

  return (
    <div className="h-full overflow-auto property-panel">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">属性配置</h3>
      <Form
        form={form}
        layout="vertical"
        initialValues={field}
        onValuesChange={handleFieldChange}
        className="property-form"
      >
        <Divider orientation="left" className="text-sm text-gray-500 mt-0">
          基本信息
        </Divider>

        <Form.Item label="字段标签" name="label">
          <Input placeholder="请输入字段标签" />
        </Form.Item>

        {field.type !== 'container' && (
          <Form.Item label="占位符" name="placeholder">
            <Input placeholder="请输入占位文本" />
          </Form.Item>
        )}

        <Form.Item label="字段宽度" name="width" className="width-selector">
          <Select>
            {WIDTH_OPTIONS.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Divider orientation="left" className="text-sm text-gray-500">
          显示设置
        </Divider>

        <Form.Item label="是否必填" name="required" valuePropName="checked">
          <Checkbox>必填</Checkbox>
        </Form.Item>

        <Form.Item label="是否显示" name="visible" valuePropName="checked">
          <Checkbox>显示</Checkbox>
        </Form.Item>

        {field.type === 'container' && (
          <>
            <Divider orientation="left" className="text-sm text-gray-500">
              分区设置
            </Divider>
            <Form.Item label="分区标题" name="containerTitle" className="container-title-field">
              <Input placeholder="请输入分区标题" />
            </Form.Item>
          </>
        )}

        {(field.type === 'select' || field.type === 'checkbox' || field.type === 'radio') && (
          <>
            <Divider orientation="left" className="text-sm text-gray-500">
              选项配置
            </Divider>
            <Form.Item label="选项列表" className="options-config">
              <div className="space-y-2">
                {field.options?.map((option, index) => (
                  <div key={index} className="flex space-x-2 option-item">
                    <Input
                      placeholder="选项标签"
                      value={option.label}
                      onChange={(e) => {
                        const newOptions = [...(field.options || [])]
                        newOptions[index] = { ...option, label: e.target.value }
                        onUpdate({ ...field, options: newOptions })
                      }}
                    />
                    <Input
                      placeholder="选项值"
                      value={option.value}
                      onChange={(e) => {
                        const newOptions = [...(field.options || [])]
                        newOptions[index] = { ...option, value: e.target.value }
                        onUpdate({ ...field, options: newOptions })
                      }}
                    />
                    <Button
                      danger
                      size="small"
                      className="remove-option-btn"
                      onClick={() => {
                        const newOptions = field.options?.filter((_, i) => i !== index)
                        onUpdate({ ...field, options: newOptions })
                      }}
                    >
                      删除
                    </Button>
                  </div>
                ))}
                <Button
                  type="dashed"
                  onClick={() => {
                    const newOptions = [
                      ...(field.options || []),
                      { label: '新选项', value: `option_${Date.now()}` }
                    ]
                    onUpdate({ ...field, options: newOptions })
                  }}
                  className="w-full add-option-btn"
                >
                  添加选项
                </Button>
              </div>
            </Form.Item>
          </>
        )}
      </Form>
    </div>
  )
}

export default PropertyPanel
