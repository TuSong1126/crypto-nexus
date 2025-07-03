import { useDeferredValue, useState } from 'react'

export default function UseDeferredValueDemo() {
  const [value, setValue] = useState('')
  const deferredValue = useDeferredValue(value)
  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Type here" />
      <div>Deferred Value: {deferredValue}</div>
    </div>
  )
}
