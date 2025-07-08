import React, { useImperativeHandle, useRef, useState } from 'react'

// ref 的作用是获取实例，但由于函数组件不存在实例，因此无法通过 ref 获取函数组件的实例引用。
// 而 React.forwardRef 就是用来解决这个问题的。
// React.forwardRef 会创建一个 React 组件，这个组件能够将其接收到的 ref 属性转发到自己的组件树。

const Child: React.FC = () => {
  const [count, setCount] = useState(0)
  const add = (num: number) => {
    setCount((pre) => pre + num)
  }
  return (
    <>
      count: {count}
      <div onClick={() => add(-1)}>-1</div>
      <div onClick={() => add(1)}>+1</div>
    </>
  )
}

// const ChildAAA: React.ForwardRefExoticComponent<React.RefAttributes<unknown>>
const ChildAAA = React.forwardRef((_props, ref) => {
  const [count, setCount] = useState(0)
  const add = (num: number) => {
    setCount((pre) => pre + num)
  }

  // 导出的内容给父组件
  useImperativeHandle(ref, () => ({
    count,
    add
  }))

  return (
    <>
      count: {count}
      <div onClick={() => add(-1)}>-1</div>
      <div onClick={() => add(1)}>+1</div>
    </>
  )
})
ChildAAA.displayName = 'ChildAAA'

const Page: React.FC = () => {
  const childRef = useRef<{ count: number; add: (num: number) => void }>()

  const handleShow = () => {
    // 拿到子组件通过useImperativeHandle向外暴露的内容
    console.log(1111, childRef.current)
  }

  return (
    <>
      <button onClick={handleShow}>show-Ref</button>
      <h1>Page...</h1>
      {/* 直接报错： 
      Warning: Function components cannot be given refs. Attempts to access this ref will
      fail. Did you mean to use React.forwardRef()? */}
      {/* <Child ref={childRef} /> */}

      <ChildAAA ref={childRef} />
    </>
  )
}

export default Page
