import { EChartsOption } from 'echarts'
import React from 'react'

import LazyChart from './LazyChart'

// IntersectionObserver 的底层实现依赖于浏览器的渲染管线、几何计算和异步任务调度。
// 它通过批量处理、异步回调和高效的交叉检测机制，提供了高性能的元素可见性监控功能。
// 开发者无需手动计算元素位置，浏览器会利用渲染树和事件循环自动完成这些工作，从而极大地简化了可见性相关的开发任务。

const App: React.FC = () => {
  const chartOptions: EChartsOption = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line'
      }
    ]
  }

  return (
    <div className="h-full overflow-auto">
      <h3>图表懒加载</h3>
      <div className="h-[1000px] bg-[#ededed]">长页面</div> {/* 模拟长页面 */}
      <LazyChart options={chartOptions} height="400px" />
    </div>
  )
}

export default App
