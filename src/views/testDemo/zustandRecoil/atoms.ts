import { atom } from 'recoil'

// 当前选中订单
export const selectedOrderAtom = atom<string | null>({
  key: 'selectedOrderAtom',
  default: null
})

// 订单详情弹窗的 tab 状态
export const orderDetailTabAtom = atom<string>({
  key: 'orderDetailTabAtom',
  default: 'base' // base/log
})
