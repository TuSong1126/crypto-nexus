import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App as AntdApp, ConfigProvider as AntdConfigProvider } from 'antd'
import { Suspense } from 'react'
import { useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { HelmetProvider } from 'react-helmet-async'

import Logo from '@/assets/svg/logo.svg'
import { MotionLazy } from '@/components/basic/animate/motion-lazy'
import Router from '@/router/index'

const { VITE_APP_SIMPLE_MODE } = import.meta.env
// 创建 QueryClient 实例
const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    if (VITE_APP_SIMPLE_MODE === 'true') {
      document.body.classList.add('simple-mode')
      document.body.classList.add('bg-[#F5F5F8]')
    } else {
      document.body.classList.remove('simple-mode')
    }
  }, [])

  return (
    <HelmetProvider>
      <Suspense>
        <QueryClientProvider client={queryClient}>
          <AntdConfigProvider>
            <AntdApp>
              <MotionLazy>
                <Helmet>
                  <title>{VITE_APP_SIMPLE_MODE === 'true' ? 'TestDemo' : 'CryptoNexus'}</title>
                  <link rel="svg" href={Logo} />
                </Helmet>

                <Router />
              </MotionLazy>
            </AntdApp>
          </AntdConfigProvider>
        </QueryClientProvider>
      </Suspense>
    </HelmetProvider>
  )
}

export default App
