import { Helmet } from 'react-helmet-async'
import { App as AntdApp, ConfigProvider } from 'antd'

import { MotionLazy } from '@/components/basic/animate/motion-lazy'
import Router from '@/router/index'
import Logo from '@/assets/images/home.png'

function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>Accompany</title>
            <link rel="icon" href={Logo} />
          </Helmet>

          <Router />
        </MotionLazy>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
