import './CustomNode.scss'

import { Node } from '@antv/x6'
import React from 'react'

interface CustomNodeProps {
  node?: Node
  title: string
  type: string
  icon?: React.ReactNode
  ports?: { id: string; group: string }[]
}

export const CustomNodeComponent: React.FC<CustomNodeProps> = (props) => {
  // 从node.data中获取数据，或者直接使用props中的数据
  const node = props.node
  const data = node?.getData() || {}
  const title = data.title || props.title || '未命名节点'
  const type = data.type || props.type || 'process'
  const icon = data.icon || props.icon
  return (
    <div className={`custom-node custom-node-${type}`}>
      <div className="custom-node-header">
        {icon && <div className="custom-node-icon">{icon}</div>}
        <div className="custom-node-title">{title}</div>
      </div>
      <div className="custom-node-body">
        <div className="custom-node-content">
          {type === 'form' && <div className="form-indicator" />}
          {type === 'approval' && <div className="approval-indicator" />}
          {type === 'process' && <div className="process-indicator" />}
          {type === 'condition' && <div className="condition-indicator" />}
          {type === 'subprocess' && <div className="subprocess-indicator" />}
          {type === 'trigger' && <div className="trigger-indicator" />}
        </div>
      </div>
    </div>
  )
}
