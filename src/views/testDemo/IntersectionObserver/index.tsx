import { EChartsOption } from 'echarts'
import React from 'react'

import LazyChart from './LazyChart'

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
