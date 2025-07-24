import { Graph } from '@antv/x6'

// 创建示例流程图
export const createExampleFlow = (graph: Graph) => {
  // 创建节点
  const startNode = graph.addNode({
    shape: 'custom-node',
    x: 300,
    y: 100,
    data: {
      title: '开始节点',
      type: 'process'
    },
    ports: {
      items: [
        { id: 'start-port1', group: 'top' },
        { id: 'start-port2', group: 'right' },
        { id: 'start-port3', group: 'bottom' },
        { id: 'start-port4', group: 'left' }
      ]
    }
  })

  const formNode = graph.addNode({
    shape: 'custom-node',
    x: 300,
    y: 250,
    data: {
      title: '表单填写',
      type: 'form',
      formId: 'form-001',
      formType: 'basic'
    },
    ports: {
      items: [
        { id: 'form-port1', group: 'top' },
        { id: 'form-port2', group: 'right' },
        { id: 'form-port3', group: 'bottom' },
        { id: 'form-port4', group: 'left' }
      ]
    }
  })

  const approvalNode = graph.addNode({
    shape: 'custom-node',
    x: 300,
    y: 400,
    data: {
      title: '审批节点',
      type: 'approval',
      approvalType: 'single',
      approvers: ['user1']
    },
    ports: {
      items: [
        { id: 'approval-port1', group: 'top' },
        { id: 'approval-port2', group: 'right' },
        { id: 'approval-port3', group: 'bottom' },
        { id: 'approval-port4', group: 'left' }
      ]
    }
  })

  const endNode = graph.addNode({
    shape: 'custom-node',
    x: 300,
    y: 550,
    data: {
      title: '结束节点',
      type: 'process'
    },
    ports: {
      items: [
        { id: 'end-port1', group: 'top' },
        { id: 'end-port2', group: 'right' },
        { id: 'end-port3', group: 'bottom' },
        { id: 'end-port4', group: 'left' }
      ]
    }
  })

  // 创建边
  graph.addEdge({
    source: { cell: startNode.id, port: 'start-port3' },
    target: { cell: formNode.id, port: 'form-port1' },
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
    },
    data: {
      label: '开始流程'
    },
    labels: [
      {
        position: 0.5,
        attrs: {
          text: {
            text: '开始流程',
            fill: '#333',
            fontSize: 12
          },
          rect: {
            fill: '#fff',
            stroke: '#5F95FF',
            strokeWidth: 1,
            rx: 3,
            ry: 3
          }
        },
        padding: 5
      }
    ]
  })

  graph.addEdge({
    source: { cell: formNode.id, port: 'form-port3' },
    target: { cell: approvalNode.id, port: 'approval-port1' },
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
    },
    data: {
      label: '提交表单'
    },
    labels: [
      {
        position: 0.5,
        attrs: {
          text: {
            text: '提交表单',
            fill: '#333',
            fontSize: 12
          },
          rect: {
            fill: '#fff',
            stroke: '#5F95FF',
            strokeWidth: 1,
            rx: 3,
            ry: 3
          }
        },
        padding: 5
      }
    ]
  })

  graph.addEdge({
    source: { cell: approvalNode.id, port: 'approval-port3' },
    target: { cell: endNode.id, port: 'end-port1' },
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
    },
    data: {
      label: '审批通过'
    },
    labels: [
      {
        position: 0.5,
        attrs: {
          text: {
            text: '审批通过',
            fill: '#333',
            fontSize: 12
          },
          rect: {
            fill: '#fff',
            stroke: '#5F95FF',
            strokeWidth: 1,
            rx: 3,
            ry: 3
          }
        },
        padding: 5
      }
    ]
  })

  // 居中显示
  graph.centerContent()
}
