import { useDebugValue, useState } from 'react'

function useCustomHook(val: string) {
  useDebugValue(val ? 'Has value' : 'Empty')
  return val
}

export default function UseDebugValueDemo() {
  const [value, setValue] = useState('')
  useCustomHook(value)
  return (
    <div>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something"
      />
    </div>
  )
}
