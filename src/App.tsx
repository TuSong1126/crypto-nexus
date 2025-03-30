import { App as AntdApp, ConfigProvider as AntdConfigProvider } from 'antd'
import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { HelmetProvider } from 'react-helmet-async'

import Logo from '@/assets/svg/logo.svg'
import { MotionLazy } from '@/components/basic/animate/motion-lazy'
import Router from '@/router/index'

function App() {
  return (
    <HelmetProvider>
      <Suspense>
        <AntdConfigProvider>
          <AntdApp>
            <MotionLazy>
              <Helmet>
                <title>CryptoNexus</title>
                <link rel="svg" href={Logo} />
              </Helmet>

              <Router />
            </MotionLazy>
          </AntdApp>
        </AntdConfigProvider>
      </Suspense>
    </HelmetProvider>
  )
}

export default App
