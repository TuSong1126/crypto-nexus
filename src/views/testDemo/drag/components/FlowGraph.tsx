import './FlowGraph.scss'

import { Cell, Edge, Graph, Node, Shape } from '@antv/x6'
import { Dnd } from '@antv/x6-plugin-dnd'
import { History } from '@antv/x6-plugin-history'
import { Keyboard } from '@antv/x6-plugin-keyboard'
import { Selection } from '@antv/x6-plugin-selection'
import { Snapline } from '@antv/x6-plugin-snapline'
import { Transform } from '@antv/x6-plugin-transform'
import React, { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

interface FlowGraphProps {
  onNodeSelected?: (node: Node) => void
  onEdgeSelected?: (edge: Edge) => void
  onSelectionChanged?: (selection: Cell[]) => void
  onGraphChanged?: () => void
  onInitialized?: (graph: Graph, dnd: Dnd) => void
}

const FlowGraph = forwardRef<any, FlowGraphProps>(
  ({ onNodeSelected, onEdgeSelected, onSelectionChanged, onGraphChanged, onInitialized }, ref) => {
    const graphContainerRef = useRef<HTMLDivElement>(null)
    const graphRef = useRef<Graph | null>(null)
    const dndRef = useRef<Dnd | null>(null)
    // 用于跟踪初始化回调是否已调用
    const hasCalledInitRef = useRef(false)

    // 初始化图表
    useEffect(() => {
      if (!graphContainerRef.current) return

      // 创建画布
      const graph = new Graph({
        container: graphContainerRef.current,
        width: 1000,
        height: 600,
        grid: {
          visible: true,
          type: 'mesh',
          size: 10,
          args: {
            color: '#cccccc',
            thickness: 1
          }
        },
        connecting: {
          router: 'manhattan',
          connector: {
            name: 'rounded',
            args: {
              radius: 8
            }
          },
          anchor: 'center',
          connectionPoint: 'anchor',
          allowBlank: false,
          snap: {
            radius: 20
          },
          createEdge() {
            return new Shape.Edge({
              attrs: {
                line: {
                  stroke: '#5F95FF',
                  strokeWidth: 1,
                  targetMarker: {
                    name: 'classic',
                    size: 8
                  }
                }
              },
              router: {
                name: 'manhattan'
              }
            })
          },
          validateConnection({ sourceView, targetView, sourceMagnet, targetMagnet }) {
            if (sourceView === targetView) {
              return false
            }
            if (!sourceMagnet) {
              return false
            }
            if (!targetMagnet) {
              return false
            }
            return true
          }
        },
        highlighting: {
          magnetAvailable: {
            name: 'stroke',
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 2,
                stroke: '#52c41a'
              }
            }
          },
          magnetAdsorbed: {
            name: 'stroke',
            args: {
              padding: 4,
              attrs: {
                strokeWidth: 2,
                stroke: '#1890ff'
              }
            }
          }
        },
        mousewheel: {
          enabled: true,
          zoomAtMousePosition: true,
          modifiers: 'ctrl',
          minScale: 0.5,
          maxScale: 3
        },
        panning: {
          enabled: true,
          modifiers: 'shift'
        }
      })

      // 注册插件
      graph.use(
        new History({
          enabled: true
        })
      )

      graph.use(
        new Snapline({
          enabled: true,
          sharp: true
        })
      )

      graph.use(
        new Selection({
          enabled: true,
          multiple: true,
          rubberband: true,
          movable: true,
          showNodeSelectionBox: true
        })
      )

      graph.use(
        new Keyboard({
          enabled: true,
          global: true
        })
      )

      graph.use(
        new Transform({
          resizing: {
            enabled: true
          },
          rotating: {
            enabled: true
          }
        })
      )

      // 创建 DND 实例
      let dnd = null
      try {
        // 确保容器元素存在
        if (!graphContainerRef.current) {
          throw new Error('图形容器元素不存在')
        }

        dnd = new Dnd({
          target: graph,
          scaled: false,
          animation: true,
          validateNode: () => true, // 确保节点验证总是通过
          containerParent: graphContainerRef.current, // 确保DND有正确的父容器
          getDragNode: (node) => {
            // 克隆节点以避免引用问题
            return node.clone()
          }
        })

        // 确保DND实例被正确初始化
        if (dnd) {
          console.log('DND实例创建成功', dnd)
        } else {
          throw new Error('DND实例创建失败')
        }
      } catch (error) {
        console.error('创建DND实例时出错:', error)
      }

      // 监听事件
      graph.on('node:click', ({ node }) => {
        onNodeSelected && onNodeSelected(node)
      })

      graph.on('edge:click', ({ edge }) => {
        onEdgeSelected && onEdgeSelected(edge)
      })

      graph.on('selection:changed', ({ selected }) => {
        onSelectionChanged && onSelectionChanged(selected)
      })

      graph.on('cell:change:*', () => {
        onGraphChanged && onGraphChanged()
      })

      // 快捷键
      graph.bindKey(['meta+c', 'ctrl+c'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.copy(cells)
        }
        return false
      })

      graph.bindKey(['meta+x', 'ctrl+x'], () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.cut(cells)
        }
        return false
      })

      graph.bindKey(['meta+v', 'ctrl+v'], () => {
        if (!graph.isClipboardEmpty()) {
          const cells = graph.paste({ offset: 32 })
          graph.cleanSelection()
          graph.select(cells)
        }
        return false
      })

      // undo/redo
      graph.bindKey(['meta+z', 'ctrl+z'], () => {
        if (graph.canUndo()) {
          graph.undo()
        }
        return false
      })

      graph.bindKey(['meta+shift+z', 'ctrl+shift+z'], () => {
        if (graph.canRedo()) {
          graph.redo()
        }
        return false
      })

      // delete
      graph.bindKey('delete', () => {
        const cells = graph.getSelectedCells()
        if (cells.length) {
          graph.removeCells(cells)
        }
      })

      // select all
      graph.bindKey(['meta+a', 'ctrl+a'], () => {
        const nodes = graph.getNodes()
        if (nodes) {
          graph.select(nodes)
        }
      })

      // 确保实例被正确赋值给ref
      graphRef.current = graph
      dndRef.current = dnd

      // 添加日志确认实例已被正确赋值
      console.log('Graph实例已赋值给graphRef:', graphRef.current)
      console.log('DND实例已赋值给dndRef:', dndRef.current)

      // 调用初始化完成回调 - 使用ref确保只调用一次
      if (onInitialized && graphRef.current && dndRef.current && !hasCalledInitRef.current) {
        console.log('调用onInitialized回调')
        onInitialized(graphRef.current, dndRef.current)
        hasCalledInitRef.current = true
      }

      // 确保在窗口大小变化时重新计算图形大小
      const resizeHandler = () => {
        if (graphContainerRef.current && graph) {
          const { width, height } = graphContainerRef.current.getBoundingClientRect()
          graph.resize(width, height)
        }
      }

      window.addEventListener('resize', resizeHandler)

      return () => {
        // 清理窗口大小变化监听器
        window.removeEventListener('resize', resizeHandler)
        // 清理DND实例
        if (dndRef.current) {
          dndRef.current = null
        }
        // 清理图形实例
        graph.dispose()
      }
    }, [])

    // 暴露给父组件的方法
    useImperativeHandle(
      ref,
      () => ({
        graph: graphRef.current,
        dnd: dndRef.current,
        container: graphContainerRef.current
      }),
      // 添加依赖项，确保当这些引用更新时，父组件能获取到最新值
      [graphRef.current, dndRef.current, graphContainerRef.current]
    )

    return <div className="flow-graph" ref={graphContainerRef} />
  }
)

FlowGraph.displayName = 'FlowGraph'

export default FlowGraph
