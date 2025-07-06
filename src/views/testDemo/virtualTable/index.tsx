import type { CellContext } from '@tanstack/react-table'
import { useMemo } from 'react'

import VirtualTable from './VirtualTable'

// 示例数据和列
const columns = [
  {
    header: 'ID',
    accessorKey: 'id',
    cell: (info: CellContext<any, any>) => info.getValue()
  },
  {
    header: '名称',
    accessorKey: 'name',
    cell: (info: CellContext<any, any>) => info.getValue()
  },
  {
    header: '数值',
    accessorKey: 'value',
    cell: (info: CellContext<any, any>) => info.getValue()
  }
]

export default function VirtualTableDemo() {
  // 生成大数据量
  const data = useMemo(
    () =>
      Array.from({ length: 10000 }, (_, i) => ({
        id: i + 1,
        name: `名称${i + 1}`,
        value: Math.floor(Math.random() * 10000)
      })),
    []
  )

  const handleEndReached = () => {
    // 这里可以触发加载更多
    console.log('滚动到底部了')
  }

  return (
    <div style={{ padding: 24 }}>
      <h3>虚拟滚动表格</h3>
      <div>基于react-window @tanstack/react-table</div>
      <hr />
      <VirtualTable
        columns={columns}
        data={data}
        rowHeight={40}
        height={400}
        onEndReached={handleEndReached}
      />
    </div>
  )
}
