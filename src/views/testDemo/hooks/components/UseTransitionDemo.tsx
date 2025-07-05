import React, { useState, useTransition } from 'react'

// 例如有以下3个标签页组件，分别是 Home、Movie、About，
// 其中 Movie 是一个渲染特别耗时的组件，在渲染 Movie 组件期间页面的 UI 会被阻塞，
// 用户会感觉页面十分卡顿，可采用useTransition解决，示例代码如下：

const TabsContainer: React.FC = () => {
  // 被激活的标签页的名字
  const [activeTab, setActiveTab] = useState('home')
  const [isPending, startTransition] = useTransition()

  // 用 startTransition 包裹后，React 会优先处理更紧急的任务（如输入、点击等），等主线程空闲时再去
  const onClickHandler = (tabName: string) => {
    startTransition(() => {
      // 转换为低优先级操作，可理解为延迟执行---setActiveTab 的状态更新就被标记为"可中断的低优先级任务"。
      setActiveTab(tabName)
    })
  }

  return (
    <div style={{ height: 500 }}>
      <hr />
      <TabButton isActive={activeTab === 'home'} onClick={() => onClickHandler('home')}>
        首页
      </TabButton>
      <TabButton isActive={activeTab === 'movie'} onClick={() => onClickHandler('movie')}>
        电影(耗时)
      </TabButton>
      <TabButton isActive={activeTab === 'about'} onClick={() => onClickHandler('about')}>
        关于
      </TabButton>
      <hr />
      {isPending ? (
        <div style={{ color: 'red' }}>加载中...</div>
      ) : (
        <>
          <>{activeTab === 'home' && <HomeTab />}</>
          <>{activeTab === 'movie' && <MovieTab />}</>
          <>{activeTab === 'about' && <AboutTab />}</>
        </>
      )}
    </div>
  )
}

// Button 组件 props 的 TS 类型
type TabButtonType = React.PropsWithChildren & { isActive: boolean; onClick: () => void }
// Button 组件
const TabButton: React.FC<TabButtonType> = (props) => {
  const onButtonClick = () => {
    props.onClick()
  }

  return (
    <button
      className={['btn', 'p-[4px] mr-[8px]', props.isActive && 'bg-[blue]'].join(' ')}
      onClick={onButtonClick}
    >
      {props.children}
    </button>
  )
}

// Home 组件
const HomeTab: React.FC = () => {
  return <>HomeTab</>
}

// Movie 组件
const MovieTab: React.FC = () => {
  const items = Array(100000)
    .fill('MovieTab')
    .map((item, i) => <p key={i}>{item}</p>)
  return items
}

// About 组件
const AboutTab: React.FC = () => {
  return <>AboutTab</>
}

// 注意事项
// 1. 传递给 startTransition 的函数必须是同步的。
// React 会立即执行此函数，并将在其执行期间发生的所有状态更新标记为 transition。
// 如果在其执行期间，尝试稍后执行状态更新（例如在一个定时器中执行状态更新），这些状态更新不会被标记为 transition；
// 2. 标记为 transition 的状态更新将被其他状态更新打断。
// 例如在 transition 中更新图表组件，并在图表组件仍在重新渲染时继续在输入框中输入，React 将首先处理输入框的更新，之后再重新启动对图表组件的渲染工作；
// 3. transition 更新不能用于控制文本输入。

export default TabsContainer
