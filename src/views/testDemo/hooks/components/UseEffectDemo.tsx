import { useEffect, useState } from 'react'

export default function UseEffectDemo() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `Count: ${count}`
  }, [count])
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}
