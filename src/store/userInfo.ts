import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserInfo {
  name: string
  sex: string
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
}

const useUserInfoStore = create<UserState>()(
  persist(
    (set) => ({
      token: '',
      updateToken: (token) => set({ token }),

      userInfo: {
        name: '',
        sex: ''
      },
      updateUserInfo: (userInfo) => set({ userInfo }),

      permssion: {
        btns: [],
        routes: []
      },
      updatePermission: (permssion) => set({ permssion })
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

// 当前用户的路由权限
export const useUserRoutesPermission = () => useUserInfoStore((state) => state.permssion.routes)

// 当前用户的按钮权限
export const useUserBtnsPermission = () => useUserInfoStore((state) => state.permssion.btns)

export default useUserInfoStore
