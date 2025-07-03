import { useReducer } from 'react'

function reducer(state: number, action: 'inc' | 'dec') {
  switch (action) {
    case 'inc':
      return state + 1
    case 'dec':
      return state - 1
    default:
      return state
  }
}

export default function UseReducerDemo() {
  const [count, dispatch] = useReducer(reducer, 0)
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch('inc')}>+</button>
      <button onClick={() => dispatch('dec')}>-</button>
    </div>
  )
}
