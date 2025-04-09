import React from 'react'

import Welcome from '../components/web3/Welcome'

const Web3Demo: React.FC = () => {
  return (
    <div className="min-h-screen gradient-bg-welcome">
      <div className="container mx-auto">
        <Welcome />
      </div>
    </div>
  )
}

export default Web3Demo
