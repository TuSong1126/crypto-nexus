import { Button, Drawer, Form, message } from 'antd'
import { useForm } from 'antd/es/form/Form'
import React from 'react'

import { PreviewDrawerProps } from '../types'

const PreviewDrawer: React.FC<PreviewDrawerProps> = ({
  visible,
  onClose,
  formFields,
  renderFormField
}) => {
  const [form] = useForm()

  const handleSubmit = (values: any) => {
    message.success('表单提交成功！')
    console.log('表单数据:', values)
  }

  // 重置表单
  const resetForm = () => {
    form.resetFields()
  }

  return (
    <Drawer
      title="表单预览"
      placement="right"
      size="large"
      open={visible}
      onClose={onClose}
      styles={{ body: { padding: '24px' } }}
      className="preview-drawer"
    >
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="preview-form">
          <div className="flex flex-wrap gap-4">
            {formFields.map((field) => {
              if (!field.visible) return null

              if (field.type === 'container' && field.children && field.children.length > 0) {
                return (
                  <div
                    key={field.id}
                    className={`${
                      field.width === 'full'
                        ? 'w-full'
                        : field.width === 'half'
                          ? 'w-1/2'
                          : field.width === 'third'
                            ? 'w-1/3'
                            : 'w-1/4'
                    } pr-2 mb-4 mb-6 preview-container`}
                  >
                    <div className="font-medium text-gray-700 mb-3 pb-2 border-b container-title">
                      {field.containerTitle || '分区标题'}
                    </div>
                    <div className="flex flex-wrap gap-4 container-content">
                      {field.children.map(
                        (childField) =>
                          childField.visible && (
                            <div
                              key={childField.id}
                              className={`${
                                childField.width === 'full'
                                  ? 'w-full'
                                  : childField.width === 'half'
                                    ? 'w-1/2'
                                    : childField.width === 'third'
                                      ? 'w-1/3'
                                      : 'w-1/4'
                              } pr-2`}
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
                                initialValue={childField.defaultValue}
                              >
                                {renderFormField(childField)}
                              </Form.Item>
                            </div>
                          )
                      )}
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={field.id}
                  className={`${
                    field.width === 'full'
                      ? 'w-full'
                      : field.width === 'half'
                        ? 'w-1/2'
                        : field.width === 'third'
                          ? 'w-1/3'
                          : 'w-1/4'
                  } pr-2 mb-4`}
                >
                  <Form.Item
                    label={field.label}
                    name={field.id}
                    rules={[{ required: field.required, message: `请填写${field.label}` }]}
                    initialValue={field.defaultValue}
                  >
                    {renderFormField(field)}
                  </Form.Item>
                </div>
              )
            })}
          </div>
          <div className="flex space-x-4 mt-6">
            <Form.Item className="flex-1 mb-0">
              <Button type="default" onClick={resetForm} className="w-full">
                重置表单
              </Button>
            </Form.Item>
            <Form.Item className="flex-1 mb-0">
              <Button type="primary" htmlType="submit" className="w-full">
                提交表单
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Drawer>
  )
}

export default PreviewDrawer
