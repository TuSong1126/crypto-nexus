import React, { useEffect } from 'react'
import { useCallback, useState } from 'react'

// const set = new Set()
// const cacheSet = new Set()
// export default function UseCallbackDemo() {
//   const [count, setCount] = useState(0)
//   // 未缓存的函数，每次渲染都会新建
//   const increment = () => setCount((c) => c + 1)
//   set.add(increment)

//   // useCallback缓存的函数
//   const incrementCallback = useCallback(() => setCount((c) => c + 1), [])
//   cacheSet.add(incrementCallback)

//   console.log('set.size---set有自动去重的功能', set.size)
//   console.log('cacheSet.size---set有自动去重的功能', cacheSet.size)

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={increment}>未缓存函数 按钮</button>
//       <button onClick={incrementCallback}>useCallback缓存函数 按钮</button>
//     </div>
//   )
// }

type SearchInputType = { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }
type WordType = { id: number; word: string }

const SearchInput: React.FC<SearchInputType> = React.memo((props: SearchInputType) => {
  useEffect(() => {
    console.log('SearchInput 组件被渲染了')
  })

  return <input type="text" className="bg-[#ddd]" onChange={props.onChange} />
})
SearchInput.displayName = 'SearchInput'

const SearchResult: React.FC<{ query: string }> = (props) => {
  const [list, setList] = useState<WordType[]>([])

  useEffect(() => {
    console.log('props.query查询值发生变化')
    const data = [
      { id: 1, word: '第一个' },
      { id: 2, word: '第二个' },
      { id: 3, word: '第三个' }
    ]
    setList(data)
  }, [props.query])

  return (
    <>
      <div>props.query---{props.query}</div>
      {list.map((item) => (
        <p key={item.id}>{item.word}</p>
      ))}
    </>
  )
}

// 1. 此处，虽然SearchInput组件使用的React.memo包裹，但是因为组件渲染，导致onKwChange函数一直在被重新定义，引用在改变，所以SearchInput组件也会频繁渲染；
// 2. 使用useCallback包裹之后可以避免这种现象。

const SearchBox: React.FC = () => {
  const [kw, setKw] = useState('')

  // const onKwChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setKw(e.currentTarget.value)
  // }
  const onKwChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKw(e.currentTarget.value)
  }, [])

  return (
    <>
      {/* 搜索框组件 */}
      <SearchInput onChange={onKwChange} />
      <hr />
      {/* 搜索结果组件 */}
      <SearchResult query={kw} />
    </>
  )
}

export default SearchBox
