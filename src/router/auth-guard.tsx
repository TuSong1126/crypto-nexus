import { lazy, useCallback, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useRouter } from '@/hooks/use-router'

type Props = {
  children: React.ReactNode
}
const ErrorPage = lazy(() => import('@/views/ErrorPage'))

export default function AuthGuard({ children }: Props) {
  const router = useRouter()

  const accessToken = localStorage.getItem('token')
  console.log(1111111, '切换路由，检验是否带有accessToken', accessToken)

  const check = useCallback(() => {
    if (!accessToken) {
      router.replace('/login')
    }
  }, [router, accessToken])

  useEffect(() => {
    check()
  }, [check])

  return <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
}
