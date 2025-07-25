import './index.scss'

import { Cell, Edge, Graph, Node } from '@antv/x6'
import { Dnd } from '@antv/x6-plugin-dnd'
import { Layout, message, Modal } from 'antd'
import React, { useCallback, useRef, useState } from 'react'

import FlowGraph from './components/FlowGraph'
import NodePanel from './components/NodePanel'
import { registerCustomNode } from './components/nodes/CustomNodeRegistry'
import PropertyPanel from './components/PropertyPanel'
import Toolbar from './components/Toolbar'
import { createExampleFlow } from './utils/exampleFlow'
import { exportFlow, importFlow, validateFlow } from './utils/flowUtils'

// 立即注册自定义节点，确保在组件渲染前就已注册
registerCustomNode()

const { Header, Sider, Content } = Layout

const Page: React.FC = () => {
  const graphRef = useRef<any>(null)
  const [graph, setGraph] = useState<Graph | null>(null)
  const [dnd, setDnd] = useState<Dnd | null>(null)
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  // 处理节点选择
  const handleNodeSelected = (node: Node) => {
    setSelectedCell(node)
  }

  // 处理边选择
  const handleEdgeSelected = (edge: Edge) => {
    setSelectedCell(edge)
  }

  // 处理选择变化
  const handleSelectionChanged = (selection: Cell[]) => {
    if (selection.length === 1) {
      setSelectedCell(selection[0])
    } else {
      setSelectedCell(null)
    }
  }

  // 处理图形变化
  const handleGraphChanged = () => {
    // 可以在这里添加自动保存逻辑
  }

  // 处理属性变化
  const handlePropertyChange = (cell: Cell, propName: string, value: any) => {
    // 可以在这里添加额外的属性变更处理逻辑
    console.log(11111, cell, propName, value)
  }

  // 保存图形
  const handleSave = () => {
    if (graph) {
      // 验证流程图
      const { valid, errors } = validateFlow(graph)

      if (!valid) {
        Modal.warning({
          title: '流程图验证警告',
          content: (
            <div>
              <p>流程图存在以下问题：</p>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
              <p>是否仍要保存？</p>
            </div>
          ),
          okText: '继续保存',
          cancelText: '取消',
          onOk: () => {
            const jsonData = graph.toJSON()
            console.log('保存的图形数据:', jsonData)
            // 这里可以添加保存到服务器的逻辑
            message.success('保存成功')
          }
        })
      } else {
        const jsonData = graph.toJSON()
        console.log('保存的图形数据:', jsonData)
        // 这里可以添加保存到服务器的逻辑
        message.success('保存成功')
      }
    }
  }

  // 导出图形
  const handleExport = () => {
    if (graph) {
      const dataStr = exportFlow(graph)
      const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr)

      const exportFileDefaultName = `flow-chart-${new Date().getTime()}.json`

      const linkElement = document.createElement('a')
      linkElement.setAttribute('href', dataUri)
      linkElement.setAttribute('download', exportFileDefaultName)
      linkElement.click()

      message.success('导出成功')
    }
  }

  // 导入图形
  const handleImport = () => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = (e: any) => {
      const file = e.target.files[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (event: any) => {
          if (graph) {
            const success = importFlow(graph, event.target.result)
            if (success) {
              message.success('导入成功')

              // 验证导入的流程图
              const { valid, errors } = validateFlow(graph)
              if (!valid) {
                Modal.warning({
                  title: '流程图验证警告',
                  content: (
                    <div>
                      <p>导入的流程图存在以下问题：</p>
                      <ul>
                        {errors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  )
                })
              }
            } else {
              message.error('导入失败，文件格式错误')
            }
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  // 处理FlowGraph初始化完成 - 使用useCallback避免重复创建函数
  const handleFlowGraphInitialized = useCallback((graphInstance: Graph, dndInstance: Dnd) => {
    console.log('FlowGraph初始化完成回调触发')
    console.log('Graph实例获取：', graphInstance)
    console.log('DND实例获取：', dndInstance)

    // 设置状态
    setGraph(graphInstance)
    setDnd(dndInstance)

    console.log('Graph实例已设置到state:', graphInstance)
    console.log('DND实例已设置到state:', dndInstance)

    // 创建示例流程图
    createExampleFlow(graphInstance)
  }, []) // 空依赖数组，确保回调函数只创建一次

  return (
    <Layout className="flow-designer">
      <Header className="flow-designer-header">
        <div className="logo">流程设计器</div>
        <Toolbar
          graph={graph}
          onSave={handleSave}
          onExport={handleExport}
          onImport={handleImport}
        />
      </Header>
      <Layout>
        <Sider width={240} theme="light" className="flow-designer-sider left">
          <NodePanel dnd={dnd} />
        </Sider>
        <Content className="flow-designer-content">
          <FlowGraph
            ref={graphRef}
            onNodeSelected={handleNodeSelected}
            onEdgeSelected={handleEdgeSelected}
            onSelectionChanged={handleSelectionChanged}
            onGraphChanged={handleGraphChanged}
            onInitialized={handleFlowGraphInitialized}
          />
        </Content>
        <Sider width={300} theme="light" className="flow-designer-sider right">
          <PropertyPanel
            selectedCell={selectedCell}
            graph={graph}
            onPropertyChange={handlePropertyChange}
          />
        </Sider>
      </Layout>
    </Layout>
  )
}

export default Page
