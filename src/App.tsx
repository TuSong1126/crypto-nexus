import { Suspense } from 'react'
import { Helmet } from 'react-helmet-async'
import { HelmetProvider } from 'react-helmet-async'
import { App as AntdApp, ConfigProvider as AntdConfigProvider } from 'antd'

import { MotionLazy } from '@/components/basic/animate/motion-lazy'
import Router from '@/router/index'
import Logo from '@/assets/svg/logo.svg'

function App() {
  return (
    <HelmetProvider>
      <Suspense>
        <AntdConfigProvider>
          <AntdApp>
            <MotionLazy>
              <Helmet>
                <title>PasserBy</title>
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
