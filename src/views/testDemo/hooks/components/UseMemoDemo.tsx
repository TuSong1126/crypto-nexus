import { useMemo, useState } from 'react'

export default function UseMemoDemo() {
  const [count, setCount] = useState(0)
  const double = useMemo(() => count * 2, [count])
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {double}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
