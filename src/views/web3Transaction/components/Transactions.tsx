import React, { useContext } from 'react'

import { TransactionContext } from '../context/TransactionContext'
import { shortenAddress } from '../utils/shortenAddress'

// 示例数据，用于展示界面
const dummyData = [
  {
    id: 1,
    url: 'https://metro.co.uk/wp-content/uploads/2015/05/transfer_1431348094.gif?quality=90&strip=all&zoom=1&resize=540%2C284',
    message: '交易成功完成',
    timestamp: '刚刚',
    addressFrom: '0xCF8e569A97C423952DdFf902375C7C76549A6A90',
    amount: '0.01',
    addressTo: '0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE'
  },
  {
    id: 2,
    url: 'https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif',
    message: '以太坊转账',
    timestamp: '1小时前',
    addressFrom: '0xCF8e569A97C423952DdFf902375C7C76549A6A90',
    amount: '0.02',
    addressTo: '0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE'
  },
  {
    id: 3,
    url: 'https://acegif.com/wp-content/uploads/gif-shaking-head-38.gif',
    message: '感谢您的信任',
    timestamp: '昨天',
    addressFrom: '0xCF8e569A97C423952DdFf902375C7C76549A6A90',
    amount: '0.03',
    addressTo: '0x8aa395Ab97837576aF9cd6946C79024ef1acfdbE'
  }
]

interface TransactionCardProps {
  addressTo: string
  addressFrom: string
  timestamp: string
  message: string
  keyword?: string
  amount: string | number
  url?: string
  id?: number
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  addressTo,
  addressFrom,
  timestamp,
  message,
  amount,
  url
}) => {
  return (
    <div
      className="bg-[#181918] m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      min-w-full
      flex-col p-3 rounded-md hover:shadow-2xl"
    >
      <div className="flex flex-col items-center w-full mt-3">
        <div className="display-flex justify-start w-full mb-6 p-2">
          <a href={`https://etherscan.io/address/${addressFrom}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">发送方: {shortenAddress(addressFrom)}</p>
          </a>
          <a href={`https://etherscan.io/address/${addressTo}`} target="_blank" rel="noreferrer">
            <p className="text-white text-base">接收方: {shortenAddress(addressTo)}</p>
          </a>
          <p className="text-white text-base">金额: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className="text-white text-base">消息: {message}</p>
            </>
          )}
        </div>
        <img src={url} alt="交易相关图片" className="w-full h-64 2xl:h-96 rounded-md shadow-lg object-cover" />
        <div className="bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl">
          <p className="text-[#37c7da] font-bold">{timestamp}</p>
        </div>
      </div>
    </div>
  )
}

const Transactions: React.FC = () => {
  const { transactions, currentAccount } = useContext(TransactionContext)

  return (
    <div className="flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions">
      <div className="flex flex-col md:p-12 py-12 px-4">
        {currentAccount ? (
          <h3 className="text-white text-3xl text-center my-2">最新交易</h3>
        ) : (
          <h3 className="text-white text-3xl text-center my-2">连接您的账户以查看最新交易</h3>
        )}

        <div className="flex flex-wrap justify-center items-center mt-10">
          {[...dummyData, ...transactions].reverse().map((transaction, i) => (
            <TransactionCard key={i} {...transaction} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Transactions
