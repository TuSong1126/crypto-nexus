import { useState, useTransition } from 'react'

export default function UseTransitionDemo() {
  const [isPending, startTransition] = useTransition()
  const [value, setValue] = useState('')
  return (
    <div>
      <input
        value={value}
        onChange={(e) => {
          startTransition(() => setValue(e.target.value))
        }}
        placeholder="Type here"
      />
      {isPending && <span>Loading...</span>}
    </div>
  )
}
