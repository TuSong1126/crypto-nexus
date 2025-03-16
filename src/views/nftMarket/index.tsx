import { Outlet } from 'react-router-dom'

const NftMarket = () => {
  return (
    <div className="nft-market-container">
      <h1>NFT市场</h1>
      <p>探索、交易和收藏独特的数字艺术品和收藏品</p>
      <Outlet />
    </div>
  )
}

export default NftMarket
