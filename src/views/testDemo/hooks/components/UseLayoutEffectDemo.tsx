import { useEffect, useLayoutEffect, useState } from 'react'

const Page: React.FC = () => {
  const [count, setCount] = useState(Math.random() * 1000)

  // 会闪烁抖动(因为是在组件渲染完成后执行，点击重置为0，组件开始重新渲染为0，然后在执行useEffect再赋值)
  // useEffect(() => {
  //   console.log('useEffect执行了')
  //   if (count === 0) {
  //     setCount(Math.random() * 1000)
  //   }
  // })

  // 不会抖动，因为是在组件开始渲染后执行
  useLayoutEffect(() => {
    console.log('useLayoutEffect执行了')
    if (count === 0) {
      setCount(Math.random() * 1000)
    }
  })

  return (
    <>
      <div>{count}</div>
      <button onClick={() => setCount(0)}>重置为0</button>
    </>
  )
}

export default Page
