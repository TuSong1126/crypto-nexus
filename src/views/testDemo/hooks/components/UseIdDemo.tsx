import { useId } from 'react'

export default function UseIdDemo() {
  const id = useId()
  return (
    <div>
      <label htmlFor={id}>Input with useId:</label>
      <input id={id} />
    </div>
  )
}
