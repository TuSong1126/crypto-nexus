import { gql, request } from 'graphql-request'
import React, { useEffect, useState } from 'react'

const endpoint = 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2'

const query = gql`
  {
    pairs(first: 5) {
      id
      token0 {
        symbol
      }
      token1 {
        symbol
      }
      reserveUSD
    }
  }
`

const Page: React.FC = () => {
  const [pairs, setPairs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    request(endpoint, query)
      .then((data) => {
        setPairs(data.pairs)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div>加载中...</div>

  return (
    <main>
      <h1>Uniswap V2 前5个交易对</h1>
      <ul>
        {pairs.map((pair) => (
          <li key={pair.id}>
            {pair.token0.symbol} / {pair.token1.symbol} - 储备(USD):{' '}
            {Number(pair.reserveUSD).toFixed(2)}
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Page
