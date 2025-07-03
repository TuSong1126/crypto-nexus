import { createContext, useContext } from 'react'

const MyContext = createContext('Hello Context!')

export default function UseContextDemo() {
  return (
    <MyContext.Provider value="Hello from Provider!">
      <Child />
    </MyContext.Provider>
  )
}

function Child() {
  const value = useContext(MyContext)
  return <div>Context Value: {value}</div>
}
