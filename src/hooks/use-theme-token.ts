import { useMemo } from 'react'
import { theme } from 'antd'

export function useThemeToken() {
  const { token } = theme.useToken()
  return useMemo(() => token, [token])
}
