import { getDefaultConfig } from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  coinbaseWallet,
  coreWallet,
  imTokenWallet,
  injectedWallet,
  metaMaskWallet,
  okxWallet,
  phantomWallet,
  rainbowWallet,
  trustWallet,
  uniswapWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'
import { http } from 'viem'
import {
  arbitrum,
  base,
  hardhat,
  localhost,
  mainnet,
  optimism,
  polygon,
  sepolia
} from 'wagmi/chains'

export const config = getDefaultConfig({
  appName: 'Crypto Nexus Web3',
  // 在实际项目中应该替换为真实的projectId
  /**
   * https://cloud.walletconnect.com注册并创建一个新项目
   * https://cloud.reown.com
   */
  projectId: 'cb283f0aafc6c099844885972323e311',
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http()
  },
  chains: [localhost, hardhat, mainnet, polygon, optimism, arbitrum, base, sepolia],
  wallets: [
    {
      groupName: 'Popular',
      wallets: [metaMaskWallet, rainbowWallet, walletConnectWallet, coinbaseWallet]
    },
    {
      groupName: 'More',
      wallets: [
        okxWallet,
        trustWallet,
        argentWallet,
        uniswapWallet,
        coreWallet,
        imTokenWallet,
        phantomWallet,
        injectedWallet
      ]
    }
  ]
})
