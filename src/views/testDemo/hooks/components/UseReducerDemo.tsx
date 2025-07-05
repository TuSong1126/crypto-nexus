import { Dispatch, useReducer } from 'react'

// const [state, dispatch] = useReducer(reducer, initState, initAction?)

// 1. reducer 按条件处理state的函数。
// 2. initState 初始值。
// 3. initAction 处理初始值的函数，可选。
// 4. 返回值 state 是状态值。dispatch 是更新 state 的方法。

interface State {
  name: string
  age: number
}

type Action =
  | { type: 'setName'; payload: string }
  | { type: 'setAge'; payload: number }
  | { type: 'incAge' }
  | { type: 'decAge' }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.payload }
    case 'setAge':
      return { ...state, age: action.payload }
    case 'incAge':
      return { ...state, age: state.age + 1 }
    case 'decAge':
      return { ...state, age: state.age - 1 }
    default:
      return state
  }
}

function init(initialState: State): State {
  return {
    name: initialState.name,
    age: initialState.age < 0 ? Math.abs(initialState.age) : initialState.age || 18
  }
}

const Child: React.FC<State & { dispatch: Dispatch<Action> }> = (
  props: State & { dispatch: Dispatch<Action> }
) => {
  const { dispatch, ...user } = props

  return (
    <>
      <input
        value={user.name}
        onChange={(e) => dispatch({ type: 'setName', payload: e.target.value })}
        placeholder="请输入姓名"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => dispatch({ type: 'setAge', payload: Number(e.target.value) })}
        placeholder="请输入年龄"
      />
    </>
  )
}

export default function UseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, { name: '', age: 0 }, init)
  return (
    <div>
      <p>{JSON.stringify(state)}</p>
      <Child {...state} dispatch={dispatch} />

      <br />
      <button onClick={() => dispatch({ type: 'decAge' })}>减少年龄</button>
      <button onClick={() => dispatch({ type: 'incAge' })}>增加年龄</button>
    </div>
  )
}
