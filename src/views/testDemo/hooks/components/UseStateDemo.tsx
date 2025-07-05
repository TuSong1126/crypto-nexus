import { useEffect, useState } from 'react'

// 1、state变化会导致组件刷新
function Page1() {
  const [count, setCount] = useState(0)

  return (
    <div>
      {Math.random()}
      <br />
      UseStateDemo: {count}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// 2、函数形式赋初始值（函数仅在初始化时执行）
function Page2() {
  const [date] = useState(() => new Date().getTime())
  const [count, setCount] = useState(0)

  return (
    <div>
      UseStateDemo: {date}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

// 3、useState 是异步变更状态的(无法立即拿到最新的状态)
function Page3() {
  const [count, setCount] = useState(0)

  const add = () => {
    setCount(count + 1)

    // 拿到的count值依然是上次的，因为setState是异步的
    // 解决办法：
    // 1、setState的回调函数
    // 2、useEffect
    setTimeout(() => {
      console.log('拿到的count值---依然是旧值', count)
    }, 1000)
  }

  useEffect(() => {
    console.log('useEffect拿到的count值---最新的！', count)
  }, [count])

  return (
    <div>
      UseStateDemo: {count}
      <button onClick={add}>Increment</button>
    </div>
  )
}

// 4、【注意事项】更新对象类型的值，要用新对象覆盖旧对象
function Page4() {
  const [obj, setObj] = useState({
    a: 1,
    b: 2
  })

  const handleClick = () => {
    console.log(1111, 'handleClick')
    // 下面的写法是错误的，因为 set 函数内部，会对更新前后的值进行对比；
    // 由于更新前后的 obj，原值的引用和新值的引用相同，
    // 所以 react 认为值没有发生变化，不会触发组件的重新渲染。
    // obj.a = 3

    // 这样ok
    // 另外，如果 obj 的引用没有发生变化，那么 react 也不会触发组件的渲染。
    setObj({ ...obj, a: 3 })
  }

  return (
    <div>
      UseStateDemo: {JSON.stringify(obj)}
      <button onClick={handleClick}>handleClick</button>
    </div>
  )
}

// 5、【注意事项】解决值更新不及时的 Bug
function Page5() {
  const [count, setCount] = useState(0)

  // 预期是一次性加2，实际上不行
  // const add = () => {
  //   setCount(count + 1)
  //   setCount(count + 1)
  // }

  // 这样是ok的
  const add = () => {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  return (
    <div>
      UseStateDemo: {count}
      <button onClick={add}>Increment</button>
    </div>
  )
}

// 6、【注意事项】使用 setState 模拟组件的强制刷新---算是reload
function Page6() {
  const [, setState] = useState({})

  return (
    <div>
      {Math.random()}
      <button onClick={() => setState({})}>Increment</button>
    </div>
  )
}

export default Page6
