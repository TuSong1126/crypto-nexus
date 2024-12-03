import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import './index.scss'

import { useRouter } from '@/hooks/basic/useRouter'

import { CircleLoading } from '@/components/basic/circle-loading'
import businessRoutes from '@/router/routes/index'

const { VITE_APP_HOMEPAGE } = import.meta.env

export default function Layout() {
  // 首页不在菜单中展示(注意斜杠)
  const menuList = businessRoutes.filter((i) => !VITE_APP_HOMEPAGE.includes(i.meta?.permissionKey))
  const router = useRouter()

  return (
    <div className="app-layout-wrapper">
      <div className="header-wrapper tool-box-shadow">
        <div className="logo" onClick={() => router.push(VITE_APP_HOMEPAGE)}>
          LOGO
        </div>

        <div className="menu">
          {menuList.map((item) => (
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
