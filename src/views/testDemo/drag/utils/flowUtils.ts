import { Cell, Edge, Graph, Node } from '@antv/x6'

// 验证流程图是否有效
export const validateFlow = (graph: Graph): { valid: boolean; errors: string[] } => {
  const errors: string[] = []
  const nodes = graph.getNodes()
  const edges = graph.getEdges()

  // 检查是否有节点
  if (nodes.length === 0) {
    errors.push('流程图中没有节点')
    return { valid: false, errors }
  }

  // 检查是否有边
  if (edges.length === 0) {
    errors.push('流程图中没有连线')
    return { valid: false, errors }
  }

  // 检查是否有孤立节点
  const isolatedNodes = nodes.filter((node) => {
    const connectedEdges = graph.getConnectedEdges(node)
    return connectedEdges.length === 0
  })

  if (isolatedNodes.length > 0) {
    errors.push(`存在 ${isolatedNodes.length} 个孤立节点`)
  }

  // 检查是否有开始节点和结束节点
  const startNodes = nodes.filter((node) => {
    const data = node.getData() || {}
    return data.title === '开始节点'
  })

  const endNodes = nodes.filter((node) => {
    const data = node.getData() || {}
    return data.title === '结束节点'
  })

  if (startNodes.length === 0) {
    errors.push('流程图中没有开始节点')
  }

  if (endNodes.length === 0) {
    errors.push('流程图中没有结束节点')
  }

  // 检查是否有环路
  const visited = new Set<string>()
  const path = new Set<string>()

  const hasCycle = (nodeId: string): boolean => {
    if (path.has(nodeId)) {
      return true
    }

    if (visited.has(nodeId)) {
      return false
    }

    visited.add(nodeId)
    path.add(nodeId)

    const outgoingEdges = graph.getOutgoingEdges(nodeId)
    for (const edge of outgoingEdges) {
      const targetId = edge.getTargetCellId() as string
      if (hasCycle(targetId)) {
        return true
      }
    }

    path.delete(nodeId)
    return false
  }

  for (const node of nodes) {
    if (!visited.has(node.id) && hasCycle(node.id)) {
      errors.push('流程图中存在环路')
      break
    }
  }

  return {
    valid: errors.length === 0,
    errors
  }
}

// 导出流程图为JSON
export const exportFlow = (graph: Graph): string => {
  const jsonData = graph.toJSON()
  return JSON.stringify(jsonData, null, 2)
}

// 导入流程图
export const importFlow = (graph: Graph, jsonString: string): boolean => {
  try {
    const jsonData = JSON.parse(jsonString)
    graph.fromJSON(jsonData)
    return true
  } catch (error) {
    console.error('导入流程图失败:', error)
    return false
  }
}

// 获取流程图的统计信息
export const getFlowStats = (graph: Graph) => {
  const nodes = graph.getNodes()
  const edges = graph.getEdges()

  // 按类型统计节点
  const nodeTypes = nodes.reduce<Record<string, number>>((acc, node) => {
    const data = node.getData() || {}
    const type = data.type || 'unknown'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, {})

  return {
    totalNodes: nodes.length,
    totalEdges: edges.length,
    nodeTypes
  }
}
