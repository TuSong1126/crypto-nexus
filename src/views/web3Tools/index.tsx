import { Outlet } from 'react-router-dom'

const Web3Tools = () => {
  return (
    <div className="web3-tools-container">
      <h1>Web3工具</h1>
      <p>专业区块链工具集，帮助您更好地管理Web3资产</p>
      <Outlet />
    </div>
  )
}

export default Web3Tools
