import { createContext, useContext } from 'react'
import { useState } from 'react'

const MyContext = createContext('Hello Context!')

// Wrapper 组件，提供 context
function Wrapper({ children }: { children: React.ReactNode }) {
  return (
    <MyContext.Provider value="Hello from Wrapper!">
      <div style={{ border: '2px solid #4caf50', padding: 10, margin: 10 }}>
        <div style={{ color: '#4caf50', fontWeight: 'bold' }}>这里是 Wrapper 组件</div>
        {children}
      </div>
    </MyContext.Provider>
  )
}

// Parent 组件，渲染 Son
function Parent() {
  return (
    <div style={{ border: '2px solid #2196f3', padding: 10, margin: 10 }}>
      <div style={{ color: '#2196f3', fontWeight: 'bold' }}>这里是 Parent 组件</div>
      <Son title="This is Son" />
    </div>
  )
}

// Son 组件，消费 context、展示 title、本地计数器，并渲染 Grandson
function Son({ title }: { title: string }) {
  const value = useContext(MyContext)
  const [count, setCount] = useState(0)
  return (
    <div style={{ border: '1px solid #aaa', padding: 10, margin: 10 }}>
      <div style={{ color: '#e91e63', fontWeight: 'bold' }}>这里是 Son 组件</div>
      <div>Son Title: {title}</div>
      <div>Son Context Value: {value}</div>
      <div>
        Son Counter: {count}
        <button onClick={() => setCount(count + 1)} style={{ marginLeft: 8 }}>
          +1
        </button>
      </div>
      <Grandson />
    </div>
  )
}

// Grandson 组件，消费 context
function Grandson() {
  const value = useContext(MyContext)
  return (
    <div style={{ border: '1px dashed #ff9800', padding: 10, margin: 10 }}>
      <div style={{ color: '#ff9800', fontWeight: 'bold' }}>这里是 Grandson 组件</div>
      Grandson Context Value: {value}
    </div>
  )
}

// 用 Wrapper 包裹 Parent
export default function UseContextDemo() {
  return (
    <Wrapper>
      <Parent />
    </Wrapper>
  )
}
