import './PropertyPanel.scss'

import { Cell, Edge, Node } from '@antv/x6'
import { Button, Card, Collapse, ColorPicker, Form, Input, InputNumber, Select } from 'antd'
import React, { useEffect, useState } from 'react'

const { Panel } = Collapse
const { Option } = Select

interface PropertyPanelProps {
  selectedCell: Cell | null
  graph: any
  onPropertyChange?: (cell: Cell, propName: string, value: any) => void
}

const PropertyPanel: React.FC<PropertyPanelProps> = ({ selectedCell, graph, onPropertyChange }) => {
  const [form] = Form.useForm()
  const [cellType, setCellType] = useState<'node' | 'edge' | null>(null)
  const [nodeType, setNodeType] = useState<string>('')

  useEffect(() => {
    if (selectedCell) {
      if (selectedCell.isNode()) {
        setCellType('node')
        const data = selectedCell.getData() || {}
        setNodeType(data.type || '')
        form.setFieldsValue({
          id: selectedCell.id,
          label: data.title || '',
          width: selectedCell.getSize().width,
          height: selectedCell.getSize().height,
          x: selectedCell.getPosition().x,
          y: selectedCell.getPosition().y,
          ...data
        })
      } else if (selectedCell.isEdge()) {
        setCellType('edge')
        const data = selectedCell.getData() || {}
        form.setFieldsValue({
          id: selectedCell.id,
          label: data.label || '',
          source: selectedCell.getSourceCellId(),
          target: selectedCell.getTargetCellId(),
          strokeColor: selectedCell.attr('line/stroke') || '#5F95FF',
          strokeWidth: selectedCell.attr('line/strokeWidth') || 1,
          ...data
        })
      }
    } else {
      setCellType(null)
      setNodeType('')
      form.resetFields()
    }
  }, [selectedCell, form])

  const handleValuesChange = (changedValues: any) => {
    if (!selectedCell || !graph) return

    const key = Object.keys(changedValues)[0]
    const value = changedValues[key]

    if (cellType === 'node') {
      switch (key) {
        case 'label':
          selectedCell.setData({ ...selectedCell.getData(), title: value })
          break
        case 'width':
        case 'height':
          selectedCell.resize({
            width: key === 'width' ? value : selectedCell.getSize().width,
            height: key === 'height' ? value : selectedCell.getSize().height
          })
          break
        case 'x':
        case 'y':
          selectedCell.setPosition({
            x: key === 'x' ? value : selectedCell.getPosition().x,
            y: key === 'y' ? value : selectedCell.getPosition().y
          })
          break
        default:
          // 更新其他自定义属性
          const data = selectedCell.getData() || {}
          selectedCell.setData({ ...data, [key]: value })
      }
    } else if (cellType === 'edge') {
      switch (key) {
        case 'label':
          selectedCell.setData({ ...selectedCell.getData(), label: value })
          selectedCell.setLabels([{ position: 0.5, attrs: { text: { text: value } } }])
          break
        case 'strokeColor':
          selectedCell.attr('line/stroke', value)
          break
        case 'strokeWidth':
          selectedCell.attr('line/strokeWidth', value)
          break
        default:
          // 更新其他自定义属性
          const data = selectedCell.getData() || {}
          selectedCell.setData({ ...data, [key]: value })
      }
    }

    if (onPropertyChange) {
      onPropertyChange(selectedCell, key, value)
    }
  }

  const renderNodeProperties = () => {
    return (
      <>
        <Form.Item name="id" label="节点ID" disabled>
          <Input disabled />
        </Form.Item>

        <Form.Item name="label" label="节点名称">
          <Input />
        </Form.Item>

        <Form.Item name="type" label="节点类型" disabled>
          <Input disabled />
        </Form.Item>

        <Collapse defaultActiveKey={['position', 'size']}>
          <Panel header="位置" key="position">
            <Form.Item name="x" label="X坐标">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item name="y" label="Y坐标">
              <InputNumber style={{ width: '100%' }} />
            </Form.Item>
          </Panel>

          <Panel header="大小" key="size">
            <Form.Item name="width" label="宽度">
              <InputNumber style={{ width: '100%' }} min={50} />
            </Form.Item>

            <Form.Item name="height" label="高度">
              <InputNumber style={{ width: '100%' }} min={30} />
            </Form.Item>
          </Panel>

          {nodeType === 'form' && (
            <Panel header="表单属性" key="form">
              <Form.Item name="formId" label="表单ID">
                <Input />
              </Form.Item>
              <Form.Item name="formType" label="表单类型">
                <Select>
                  <Option value="basic">基础表单</Option>
                  <Option value="advanced">高级表单</Option>
                  <Option value="custom">自定义表单</Option>
                </Select>
              </Form.Item>
            </Panel>
          )}

          {nodeType === 'approval' && (
            <Panel header="审批属性" key="approval">
              <Form.Item name="approvalType" label="审批类型">
                <Select>
                  <Option value="single">单人审批</Option>
                  <Option value="multi">多人审批</Option>
                  <Option value="any">任意审批</Option>
                </Select>
              </Form.Item>
              <Form.Item name="approvers" label="审批人">
                <Select mode="multiple">
                  <Option value="user1">用户1</Option>
                  <Option value="user2">用户2</Option>
                  <Option value="user3">用户3</Option>
                </Select>
              </Form.Item>
            </Panel>
          )}

          {nodeType === 'process' && (
            <Panel header="流程属性" key="process">
              <Form.Item name="processType" label="流程类型">
                <Select>
                  <Option value="normal">普通流程</Option>
                  <Option value="parallel">并行流程</Option>
                  <Option value="serial">串行流程</Option>
                </Select>
              </Form.Item>
              <Form.Item name="timeout" label="超时时间(分钟)">
                <InputNumber style={{ width: '100%' }} min={0} />
              </Form.Item>
            </Panel>
          )}
        </Collapse>
      </>
    )
  }

  const renderEdgeProperties = () => {
    return (
      <>
        <Form.Item name="id" label="连线ID" disabled>
          <Input disabled />
        </Form.Item>

        <Form.Item name="label" label="连线名称">
          <Input />
        </Form.Item>

        <Form.Item name="source" label="源节点" disabled>
          <Input disabled />
        </Form.Item>

        <Form.Item name="target" label="目标节点" disabled>
          <Input disabled />
        </Form.Item>

        <Collapse defaultActiveKey={['style']}>
          <Panel header="样式" key="style">
            <Form.Item name="strokeColor" label="线条颜色">
              <ColorPicker />
            </Form.Item>

            <Form.Item name="strokeWidth" label="线条宽度">
              <InputNumber style={{ width: '100%' }} min={1} max={10} />
            </Form.Item>
          </Panel>

          <Panel header="条件" key="condition">
            <Form.Item name="condition" label="条件表达式">
              <Input.TextArea rows={3} />
            </Form.Item>

            <Form.Item name="priority" label="优先级">
              <InputNumber style={{ width: '100%' }} min={1} />
            </Form.Item>
          </Panel>
        </Collapse>
      </>
    )
  }

  return (
    <Card title="属性面板" className="property-panel">
      {selectedCell ? (
        <Form
          form={form}
          layout="vertical"
          onValuesChange={handleValuesChange}
          className="property-form"
        >
          {cellType === 'node' && renderNodeProperties()}
          {cellType === 'edge' && renderEdgeProperties()}
        </Form>
      ) : (
        <div className="no-selection">请选择一个节点或连线</div>
      )}
    </Card>
  )
}

export default PropertyPanel
