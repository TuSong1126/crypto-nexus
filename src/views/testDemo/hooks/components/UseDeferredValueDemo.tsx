import React, { useDeferredValue, useState, useTransition } from 'react'

// 在搜索框案例中，SearchResult 组件会根据用户输入的关键字，循环生成大量的 p 标签，因此它是一个渲染比较耗时的组件

// 注意，此案例不能使用 useTransition 进行性能优化，因为 useTransition 会把状态更新标记为低优先级，
// 被标记为 transition 的状态更新将被其他状态更新打断。因此在高频率输入时，会导致中间的输入状态丢失的问题。
// 例如，快速输入123，只会得到3，因为中间状态丢失了：

// useTransition
const SearchBox: React.FC = () => {
  const [kw, setKw] = useState('')
  // 1. 调用 useTransition 函数
  const [, startTransition] = useTransition()

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 2. 将文本框状态更新标记为“低优先级”，会导致中间的输入状态丢失
    startTransition(() => {
      setKw(e.currentTarget.value)
    })
  }

  return (
    <div style={{ height: 500 }}>
      <input type="text" className="bg-[#eded]" value={kw} onChange={onInputChange} />
      <hr />
      <SearchResult query={kw} />
    </div>
  )
}

// useDeferredValue
const SearchBox2: React.FC = () => {
  const [kw, setKw] = useState('')
  // 2. 基于 kw 的值，为其创建出一个延迟版的 kw 值，命名为 deferredKw
  const deferredKw = useDeferredValue(kw)

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }

  return (
    <div style={{ height: 500, opacity: deferredKw === kw ? '1' : '0.3' }}>
      <input type="text" className="bg-[#eded]" value={kw} onChange={onInputChange} />
      <hr />
      {/* 3. 将延迟版的 kw 值，传递给子组件使用 */}
      <SearchResult query={deferredKw} />
    </div>
  )
}

// 子组件，渲染列表项
const SearchResult: React.FC<{ query: string }> = React.memo((props: { query: string }) => {
  if (!props.query) return
  const items = Array(10000)
    .fill(props.query)
    .map((item, i) => <p key={i}>{item}</p>)

  return items
})
SearchResult.displayName = 'SearchResult'

export default SearchBox2

// 【注意事项】
// 1、什么时候deferredKw和kw保持一致
//     使用useDeferredValue的区别：依赖于设备的好坏，而防抖、节流在某些情况下相对过于死板。

// 2、延迟一个值变化与直接使用防抖和节流之间有什么不同？
//     在上述的情景中，你可能会使用这两种常见的优化技术：
//     防抖 是指在用户停止输入一段时间（例如一秒钟）之后再更新列表。
//     节流 是指每隔一段时间（例如最多每秒一次）更新列表。
//     虽然这些技术在某些情况下是有用的，但 useDeferredValue 更适合优化渲染，因为它与 React 自身深度集成，并且能够适应用户的设备。
//     与防抖或节流不同，useDeferredValue 不需要选择任何固定延迟时间。
// 如果用户的设备很快（比如性能强劲的笔记本电脑），延迟的重渲染几乎会立即发生并且不会被察觉。
// 如果用户的设备较慢，那么列表会相应地“滞后”于输入，滞后的程度与设备的速度有关。
//     此外，与防抖或节流不同，useDeferredValue 执行的延迟重新渲染默认是可中断的。
// 这意味着，如果 React 正在重新渲染一个大型列表，但用户进行了另一次键盘输入，React 会放弃该重新渲染，先处理键盘输入，然后再次开始在后台渲染。
// 相比之下，防抖和节流仍会产生不顺畅的体验，因为它们是阻塞的：它们仅仅是将渲染阻塞键盘输入的时刻推迟了。
//     如果你要优化的工作不是在渲染期间发生的，那么防抖和节流仍然非常有用。例如，它们可以让你减少网络请求的次数。你也可以同时使用这些技术。
