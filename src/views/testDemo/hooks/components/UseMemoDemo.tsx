import { useMemo, useState } from 'react'

function expensiveCalculation(num: number, type: string) {
  console.log('expensiveCalculation called---', type)
  let result = 0
  for (let i = 0; i < 10000; i++) {
    result += num
  }
  return result
}

export default function UseMemoDemo() {
  const [count, setCount] = useState(0)
  const [other, setOther] = useState(0)
  // 不用 useMemo，每次渲染都计算
  const normalResult = expensiveCalculation(count, 'normalResult')
  // 用 useMemo，只有 count 变化时才计算
  const memoResult = useMemo(() => expensiveCalculation(count, 'memoResult'), [count])

  return (
    <div>
      <p>Count: {count}</p>
      <p>Other: {other}</p>
      <p>Normal: {normalResult}</p>
      <p>useMemo: {memoResult}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <button onClick={() => setOther(other + 1)}>Increment Other</button>
    </div>
  )
}
