import React, { useState } from 'react'

// 子组件，使用 React.memo 包裹
const Child = React.memo(({ count }: { count: number }) => {
  console.log('Child 渲染')
  return <div>子组件 count: {count}</div>
})

const ReactMemoDemo: React.FC = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>增加 count</button>
      <br />
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="输入任意内容"
        style={{ marginLeft: 8 }}
      />

      <Child count={count} />
      <div>父组件 text: {text}</div>
    </div>
  )
}

export default ReactMemoDemo
