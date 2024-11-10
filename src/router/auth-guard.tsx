import { lazy, useCallback, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { useRouter } from '@/hooks/basic/useRouter'

type Props = {
  children: React.ReactNode
}

const ErrorPage = lazy(() => import('@/views/errorPage'))

export default function AuthGuard({ children }: Props) {
  const router = useRouter()

  const accessToken = localStorage.getItem('token')

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
