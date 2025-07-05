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
  { label: 'useState', value: 'useState', component: <UseStateDemo />, color: 'red' },
  { label: 'useRef', value: 'useRef', component: <UseRefDemo />, color: 'red' },
  {
    label: 'forwardRef(非hooksAPI,React函数,解决FC不可被ref引用的问题,配套useImperativeHandle使用)',
    value: 'forwardRef',
    component: <ForwardRefDemo />,
    color: 'none'
  },
  {
    label: 'useImperativeHandle(配合forwardRef使用,v19移除forwardRef后，配合普通ref的prop使用)',
    value: 'useImperativeHandle',
    component: <UseImperativeHandleDemo />,
    color: 'red'
  },
  {
    label:
      'useEffect(【执行时机：组件渲染完毕后-不会阻塞浏览器绘制】三种依赖项、return函数在组件卸载时清除副作用)',
    value: 'useEffect',
    component: <UseEffectDemo />,
    color: 'red'
  },
  {
    label: 'useLayoutEffect(【执行时机：组件开始渲染时-阻塞浏览器绘制(处理闪烁)】)',
    value: 'useLayoutEffect',
    component: <UseLayoutEffectDemo />,
    color: 'none'
  },
  {
    label: 'useReducer(useState->useReducer->zustand)',
    value: 'useReducer',
    component: <UseReducerDemo />,
    color: 'red'
  },
  { label: 'useContext', value: 'useContext', component: <UseContextDemo />, color: 'red' },

  {
    label: 'React.memo(性能优化-非hooks)',
    value: 'reactMemo',
    component: <ReactMemoDemo />,
    color: 'red'
  },
  { label: 'useMemo(性能优化)', value: 'useMemo', component: <UseMemoDemo />, color: 'red' },
  {
    label: 'useCallback(性能优化)',
    value: 'useCallback',
    component: <UseCallbackDemo />,
    color: 'none'
  },
  {
    label: 'useTransition(性能优化)',
    value: 'useTransition',
    component: <UseTransitionDemo />,
    color: 'none'
  },
  {
    label: 'useDeferredValue(性能优化)',
    value: 'useDeferredValue',
    component: <UseDeferredValueDemo />,
    color: 'none'
  },
  {
    label: 'useDebugValue',
    value: 'useDebugValue',
    component: <UseDebugValueDemo />,
    color: 'none'
  },
  { label: 'useId', value: 'useId', component: <UseIdDemo />, color: 'none' },
  {
    label: 'useSyncExternalStore',
    value: 'useSyncExternalStore',
    component: <UseSyncExternalStoreDemo />,
    color: 'none'
  },
  {
    label: 'useInsertionEffect',
    value: 'useInsertionEffect',
    component: <UseInsertionEffectDemo />,
    color: 'none'
  },
  { label: 'use', value: 'use', component: <UseDemo />, color: 'none' },
  {
    label: 'useActionState',
    value: 'useActionState',
    component: <UseActionStateDemo />,
    color: 'none'
  },
  {
    label: 'useFormStatus',
    value: 'useFormStatus',
    component: <UseFormStatusDemo />,
    color: 'none'
  },
  {
    label: 'useOptimistic',
    value: 'useOptimistic',
    component: <UseOptimisticDemo />,
    color: 'none'
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

      <div className="flex-1 overflow-auto">
        {HOOKS_LIST.find((item) => item.value === curHook)?.component}
      </div>
    </div>
  )
}
