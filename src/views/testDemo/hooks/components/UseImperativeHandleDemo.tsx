import { forwardRef, useImperativeHandle, useRef } from 'react'

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus()
  }))
  return <input ref={inputRef} placeholder="Click button to focus" />
})
FancyInput.displayName = 'FancyInput'

export default function UseImperativeHandleDemo() {
  const ref = useRef<{ focus: () => void }>(null)
  return (
    <div>
      <FancyInput ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus Input</button>
    </div>
  )
}
