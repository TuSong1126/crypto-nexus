import * as echarts from 'echarts'
import React, { useEffect, useRef, useState } from 'react'

const LargeDataChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null)
  const chartInstanceRef = useRef<any>(null)
  const workerRef = useRef<Worker | null>(null)
  const bufferRef = useRef<number[]>([])
  const [chartData, setChartData] = useState<number[]>([])
  const [loading, setLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  // 初始化 ECharts 实例，只执行一次
  useEffect(() => {
    chartInstanceRef.current = echarts.init(chartRef.current!)
    chartInstanceRef.current.setOption({
      xAxis: { type: 'category', data: [] },
      yAxis: { type: 'value' },
      series: [{ type: 'line', data: [] }],
      animation: false
    })
    return () => {
      chartInstanceRef.current?.dispose()
    }
  }, [])

  // chartData 变化时只更新数据部分
  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.setOption(
        {
          xAxis: { data: chartData.map((_, i) => i) },
          series: [{ data: chartData }]
        },
        false
      )
    }
  }, [chartData])

  // WebWorker 处理大数据，批量更新 chartData
  useEffect(() => {
    workerRef.current = new Worker(new URL('./dataWorker.ts', import.meta.url))
    const largeData = Array.from({ length: 100000 }, (_, i) => i)
    workerRef.current.postMessage({ data: largeData, chunkSize: 10000 })
    const totalChunks = Math.ceil(largeData.length / 10000)
    let receivedChunks = 0

    workerRef.current.onmessage = (event) => {
      const { chunk, done } = event.data
      console.log('chunk, done', chunk, done)

      if (chunk) {
        bufferRef.current = bufferRef.current.concat(chunk)
        receivedChunks++
        setProgress(Math.floor((receivedChunks / totalChunks) * 100))
      }
      if (done) {
        setLoading(false)
        // 关闭webworker
        workerRef.current?.terminate()
      }
    }

    // 定时批量刷新 chartData
    const timer = setInterval(() => {
      if (bufferRef.current.length > 0) {
        setChartData((prev) => {
          const merged = [...prev, ...bufferRef.current]
          bufferRef.current = []
          return merged
        })
      }
    }, 200)

    return () => {
      clearInterval(timer)
      workerRef.current?.terminate()
    }
  }, [])

  return (
    <div style={{ width: '100%' }}>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />

      {loading && (
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom: 16
          }}
        >
          <div>数据加载中...（{progress}%）</div>
          <div style={{ width: 200, height: 8, background: '#eee', borderRadius: 4, marginTop: 8 }}>
            <div
              style={{
                width: `${progress}%`,
                height: '100%',
                background: '#6c5ce7',
                borderRadius: 4,
                transition: 'width 0.2s'
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default LargeDataChart
