import { Outlet } from 'react-router-dom'

const Dao = () => {
  return (
    <div className="dao-container">
      <h1>DAO</h1>
      <p>去中心化自治组织，参与社区治理与决策</p>
      <Outlet />
    </div>
  )
}

export default Dao
