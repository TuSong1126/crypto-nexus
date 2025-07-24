import './CustomNode.scss'

import { Node } from '@antv/x6'
import { ReactShape, register } from '@antv/x6-react-shape'

import { CustomNodeComponent } from './CustomNodeComponent'

// 注册自定义节点
export const registerCustomNode = () => {
  // 检查自定义节点是否已注册
  try {
    if (Node.registry.exist('custom-node')) {
      console.log('自定义节点已注册，无需重复注册')
      return
    }
  } catch (error) {
    console.error('检查节点注册状态时出错:', error)
  }

  register({
    shape: 'custom-node',
    width: 180,
    height: 80,
    component: CustomNodeComponent, // 需要添加component属性
    ports: {
      groups: {
        top: {
          position: 'top',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#1890ff',
              strokeWidth: 1,
              fill: '#fff'
            }
          }
        },
        right: {
          position: 'right',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#1890ff',
              strokeWidth: 1,
              fill: '#fff'
            }
          }
        },
        bottom: {
          position: 'bottom',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#1890ff',
              strokeWidth: 1,
              fill: '#fff'
            }
          }
        },
        left: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: '#1890ff',
              strokeWidth: 1,
              fill: '#fff'
            }
          }
        }
      }
    }
  })
}

// 创建自定义节点
export const createCustomNode = ({
  title,
  type,
  x,
  y,
  ports = []
}: {
  title: string
  type: string
  x: number
  y: number
  ports?: { id: string; group: string }[]
}) => {
  // 确保自定义节点已注册
  try {
    if (!Node.registry.exist('custom-node')) {
      console.log('自定义节点未注册，正在注册...')
      registerCustomNode()
    }
  } catch (error) {
    console.error('检查节点注册状态时出错，尝试强制注册:', error)
    registerCustomNode()
  }

  try {
    const node = new ReactShape({
      shape: 'custom-node',
      x,
      y,
      width: 180, // 确保宽度与注册时一致
      height: 80, // 确保高度与注册时一致
      data: {
        title,
        type,
        icon: type // 使用type作为icon
      }
    })

    console.log('自定义节点创建成功', node)

    // 添加端口
    if (ports && ports.length > 0) {
      ports.forEach((port) => {
        node.addPort(port)
      })
    }

    return node
  } catch (error) {
    console.error('创建自定义节点失败', error)
    throw error
  }
}
