import { Suspense } from 'react'
import { NavLink, Outlet } from 'react-router-dom'

import styled from 'styled-components'

import { CircleLoading } from '@/components/basic/circle-loading'
import ProgressBar from '@/components/basic/progress-bar'

export default function Layout() {
  return (
    <StyleWrapper>
      <ProgressBar />

      <div className="header"></div>
      <div className="main">
        <aside>
          <div className="menu_item">
            <NavLink to="/home" end>
              home
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink to="/treeHole" end>
              treeHole
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink to="/article" end>
              article
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink to="/timeAxis" end>
              timeAxis
            </NavLink>
          </div>
          <div className="menu_item">
            <NavLink to="/postOffice" end>
              postOffice
            </NavLink>
          </div>
        </aside>
        <section>
          <Suspense fallback={<CircleLoading />}>
            <Outlet />
          </Suspense>
        </section>
      </div>
    </StyleWrapper>
  )
}

const StyleWrapper = styled.div`
  width: 100vw;
  height: 100vh;

  .header {
    height: 60px;
    border: 1px solid;
  }
  .main {
    height: calc(100vh - 60px);
    display: flex;
    aside {
      width: 260px;
      border: 1px solid;
      .active {
        color: red;
      }
    }
    section {
      flex: 1;
    }
  }
`
