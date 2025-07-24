import './NodePanel.scss'

import { Dnd } from '@antv/x6-plugin-dnd'
import { Card, Divider } from 'antd'
import React from 'react'

import { createCustomNode } from './nodes/CustomNodeRegistry'

interface NodePanelProps {
  dnd: Dnd | null
}

const NodePanel: React.FC<NodePanelProps> = ({ dnd }) => {
  const startDrag = (e: React.MouseEvent<HTMLDivElement>, type: string, title: string) => {
    console.log('开始拖拽', type, title, dnd) // 添加日志

    if (!dnd) {
      console.error('DND实例不存在，无法开始拖拽') // 添加错误日志
      return
    }

    try {
      // 阻止默认事件，防止干扰拖拽
      e.preventDefault()

      // 创建自定义节点
      const node = createCustomNode({
        title,
        type,
        x: 0,
        y: 0,
        ports: [
          { id: 'port1', group: 'top' },
          { id: 'port2', group: 'right' },
          { id: 'port3', group: 'bottom' },
          { id: 'port4', group: 'left' }
        ]
      })

      // 确保事件对象存在
      if (!e || !e.nativeEvent) {
        console.error('事件对象不存在，无法开始拖拽')
        return
      }

      // 直接启动拖拽，不使用延迟
      try {
        // 启动拖拽
        dnd.start(node, e.nativeEvent)
        console.log('拖拽已启动', node)
      } catch (innerError) {
        console.error('拖拽启动失败', innerError)
      }
    } catch (error) {
      console.error('拖拽启动失败', error) // 添加错误捕获
    }
  }

  return (
    <Card title="节点面板" className="node-panel">
      <div className="node-panel-content">
        <Divider orientation="left">基础节点</Divider>
        <div className="node-item-container">
          <div
            className="node-item node-item-process"
            onMouseDown={(e) => startDrag(e, 'process', '流程节点')}
          >
            <div className="node-item-icon">
              <div className="process-icon" />
            </div>
            <div className="node-item-label">流程节点</div>
          </div>

          <div
            className="node-item node-item-form"
            onMouseDown={(e) => startDrag(e, 'form', '表单节点')}
          >
            <div className="node-item-icon">
              <div className="form-icon" />
            </div>
            <div className="node-item-label">表单节点</div>
          </div>

          <div
            className="node-item node-item-approval"
            onMouseDown={(e) => startDrag(e, 'approval', '审批节点')}
          >
            <div className="node-item-icon">
              <div className="approval-icon" />
            </div>
            <div className="node-item-label">审批节点</div>
          </div>
        </div>

        <Divider orientation="left">高级节点</Divider>
        <div className="node-item-container">
          <div
            className="node-item node-item-condition"
            onMouseDown={(e) => startDrag(e, 'condition', '条件节点')}
          >
            <div className="node-item-icon">
              <div className="condition-icon" />
            </div>
            <div className="node-item-label">条件节点</div>
          </div>

          <div
            className="node-item node-item-subprocess"
            onMouseDown={(e) => startDrag(e, 'subprocess', '子流程')}
          >
            <div className="node-item-icon">
              <div className="subprocess-icon" />
            </div>
            <div className="node-item-label">子流程</div>
          </div>

          <div
            className="node-item node-item-trigger"
            onMouseDown={(e) => startDrag(e, 'trigger', '触发器')}
          >
            <div className="node-item-icon">
              <div className="trigger-icon" />
            </div>
            <div className="node-item-label">触发器</div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default NodePanel
