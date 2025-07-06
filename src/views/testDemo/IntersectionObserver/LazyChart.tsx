import type { ECharts, EChartsOption } from 'echarts'
import * as echarts from 'echarts'
import { debounce } from 'lodash' // 引入 lodash 的防抖函数
import React, { useEffect, useRef, useState } from 'react'

interface LazyChartProps {
  options: EChartsOption // 图表配置
  height?: string // 图表高度
  className?: string // 自定义类名
}

const LazyChart: React.FC<LazyChartProps> = ({ options, height = '400px', className }) => {
  const chartRef = useRef<HTMLDivElement>(null) // 图表容器引用
  const chartInstance = useRef<ECharts | null>(null) // 图表实例引用
  const [isVisible, setIsVisible] = useState(false) // 容器是否可见
  const observerRef = useRef<IntersectionObserver | null>(null)

  // 初始化图表
  const initChart = () => {
    if (chartRef.current && !chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current)
      chartInstance.current.setOption(options)
    }
  }

  // 销毁图表
  const disposeChart = () => {
    if (chartInstance.current) {
      chartInstance.current.dispose()
      chartInstance.current = null
    }
  }

  // 防抖处理 IntersectionObserver 回调
  const handleIntersection = debounce((entries: IntersectionObserverEntry[]) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        setIsVisible(true)
        await new Promise((resolve) => setTimeout(resolve, 0))
        initChart()
      } else {
        setIsVisible(false)
        disposeChart()
      }
    })
  }, 200)

  useEffect(() => {
    if (chartRef.current) {
      // 创建 IntersectionObserver 实例
      observerRef.current = new IntersectionObserver(handleIntersection, {
        root: null, // 使用视口作为根
        rootMargin: '0px', // 视口边缘扩展
        threshold: 0.1 // 10% 可见时触发
      })

      observerRef.current.observe(chartRef.current)
    }

    // 清理函数
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
      disposeChart()
    }
  }, [])

  // 当 options 更新时，重新设置图表配置
  useEffect(() => {
    if (isVisible && chartInstance.current) {
      chartInstance.current.setOption(options, true)
    }
  }, [options, isVisible])

  return (
    <div
      ref={chartRef}
      className={className}
      style={{ width: '100%', height, minHeight: '100px', border: '1px solid blue' }}
    >
      {!isVisible && <div style={{ textAlign: 'center', lineHeight: height }}>加载中...</div>}
    </div>
  )
}

export default LazyChart
