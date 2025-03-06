import { lazy, useEffect } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

import { ConstEnum } from '@/enums'
import { useRouter } from '@/hooks/basic/useRouter'

type Props = {
  children: React.ReactNode
}

const ErrorPage = lazy(() => import('@/views/errorPage'))

export default function AuthGuard({ children }: Props) {
  const router = useRouter()
  const accessToken = localStorage.getItem(ConstEnum.TOKEN)

  useEffect(() => {
    if (!accessToken) {
      router.replace('/login')
    }
  }, [router, accessToken])

  return <ErrorBoundary FallbackComponent={ErrorPage}>{children}</ErrorBoundary>
}
