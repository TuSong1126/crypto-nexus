import { DragOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import React from 'react'

import { FIELD_TEMPLATES } from '../constants'
import { FieldLibraryProps } from '../types'

const FieldLibrary: React.FC<FieldLibraryProps> = ({ onDragStart, onDragEnd }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4 h-full overflow-auto field-library">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">字段库</h3>
      <div className="space-y-3">
        {FIELD_TEMPLATES.map((template) => (
          <Card
            key={template.id}
            size="small"
            className="cursor-move hover:shadow-md transition-all border border-gray-200 hover:border-blue-300 field-item"
            draggable
            onDragStart={() => onDragStart(template)}
            onDragEnd={onDragEnd}
          >
            <div className="flex items-center space-x-3">
              <DragOutlined className="text-gray-400" />
              <span className="text-sm font-medium">{template.label}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default FieldLibrary
