import { defineMock } from './base'

export default defineMock([
  {
    url: 'auth/login',
    method: ['POST'],
    body: {
      code: 200,
      data: {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6IjE2YWJkNTlkOTAxNzQwZDliYmI3ZjczODBhZDkyNzNhIiwidXNlcklkIjoyLCJ1c2VybmFtZSI6ImFkbWluIiwiZGVwdElkIjoxLCJkYXRhU2NvcGUiOjEsImF1dGhvcml0aWVzIjpbIlJPTEVfQURNSU4iXSwiZXhwIjoxNjkxMTAzMzgyfQ.P4cuIfmPepl3HuguhMS7NXn5a7IUPpsLbmtA_rHOhHk',
        userInfo: {
          name: 'Frank',
          sex: 'man'
        }
      },
      msg: '登录'
    }
  },
  {
    url: 'auth/register',
    method: ['POST'],
    body: {
      code: 200,
      data: {},
      msg: '注册成功'
    }
  },
  {
    url: 'auth/permission',
    method: ['GET'],
    body: {
      code: 200,
      data: {
        btns: [
          // Web3资产按钮权限
          'btn:web3Assets/list/view',
          'btn:web3Assets/list/transfer',
          'btn:web3Assets/detail/view',

          // NFT市场按钮权限
          'btn:nftMarket/marketplace/buy',
          'btn:nftMarket/marketplace/sell',
          'btn:nftMarket/collection/view',

          // DeFi按钮权限
          'btn:defi/swap/execute',
          'btn:defi/pool/add',
          'btn:defi/pool/remove',

          // Web3工具按钮权限
          'btn:web3Tools/wallet/connect',
          'btn:web3Tools/wallet/disconnect',
          'btn:web3Tools/explorer/search'
        ],
        routes: [
          // 首页路由权限
          'route:home',

          // Web3资产路由权限
          'route:web3Assets',
          'route:web3Assets/list',
          'route:web3Assets/detail',

          // NFT市场路由权限
          'route:nftMarket',
          'route:nftMarket/marketplace',
          'route:nftMarket/collection',

          // DeFi路由权限
          'route:defi',
          'route:defi/swap',
          'route:defi/pool',

          // Web3工具路由权限
          'route:web3Tools',
          'route:web3Tools/wallet',
          'route:web3Tools/explorer'
        ]
      },
      msg: '获取权限'
    }
  }
])
