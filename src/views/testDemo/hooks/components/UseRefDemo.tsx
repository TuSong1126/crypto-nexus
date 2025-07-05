import { useEffect, useRef, useState } from 'react'

// 获取dom元素示例
const Page1: React.FC = () => {
  const ref = useRef<HTMLInputElement>(null)

  const handleFocus = () => {
    ref.current?.focus()
  }

  return (
    <div>
      <input className="bg-[#ededed]" ref={ref} />
      <button onClick={handleFocus}>handleFocus</button>
    </div>
  )
}

// let old: number-------太low
// // 存储渲染周期之间的共享数据
// const Page2: React.FC = () => {
//   const [count, setCount] = useState(0)

//   const handleAdd = () => {
//     setCount((pre) => pre + 1)
//     old = count
//   }

//   return (
//     <div>
//       新值是：{count}
//       旧值是：{old}
//       <button onClick={handleAdd}>handleAdd</button>
//     </div>
//   )
// }

// 存储渲染周期之间的共享数据（和useState一样并不会重复初始化）
const Page2: React.FC = () => {
  // const [count, setCount] = useState(0)
  // const old = useRef<number>()

  // const handleAdd = () => {
  //   setCount((pre) => pre + 1)
  //   old.current = count
  // }

  // return (
  //   <div>
  //     新值是：{count}
  //     旧值是：{old.current}
  //     <button onClick={handleAdd}>handleAdd</button>
  //   </div>
  // )

  // 其实这样也行
  const [count, setCount] = useState(0)
  const [old, setOld] = useState(0)

  const handleAdd = () => {
    setCount((pre) => pre + 1)
    setOld(count)
  }

  return (
    <div>
      新值是：{count}
      旧值是：{old}
      <button onClick={handleAdd}>handleAdd</button>
    </div>
  )
}

// 【注意事项】ref.current 变化时不会造成组件的 rerender
const Page3: React.FC = () => {
  const [count, setCount] = useState(0)
  const time = useRef(Date.now())

  const updateTime = () => {
    time.current = Date.now()
    console.log(time.current)
  }

  console.log('组件重新渲染')

  return (
    <div>
      {count}
      <button onClick={() => setCount((pre) => pre + 1)}>Add</button>
      <button onClick={updateTime}>ref重新复制</button>
    </div>
  )
}

// 【注意事项】ref.current 不能作为其它 Hooks 的依赖项
const Page4: React.FC = () => {
  const [count, setCount] = useState(0)
  const time = useRef(Date.now())

  const updateTime = () => {
    time.current = Date.now()
    console.log(time.current)
  }

  console.log('组件重新渲染')

  useEffect(() => {
    // 实际上只会在初始渲染时打印
    console.log('useEffect')
  }, [time.current])

  return (
    <div>
      {count}
      <button onClick={() => setCount((pre) => pre + 1)}>Add</button>
      <button onClick={updateTime}>ref重新赋值</button>
    </div>
  )
}

export default Page4
