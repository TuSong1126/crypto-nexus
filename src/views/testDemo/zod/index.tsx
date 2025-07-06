import React, { useCallback } from 'react'
import { useImmerReducer } from 'use-immer'
import { z } from 'zod'

// 1. 定义表单数据结构和校验规则
const FormSchema = z.object({
  username: z.string().min(2, '用户名至少2位'),
  age: z.number().min(1, '年龄必须大于0')
})

type FormData = z.infer<typeof FormSchema>

// 2. 定义初始状态和 action 类型
const initialState: {
  form: FormData
  errors: Partial<Record<keyof FormData, string>>
} = {
  form: { username: '', age: 18 },
  errors: {}
}

type Action =
  | { type: 'change'; field: keyof FormData; value: string }
  | { type: 'validate' }
  | { type: 'reset' }

// 3. 使用 Immer 实现不可变 reducer
function reducer(state: typeof initialState, action: Action) {
  switch (action.type) {
    case 'change': {
      // 字段变更，自动转换 age 为 number
      if (action.field === 'age') {
        state.form.age = Number(action.value)
      } else {
        state.form[action.field] = action.value as any
      }
      // 清除该字段错误
      delete state.errors[action.field]
      break
    }
    case 'validate': {
      // 用 Zod 校验
      const result = FormSchema.safeParse(state.form)
      if (!result.success) {
        // 收集所有错误
        state.errors = {}
        result.error.errors.forEach((err) => {
          const field = err.path[0] as keyof FormData
          state.errors[field] = err.message
        })
      } else {
        state.errors = {}
      }
      break
    }
    case 'reset': {
      state.form = { ...initialState.form }
      state.errors = {}
      break
    }
    default:
      break
  }
}

const Page: React.FC = () => {
  const [state, dispatch] = useImmerReducer(reducer, initialState)

  // 提交处理
  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      // 直接用 zod 校验，保证同步
      const result = FormSchema.safeParse(state.form)
      if (!result.success) {
        // 有错误时，分发校验 action，显示错误
        dispatch({ type: 'validate' })
        return
      }
      alert('提交成功：' + JSON.stringify(state.form))
    },
    [state.form, dispatch]
  )

  return (
    <main
      style={{
        maxWidth: 360,
        margin: '40px auto',
        padding: 24,
        border: '1px solid #eee',
        borderRadius: 8
      }}
    >
      <h2>Zod + Immer 简易表单 Demo</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>
            用户名：
            <input
              value={state.form.username}
              onChange={(e) =>
                dispatch({ type: 'change', field: 'username', value: e.target.value })
              }
              style={{ marginLeft: 8 }}
            />
          </label>
          {state.errors.username && (
            <div style={{ color: 'red', fontSize: 12 }}>{state.errors.username}</div>
          )}
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>
            年龄：
            <input
              type="number"
              value={state.form.age}
              onChange={(e) => dispatch({ type: 'change', field: 'age', value: e.target.value })}
              style={{ marginLeft: 8 }}
            />
          </label>
          {state.errors.age && <div style={{ color: 'red', fontSize: 12 }}>{state.errors.age}</div>}
        </div>
        <button type="submit" style={{ marginRight: 8 }}>
          提交
        </button>
        <button type="button" onClick={() => dispatch({ type: 'reset' })}>
          重置
        </button>
      </form>
      {/* 重要说明：
        1. 所有状态变更都通过 Immer reducer 实现不可变更新，避免直接修改原始对象。
        2. 校验逻辑全部交给 Zod，结构清晰，易于维护和扩展。
        3. 适合复杂表单/表格场景，减少状态冲突和维护成本。
      */}
    </main>
  )
}

export default Page

// Zod 的主要优点（简化版）
// 类型和校验合一
// 一份 schema，既能推导 TypeScript 类型，又能做运行时校验，减少重复劳动。
// 语法简洁，链式调用
// 校验规则链式书写，易读易维护。
// 运行时安全
// 能校验接口、表单等任意数据，防止脏数据进入业务逻辑。
// 错误信息友好
// 校验失败时自动返回详细错误，方便前端直接提示。
// 无依赖，体积小
// 没有第三方依赖，性能好，适合前端项目。
// 一句话总结：
// Zod 让你用一份声明，既有类型推导，又有运行时校验，开发体验极佳。
