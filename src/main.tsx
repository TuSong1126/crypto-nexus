import ReactDOM from 'react-dom/client'

// 本地SVG图标
import 'virtual:svg-icons-register'

import App from '@/App'
import '@/styles/index.scss'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(<App />)
