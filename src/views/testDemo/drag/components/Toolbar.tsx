import './Toolbar.scss'

import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  CopyOutlined,
  DeleteOutlined,
  DownloadOutlined,
  RedoOutlined,
  SaveOutlined,
  ScissorOutlined,
  SnippetsOutlined,
  UndoOutlined,
  UploadOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignMiddleOutlined,
  VerticalAlignTopOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from '@ant-design/icons'
import { Graph } from '@antv/x6'
import { Button, Divider, Space, Tooltip } from 'antd'
import React from 'react'

interface ToolbarProps {
  graph: Graph | null
  onSave?: () => void
  onExport?: () => void
  onImport?: () => void
}

const Toolbar: React.FC<ToolbarProps> = ({ graph, onSave, onExport, onImport }) => {
  // 缩放操作
  const handleZoomIn = () => {
    if (graph) {
      const zoom = graph.zoom()
      if (zoom < 2) {
        graph.zoom(zoom + 0.1)
      }
    }
  }

  const handleZoomOut = () => {
    if (graph) {
      const zoom = graph.zoom()
      if (zoom > 0.5) {
        graph.zoom(zoom - 0.1)
      }
    }
  }

  const handleZoomReset = () => {
    if (graph) {
      graph.zoom(1)
    }
  }

  // 撤销/重做
  const handleUndo = () => {
    if (graph && graph.canUndo()) {
      graph.undo()
    }
  }

  const handleRedo = () => {
    if (graph && graph.canRedo()) {
      graph.redo()
    }
  }

  // 删除选中元素
  const handleDelete = () => {
    if (graph) {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.removeCells(cells)
      }
    }
  }

  // 复制/剪切/粘贴
  const handleCopy = () => {
    if (graph) {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.copy(cells)
      }
    }
  }

  const handleCut = () => {
    if (graph) {
      const cells = graph.getSelectedCells()
      if (cells.length) {
        graph.cut(cells)
      }
    }
  }

  const handlePaste = () => {
    if (graph && !graph.isClipboardEmpty()) {
      const cells = graph.paste({ offset: 32 })
      graph.cleanSelection()
      graph.select(cells)
    }
  }

  // 对齐操作
  const handleAlignLeft = () => {
    if (graph) {
      const cells = graph.getSelectedCells()
      if (cells.length > 1) {
        graph.alignCells('left', cells)
      }
    }
  }

  const handleAlignCenter = () => {
    if (graph) {
      const cells = graph.getSelectedCells()
      if (cells.length > 1) {
        graph.alignCells('center', cells)
      }
    }
  }

  const handleAlignRight = () => {
    if (graph) {
      const cells = graph.getSelectedCells()
      if (cells.length > 1) {
        graph.alignCells('right', cells)
      }
    }
  }

  const handleAlignTop = () => {
    if (graph) {
      const cells = graph.getSelectedCells()
      if (cells.length > 1) {
        graph.alignCells('top', cells)
      }
    }
  }

  const handleAlignMiddle = () => {
    if (graph) {
      const cells = graph.getSelectedCells()
      if (cells.length > 1) {
        graph.alignCells('middle', cells)
      }
    }
  }

  const handleAlignBottom = () => {
    if (graph) {
      const cells = graph.getSelectedCells()
      if (cells.length > 1) {
        graph.alignCells('bottom', cells)
      }
    }
  }

  return (
    <div className="toolbar">
      <Space>
        <Tooltip title="放大">
          <Button icon={<ZoomInOutlined />} onClick={handleZoomIn} />
        </Tooltip>
        <Tooltip title="缩小">
          <Button icon={<ZoomOutOutlined />} onClick={handleZoomOut} />
        </Tooltip>
        <Tooltip title="重置缩放">
          <Button onClick={handleZoomReset}>1:1</Button>
        </Tooltip>

        <Divider type="vertical" />

        <Tooltip title="撤销">
          <Button
            icon={<UndoOutlined />}
            onClick={handleUndo}
            disabled={graph ? !graph.canUndo() : true}
          />
        </Tooltip>
        <Tooltip title="重做">
          <Button
            icon={<RedoOutlined />}
            onClick={handleRedo}
            disabled={graph ? !graph.canRedo() : true}
          />
        </Tooltip>

        <Divider type="vertical" />

        <Tooltip title="删除">
          <Button
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            disabled={graph ? graph.getSelectedCells().length === 0 : true}
          />
        </Tooltip>

        <Divider type="vertical" />

        <Tooltip title="复制">
          <Button
            icon={<CopyOutlined />}
            onClick={handleCopy}
            disabled={graph ? graph.getSelectedCells().length === 0 : true}
          />
        </Tooltip>
        <Tooltip title="剪切">
          <Button
            icon={<ScissorOutlined />}
            onClick={handleCut}
            disabled={graph ? graph.getSelectedCells().length === 0 : true}
          />
        </Tooltip>
        <Tooltip title="粘贴">
          <Button
            icon={<SnippetsOutlined />}
            onClick={handlePaste}
            disabled={graph ? graph.isClipboardEmpty() : true}
          />
        </Tooltip>

        <Divider type="vertical" />

        <Tooltip title="左对齐">
          <Button
            icon={<AlignLeftOutlined />}
            onClick={handleAlignLeft}
            disabled={graph ? graph.getSelectedCells().length <= 1 : true}
          />
        </Tooltip>
        <Tooltip title="水平居中">
          <Button
            icon={<AlignCenterOutlined />}
            onClick={handleAlignCenter}
            disabled={graph ? graph.getSelectedCells().length <= 1 : true}
          />
        </Tooltip>
        <Tooltip title="右对齐">
          <Button
            icon={<AlignRightOutlined />}
            onClick={handleAlignRight}
            disabled={graph ? graph.getSelectedCells().length <= 1 : true}
          />
        </Tooltip>

        <Divider type="vertical" />

        <Tooltip title="顶部对齐">
          <Button
            icon={<VerticalAlignTopOutlined />}
            onClick={handleAlignTop}
            disabled={graph ? graph.getSelectedCells().length <= 1 : true}
          />
        </Tooltip>
        <Tooltip title="垂直居中">
          <Button
            icon={<VerticalAlignMiddleOutlined />}
            onClick={handleAlignMiddle}
            disabled={graph ? graph.getSelectedCells().length <= 1 : true}
          />
        </Tooltip>
        <Tooltip title="底部对齐">
          <Button
            icon={<VerticalAlignBottomOutlined />}
            onClick={handleAlignBottom}
            disabled={graph ? graph.getSelectedCells().length <= 1 : true}
          />
        </Tooltip>

        <Divider type="vertical" />

        <Tooltip title="保存">
          <Button icon={<SaveOutlined />} onClick={onSave} type="primary" />
        </Tooltip>
        <Tooltip title="导出">
          <Button icon={<DownloadOutlined />} onClick={onExport} />
        </Tooltip>
        <Tooltip title="导入">
          <Button icon={<UploadOutlined />} onClick={onImport} />
        </Tooltip>
      </Space>
    </div>
  )
}

export default Toolbar
