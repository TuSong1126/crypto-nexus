import { forwardRef, useImperativeHandle, useRef } from 'react'

// 1. 配合forwardRef使用---src/views/testDemo/hooks/components/ForwardRefDemo.tsx
// 2.【特别注意】 useImperativeHandle 的第三个参数，类似于useEffect的deps,作用也一致，[]仅在第一次初始化时加载
//   useImperativeHandle(ref, createHandle, [deps])

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
