import { useEffect, useState } from 'react'

// 常规使用
const Page1: React.FC = () => {
  const [count, setCount] = useState(0)

  // 每次都执行
  useEffect(() => {
    console.log(111111, count)
  })

  // 仅在 count 改变时执行
  useEffect(() => {
    console.log(111111, count)
  }, [count])

  // 仅在初始化时执行一次
  useEffect(() => {
    console.log(111111, count)
  }, [])

  // 【注意事项】1、不要在useEffect中改变依赖项的值，否则会死循环。2、多个不同功能的副作用尽量分开声明，不要写到一个useEffect中。

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// 清除副作用---1、清理网络请求；2、清除事件绑定
const Child: React.FC = () => {
  useEffect(() => {
    const controller = new AbortController()
    const fetchData = async () => {
      try {
        await fetch('https://jsonplaceholder.typicode.com/todos/1', {
          signal: controller.signal
        })
        // 这里可以处理数据
      } catch (error) {
        if (controller.signal.aborted) {
          console.log('请求已被取消')
        } else {
          console.error('请求出错', error)
        }
      }
    }
    fetchData()
    // 清理函数：组件卸载时取消请求
    return () => {
      console.log(111, '销毁时,先执行清理函数')

      controller.abort()
    }
  }, [])

  useEffect(() => {
    const handleResize = () => {
      console.log('窗口大小变化')
    }
    window.addEventListener('resize', handleResize)

    // 清理函数：组件卸载时移除事件监听
    return () => {
      console.log(111, '销毁时,先执行清理函数')

      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <>我是子组件，演示下清除副作用</>
}
const Page2: React.FC = () => {
  const [flag, setFlag] = useState(true)

  useEffect(() => {
    setFlag(false)
  }, [])
  return <>{flag && <Child />}</>
}

// demo示例
const Child3: React.FC = () => {
  const [position, setPosition] = useState({
    x: 0,
    y: 0
  })

  useEffect(() => {
    let timer: null | NodeJS.Timeout = null
    const handleMove = (e: MouseEvent) => {
      if (timer) return

      timer = setTimeout(() => {
        console.log('窗口大小变化', e)
        setPosition({ x: e.clientX, y: e.clientY })

        timer = null
      }, 500)
    }

    window.addEventListener('mousemove', handleMove)

    // 清理函数：组件卸载时移除事件监听
    return () => {
      console.log(111, '销毁时,先执行清理函数,移除窗口大小变化的监听')
      window.removeEventListener('mousemove', handleMove)
    }
  }, [])

  return <>我是子组件，演示下清除副作用{JSON.stringify(position)}</>
}
const Page3: React.FC = () => {
  const [flag, setFlag] = useState(true)

  return (
    <>
      <button onClick={() => setFlag((pre) => !pre)}>显示或者隐藏子组件</button>
      {flag && <Child3 />}
    </>
  )
}

export default Page3
