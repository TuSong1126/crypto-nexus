import { Divider, Select } from 'antd'
import { useState } from 'react'

import ForwardRefDemo from './components/ForwardRefDemo'
import ReactMemoDemo from './components/ReactMemoDemo'
import UseActionStateDemo from './components/UseActionStateDemo'
import UseCallbackDemo from './components/UseCallbackDemo'
import UseContextDemo from './components/UseContextDemo'
import UseDebugValueDemo from './components/UseDebugValueDemo'
import UseDeferredValueDemo from './components/UseDeferredValueDemo'
import UseDemo from './components/UseDemo'
import UseEffectDemo from './components/UseEffectDemo'
import UseFormStatusDemo from './components/UseFormStatusDemo'
import UseIdDemo from './components/UseIdDemo'
import UseImperativeHandleDemo from './components/UseImperativeHandleDemo'
import UseInsertionEffectDemo from './components/UseInsertionEffectDemo'
import UseLayoutEffectDemo from './components/UseLayoutEffectDemo'
import UseMemoDemo from './components/UseMemoDemo'
import UseOptimisticDemo from './components/UseOptimisticDemo'
import UseReducerDemo from './components/UseReducerDemo'
import UseRefDemo from './components/UseRefDemo'
import UseStateDemo from './components/UseStateDemo'
import UseSyncExternalStoreDemo from './components/UseSyncExternalStoreDemo'
import UseTransitionDemo from './components/UseTransitionDemo'

const HOOKS_LIST = [
  {
    label: 'useState',
    value: 'useState',
    component: <UseStateDemo />,
    color: 'red',
    desc: '管理组件内部状态。'
  },
  {
    label: 'useRef',
    value: 'useRef',
    component: <UseRefDemo />,
    color: 'red',
    desc: '获取 DOM 或保存可变数据，数据变化时不会引发重新渲染。'
  },
  {
    label: 'useImperativeHandle',
    value: 'useImperativeHandle',
    component: <UseImperativeHandleDemo />,
    color: 'red',
    desc: '自定义暴露给父组件的实例方法或者数据。'
  },
  {
    label: 'useEffect',
    value: 'useEffect',
    component: <UseEffectDemo />,
    color: 'red',
    desc: '【执行时机：组件渲染完毕后-不会阻塞浏览器绘制】三种依赖项、return函数在组件卸载时清除副作用'
  },
  {
    label: 'useLayoutEffect',
    value: 'useLayoutEffect',
    component: <UseLayoutEffectDemo />,
    color: 'none',
    desc: '【执行时机：组件开始渲染时-阻塞浏览器绘制(处理闪烁)】'
  },
  {
    label: 'useReducer',
    value: 'useReducer',
    component: <UseReducerDemo />,
    color: 'red',
    desc: '管理复杂状态，useState->useReducer->zustand。'
  },
  {
    label: 'useContext',
    value: 'useContext',
    component: <UseContextDemo />,
    color: 'red',
    desc: '跨组件共享数据。'
  },
  {
    label: 'useMemo',
    value: 'useMemo',
    component: <UseMemoDemo />,
    color: 'red',
    desc: '缓存计算结果，类似于Vue的计算属性，优化性能。'
  },
  {
    label: 'useCallback',
    value: 'useCallback',
    component: <UseCallbackDemo />,
    color: 'red',
    desc: '缓存函数，减少不必要的子组件渲染。'
  },
  {
    label: 'useTransition',
    value: 'useTransition',
    component: <UseTransitionDemo />,
    color: 'none',
    desc: '区分高低优先级更新,注意：传递给 startTransition 的函数必须是同步的。',
    href: 'https://x.com/i/grok?conversation=1941423503141413368'
  },
  {
    label: 'useDeferredValue',
    value: 'useDeferredValue',
    component: <UseDeferredValueDemo />,
    color: 'none',
    desc: '延迟不重要的 UI 更新。',
    href: 'https://x.com/i/grok?conversation=1941423503141413368'
  },
  {
    label: 'useDebugValue',
    value: 'useDebugValue',
    component: <UseDebugValueDemo />,
    color: 'none',
    desc: '自定义 Hook 调试信息。'
  },
  {
    label: 'useId',
    value: 'useId',
    component: <UseIdDemo />,
    color: 'none',
    desc: '生成唯一 id。'
  },
  {
    label: 'useSyncExternalStore',
    value: 'useSyncExternalStore',
    component: <UseSyncExternalStoreDemo />,
    color: 'none',
    desc: '订阅外部 store。'
  },
  {
    label: 'useInsertionEffect',
    value: 'useInsertionEffect',
    component: <UseInsertionEffectDemo />,
    color: 'none',
    desc: 'DOM 插入前执行副作用。'
  },
  {
    label: 'use',
    value: 'use',
    component: <UseDemo />,
    color: 'none',
    desc: '直接调用异步资源。'
  },
  {
    label: 'useActionState',
    value: 'useActionState',
    component: <UseActionStateDemo />,
    color: 'none',
    desc: '管理异步 action 状态。'
  },
  {
    label: 'useFormStatus',
    value: 'useFormStatus',
    component: <UseFormStatusDemo />,
    color: 'none',
    desc: '获取表单提交状态。'
  },
  {
    label: 'useOptimistic',
    value: 'useOptimistic',
    component: <UseOptimisticDemo />,
    color: 'none',
    desc: '实现乐观 UI 更新。'
  },

  // 非hooks
  {
    label: 'forwardRef-[非hooks]',
    value: 'forwardRef',
    component: <ForwardRefDemo />,
    color: 'none',
    desc: '让父组件获取子组件 ref。'
  },
  {
    label: 'React.memo-[非hooks]',
    value: 'reactMemo',
    component: <ReactMemoDemo />,
    color: 'red',
    desc: '缓存组件，避免重复渲染。'
  }
]

