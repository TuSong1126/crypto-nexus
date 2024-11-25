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
      userInfo: {
        name: '',
        sex: ''
      },
      permssion: {
        btns: [],
        routes: []
      },

      updateToken: (token) => {
        set({ token })
        localStorage.setItem('token', token)
      },
      updateUserInfo: (userInfo) => set({ userInfo }),
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

export default useUserInfoStore
