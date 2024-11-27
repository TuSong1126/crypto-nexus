import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import './index.scss'

import { CircleLoading } from '@/components/basic/circle-loading'
import businessRoutes from '@/router/routes/index'

const { VITE_APP_HOMEPAGE } = import.meta.env
export default function Layout() {
  return (
    <div className="app-layout-wrapper">
      <div className="header-wrapper tool-box-shadow">
        <div className="logo">LOGO</div>

        <div className="menu">
          {businessRoutes.map((item) => (
            <NavLink to={item.path || VITE_APP_HOMEPAGE} className="item" key={item.path}>
              {item.meta?.title}
            </NavLink>
          ))}
        </div>

        <div className="other">其它</div>
      </div>

      <div className="main-content-wrapper">
        <Suspense fallback={<CircleLoading />}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  )
}
