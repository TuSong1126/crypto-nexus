import './Toolbar.scss'
import '@antv/x6-react-components/es/toolbar/style/index.css'
import '@antv/x6-react-components/es/toolbar/style/index.css'

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
import { Toolbar } from '@antv/x6-react-components'
import React from 'react'

interface ToolbarProps {
  graph: Graph | null
  onSave?: () => void
  onExport?: () => void
  onImport?: () => void
}

const { Item, Group } = Toolbar

const CustomToolbar: React.FC<ToolbarProps> = ({ graph, onSave, onExport, onImport }) => {
  const onClick = (name: string) => {
    if (!graph) return

    // switch (name) {
    //   case 'zoomIn':
    //     const zoom = graph.zoom()
    //     if (zoom < 2) {
    //       graph.zoom(zoom + 0.1)
    //     }
    //     break
    //   case 'zoomOut':
    //     const currentZoom = graph.zoom()
    //     if (currentZoom > 0.5) {
    //       graph.zoom(currentZoom - 0.1)
    //     }
    //     break
    //   case 'zoomReset':
    //     graph.zoom(1)
    //     break
    //   case 'undo':
    //     if (graph.canUndo()) {
    //       graph.undo()
    //     }
    //     break
    //   case 'redo':
    //     if (graph.canRedo()) {
    //       graph.redo()
    //     }
    //     break
    //   case 'delete':
    //     const cells = graph.getSelectedCells()
    //     if (cells.length) {
    //       graph.removeCells(cells)
    //     }
    //     break
    //   case 'copy':
    //     const copyCells = graph.getSelectedCells()
    //     if (copyCells.length) {
    //       graph.copy(copyCells)
    //     }
    //     break
    //   case 'cut':
    //     const cutCells = graph.getSelectedCells()
    //     if (cutCells.length) {
    //       graph.cut(cutCells)
    //     }
    //     break
    //   case 'paste':
    //     if (!graph.isClipboardEmpty()) {
    //       const cells = graph.paste({ offset: 32 })
    //       graph.cleanSelection()
    //       graph.select(cells)
    //     }
    //     break
    //   case 'alignLeft':
    //     const leftCells = graph.getSelectedCells()
    //     if (leftCells.length > 1) {
    //       graph.alignCells('left', leftCells)
    //     }
    //     break
    //   case 'alignCenter':
    //     const centerCells = graph.getSelectedCells()
    //     if (centerCells.length > 1) {
    //       graph.alignCells('center', centerCells)
    //     }
    //     break
    //   case 'alignRight':
    //     const rightCells = graph.getSelectedCells()
    //     if (rightCells.length > 1) {
    //       graph.alignCells('right', rightCells)
    //     }
    //     break
    //   case 'alignTop':
    //     const topCells = graph.getSelectedCells()
    //     if (topCells.length > 1) {
    //       graph.alignCells('top', topCells)
    //     }
    //     break
    //   case 'alignMiddle':
    //     const middleCells = graph.getSelectedCells()
    //     if (middleCells.length > 1) {
    //       graph.alignCells('middle', middleCells)
    //     }
    //     break
    //   case 'alignBottom':
    //     const bottomCells = graph.getSelectedCells()
    //     if (bottomCells.length > 1) {
    //       graph.alignCells('bottom', bottomCells)
    //     }
    //     break
    //   case 'save':
    //     onSave?.()
    //     break
    //   case 'export':
    //     onExport?.()
    //     break
    //   case 'import':
    //     onImport?.()
    //     break
    // }
  }

  return (
    <Toolbar onClick={onClick} hoverEffect>
      <Group>
        <Item name="zoomIn" tooltip="放大 (Cmd +)" icon={<ZoomInOutlined />} />
        <Item name="zoomOut" tooltip="缩小 (Cmd -)" icon={<ZoomOutOutlined />} />
        <Item name="zoomReset" tooltip="重置缩放" text="1:1" />
      </Group>

      <Group>
        <Item
          name="undo"
          tooltip="撤销 (Cmd + Z)"
          icon={<UndoOutlined />}
          disabled={!graph?.canUndo()}
        />
        <Item
          name="redo"
          tooltip="重做 (Cmd + Shift + Z)"
          icon={<RedoOutlined />}
          disabled={!graph?.canRedo()}
        />
      </Group>

      <Group>
        <Item
          name="delete"
          tooltip="删除 (Delete)"
          icon={<DeleteOutlined />}
          disabled={!graph || graph.getSelectedCells().length === 0}
        />
      </Group>

      <Group>
        <Item
          name="copy"
          tooltip="复制 (Cmd + C)"
          icon={<CopyOutlined />}
          disabled={!graph || graph.getSelectedCells().length === 0}
        />
        <Item
          name="cut"
          tooltip="剪切 (Cmd + X)"
          icon={<ScissorOutlined />}
          disabled={!graph || graph.getSelectedCells().length === 0}
        />
        {/* <Item
          name="paste"
          tooltip="粘贴 (Cmd + V)"
          icon={<SnippetsOutlined />}
          disabled={!graph || graph.isClipboardEmpty()}
        /> */}
      </Group>

      <Group>
        <Item
          name="alignLeft"
          tooltip="左对齐"
          icon={<AlignLeftOutlined />}
          disabled={!graph || graph.getSelectedCells().length <= 1}
        />
        <Item
          name="alignCenter"
          tooltip="水平居中"
          icon={<AlignCenterOutlined />}
          disabled={!graph || graph.getSelectedCells().length <= 1}
        />
        <Item
          name="alignRight"
          tooltip="右对齐"
          icon={<AlignRightOutlined />}
          disabled={!graph || graph.getSelectedCells().length <= 1}
        />
      </Group>

      <Group>
        <Item
          name="alignTop"
          tooltip="顶部对齐"
          icon={<VerticalAlignTopOutlined />}
          disabled={!graph || graph.getSelectedCells().length <= 1}
        />
        <Item
          name="alignMiddle"
          tooltip="垂直居中"
          icon={<VerticalAlignMiddleOutlined />}
          disabled={!graph || graph.getSelectedCells().length <= 1}
        />
        <Item
          name="alignBottom"
          tooltip="底部对齐"
          icon={<VerticalAlignBottomOutlined />}
          disabled={!graph || graph.getSelectedCells().length <= 1}
        />
      </Group>

      <Group>
        <Item name="save" tooltip="保存" icon={<SaveOutlined />} />
        <Item name="export" tooltip="导出" icon={<DownloadOutlined />} />
        <Item name="import" tooltip="导入" icon={<UploadOutlined />} />
      </Group>
    </Toolbar>
  )
}

export default CustomToolbar
