import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ConstEnum } from '@/enums'

interface UserInfo {
  name: string
  sex: string
  nickname?: string
  avatar?: string
}
interface Permission {
  btns: string[]
  routes: string[]
}

interface UserState {
  token: string
  userInfo: UserInfo
  permssion: Permission
  updateToken: (params: string) => void
  updateUserInfo: (parmas: UserInfo) => void
  updatePermission: (params: Permission) => void
  resetUserInfo: () => void
}

const initialState = {
  token: '',
  userInfo: {
    name: '',
    sex: '',
    nickname: '',
    avatar: ''
  },
  permssion: {
    btns: [],
    routes: []
  }
}

const useUserInfoStore = create<UserState>()(
  persist(
    (set) => ({
      ...initialState,

      updateToken: (token) => {
        set({ token })
        localStorage.setItem(ConstEnum.TOKEN, token)
      },
      updateUserInfo: (userInfo) => set({ userInfo }),
      updatePermission: (permssion) => set({ permssion }),
      resetUserInfo: () => {
        set(initialState)
        localStorage.removeItem(ConstEnum.TOKEN)
      }
    }),
    {
      name: 'USER_STORE',
      storage: createJSONStorage(() => localStorage)
      // 仅存部分字段信息
      // partialize: (state) => ({
      //   userToken: state.token,
      //   userInfo: state.userInfo
      // })
    }
  )
)

export default useUserInfoStore
