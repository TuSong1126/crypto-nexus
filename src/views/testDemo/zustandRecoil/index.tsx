import React from 'react'
import { RecoilRoot, useRecoilState, useRecoilValue } from 'recoil'

import { orderDetailTabAtom, selectedOrderAtom } from './atoms'
import { useOrderStore } from './orderStore'
import { useTabStore } from './tabStore'

const OrderList: React.FC = () => {
  const { orders, addOrder } = useOrderStore()
  const { tab } = useTabStore()
  const setSelectedOrder = useRecoilState(selectedOrderAtom)[1]

  console.log('OrderList组件渲染了')

  return (
    <div style={{ width: 180 }}>
      <div className="bg-[#ededed] text-[orange]">tab变化引发重新渲染:{tab}</div>
      <hr />
      <div className="font-[500]">订单列表</div>
      <hr />
      <button onClick={() => addOrder(`订单${orders.length + 1}`)}>添加订单</button>
      <hr />
      <ul>
        {orders.map((o, i) => (
          <li key={i} onClick={() => setSelectedOrder(o)}>
            {o}
          </li>
        ))}
      </ul>
    </div>
  )
}

// 【Recoil atom好处】切换 tab 或选中订单时，不会导致订单列表和的无谓重渲染，性能更优---因为单独拎出来了一个store，当然。。。
const OrderDetailModal: React.FC = () => {
  const selectedOrder = useRecoilValue(selectedOrderAtom)
  const [tab, setTab] = useRecoilState(orderDetailTabAtom)

  if (!selectedOrder) return null

  return (
    <div style={{ border: '1px solid #e8e8e8', padding: 16, width: 240, background: '#fff' }}>
      <h3>Recoil订单详情 - {selectedOrder}</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button onClick={() => setTab('base')}>基本信息</button>
        <button onClick={() => setTab('log')}>操作日志</button>
      </div>
      <div>
        {tab === 'base' && <div>这里是基本信息内容</div>}
        {tab === 'log' && <div>这里是操作日志内容</div>}
      </div>
    </div>
  )
}

const ZustandOrderDetailModal: React.FC = () => {
  const selectedOrder = useRecoilValue(selectedOrderAtom)
  const { tab, setTab } = useTabStore()
  if (!selectedOrder) return null
  return (
    <div style={{ border: '1px solid #e8e8e8', padding: 16, width: 240, background: '#f9f9f9' }}>
      <h3>Zustand 详情 - {selectedOrder}</h3>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <button onClick={() => setTab('base')}>基本信息</button>
        <button onClick={() => setTab('log')}>操作日志</button>
      </div>
      <div>
        {tab === 'base' && <div>这里是基本信息内容</div>}
        {tab === 'log' && <div>这里是操作日志内容</div>}
      </div>
    </div>
  )
}

const DemoContent: React.FC = () => {
  return (
    <div style={{ padding: 24 }}>
      <div className="flex gap-[32px] flex-start border-[1px] border-[#ccc] p-[16px]">
        <OrderList />
        <OrderDetailModal />
        <ZustandOrderDetailModal />
      </div>
    </div>
  )
}

const Page: React.FC = () => {
  return (
    <RecoilRoot>
      <DemoContent />
    </RecoilRoot>
  )
}

export default Page