export default function HooksPage() {
  const [curHook, setCurHook] = useState('useState')
  const handleChange = (value: string) => setCurHook(value)

  return (
    <div className="bg-[#fff] flex flex-col h-full">
      <div className="flex items-center gap-[16px]">
        <div className="text-[16px] font-bold w-[100px]">选择hooks：</div>
        <Select
          defaultValue={curHook}
          style={{ width: '60%' }}
          onChange={handleChange}
          options={HOOKS_LIST}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
          optionRender={(option, { index }) => (
            <span style={{ color: option.data.color }}>
              {index + 1}、{option.label}
            </span>
          )}
        />

        {/* <div className="text-[16px] font-bold ml-[48px]">
          相关文档：
          <a className="text-[#1677ff]" href="https://zh-hans.react.dev/reference/react/useState">
            React-Hooks
          </a>
          <Divider type="vertical" />
          <a
            className="text-[#1677ff]"
            href="https://www.yuque.com/squirrel_space/oi0vy8/ptof9ia46zqksno3#jKVHJ"
          >
            Hooks-Grok
          </a>
          <Divider type="vertical" />
          <a className="text-[#1677ff]" href="https://www.bilibili.com/read/readlist/rl786295">
            Bili-liulongbin-Hooks
          </a>
        </div> */}
      </div>

      <Divider />

      <div className="text-[14px] bg-[#ddd] text-gray-600 mb-2 min-h-[32px] p-[8px] rounded-[8px]">
        {HOOKS_LIST.find((item) => item.value === curHook)?.desc}
        <hr />
        <a className="text-[blue]" href={HOOKS_LIST.find((item) => item.value === curHook)?.href}>
          {HOOKS_LIST.find((item) => item.value === curHook)?.href}
        </a>
      </div>

      <br />

      <div className="flex-1 overflow-auto">
        {HOOKS_LIST.find((item) => item.value === curHook)?.component}
      </div>
    </div>
  )
}
