import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useCallback, useEffect, useRef } from 'react'
import { FixedSizeList as List, ListChildComponentProps } from 'react-window'

interface VirtualTableProps<T> {
  columns: ColumnDef<T, any>[]
  data: T[]
  rowHeight?: number
  height?: number
  onEndReached?: () => void
}

function VirtualTable<T extends object>({
  columns,
  data,
  rowHeight = 40,
  height = 400,
  onEndReached
}: VirtualTableProps<T>) {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
  const listRef = useRef<any>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!onEndReached || !endRef.current) return
    const observer = new window.IntersectionObserver(
      ([entry]) => entry.isIntersecting && onEndReached(),
      { root: listRef.current?.outerRef || null, threshold: 1 }
    )
    observer.observe(endRef.current)
    return () => observer.disconnect()
  }, [onEndReached])

  const Row = useCallback(
    ({ index, style }: ListChildComponentProps) => {
      const row = table.getRowModel().rows[index]
      return (
        <div style={{ ...style, display: 'flex' }} className="tr">
          {row.getVisibleCells().map((cell) => (
            <div
              key={cell.id}
              className="td"
              style={{ flex: 1, padding: '0 8px', borderBottom: '1px solid #eee' }}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      )
    },
    [table]
  )

  return (
    <div
      className="virtual-table"
      style={{ border: '1px solid #ddd', borderRadius: 4, overflow: 'hidden' }}
    >
      <div
        className="thead"
        style={{ display: 'flex', background: '#fafafa', borderBottom: '1px solid #eee' }}
      >
        {table.getHeaderGroups()[0].headers.map((header) => (
          <div
            key={header.id}
            className="th"
            style={{ flex: 1, padding: '8px 8px', fontWeight: 600 }}
          >
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        ))}
      </div>
      <List
        ref={listRef}
        height={height}
        itemCount={data.length}
        itemSize={rowHeight}
        width={'100%'}
      >
        {Row}
      </List>
      <div ref={endRef} style={{ height: 1 }} />
    </div>
  )
}

export default VirtualTable
