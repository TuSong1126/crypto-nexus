import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import './index.scss'

import { CircleLoading } from '@/components/basic/circle-loading'

export default function Layout() {
  return (
    <div className="app-layout-wrapper">
      <div className="header-wrapper tool-box-shadow">
        <div className="logo">LOGO</div>

        <div className="menu">
          <NavLink to="/home" className="item">
            home
          </NavLink>

          <NavLink to="/treeHole" className="item">
            treeHole
          </NavLink>

          <NavLink to="/article" className="item">
            article
          </NavLink>

          <NavLink to="/timeAxis" className="item">
            timeAxis
          </NavLink>

          <NavLink to="/postOffice" className="item">
            postOffice
          </NavLink>
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
