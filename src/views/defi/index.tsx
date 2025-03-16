import { Outlet } from 'react-router-dom'

const Defi = () => {
  return (
    <div className="defi-container">
      <h1>DeFi</h1>
      <p>去中心化金融，提供流动性和代币交换</p>
      <Outlet />
    </div>
  )
}

export default Defi
