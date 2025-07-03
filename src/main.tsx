// 本地SVG图标
import 'virtual:svg-icons-register'
import '@/styles/index.scss'

import ReactDOM from 'react-dom/client'

import App from '@/App'

if (import.meta.env.VITE_APP_SIMPLE_MODE !== 'true') {
  import('@/styles/global.scss')
}

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(<App />)
