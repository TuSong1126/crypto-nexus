import { useCallback, useState } from 'react'

export default function UseCallbackDemo() {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => setCount((c) => c + 1), [])
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  )
}
