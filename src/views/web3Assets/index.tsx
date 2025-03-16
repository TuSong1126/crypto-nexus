import { Outlet } from 'react-router-dom'

const Web3Assets = () => {
  return (
    <div className="web3-assets-container">
      <h1>Web3资产</h1>
      <p>管理您的加密货币、代币及区块链资产</p>
      <Outlet />
    </div>
  )
}

export default Web3Assets
