import React, { useContext } from 'react'

// 使用Unicode符号或文本代替react-icons
// import { AiFillPlayCircle } from 'react-icons/ai'
// import { BsInfoCircle } from 'react-icons/bs'
// import { SiEthereum } from 'react-icons/si'
import { TransactionContext } from '../context/TransactionContext'
import { shortenAddress } from '../utils/shortenAddress'
import Loader from './Loader'

// 通用样式
const companyCommonStyles =
  'min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white'

interface InputProps {
  placeholder: string
  name: string
  type: string
  value?: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>, name: string) => void
}

const Input: React.FC<InputProps> = ({ placeholder, name, type, value, handleChange }) => (
  <input
    placeholder={placeholder}
    type={type}
    step="0.0001"
    value={value}
    onChange={(e) => handleChange(e, name)}
    className="my-2 w-full rounded-sm p-2 outline-none bg-transparent text-white border-none text-sm white-glassmorphism"
  />
)

const Welcome: React.FC = () => {
  const { currentAccount, connectWallet, handleChange, sendTransaction, formData, isLoading } =
    useContext(TransactionContext)

  const handleSubmit = (e: React.FormEvent) => {
    const { addressTo, amount, keyword, message } = formData

    e.preventDefault()

    if (!addressTo || !amount || !keyword || !message) return

    sendTransaction()
  }

  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start items-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            在区块链上发送
            <br />
            数字货币
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            探索加密世界。在我们的平台上轻松买卖加密货币。
          </p>
          {!currentAccount && (
            <button
              type="button"
              onClick={connectWallet}
              className="flex flex-row justify-center items-center my-5 bg-[#2952e3] p-3 rounded-full cursor-pointer hover:bg-[#2546bd]"
            >
              <span className="text-white mr-2">▶</span>
              <p className="text-white text-base font-semibold">连接钱包</p>
            </button>
          )}

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className={`rounded-tl-2xl ${companyCommonStyles}`}>可靠性</div>
            <div className={companyCommonStyles}>安全性</div>
            <div className={`sm:rounded-tr-2xl ${companyCommonStyles}`}>以太坊</div>
            <div className={`sm:rounded-bl-2xl ${companyCommonStyles}`}>Web 3.0</div>
            <div className={companyCommonStyles}>低手续费</div>
            <div className={`rounded-br-2xl ${companyCommonStyles}`}>区块链</div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 flex justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <p className="text-white font-bold">ETH</p>
                </div>
                <span className="text-white">ⓘ</span>
              </div>
              <div>
                <p className="text-white font-light text-sm">{shortenAddress(currentAccount)}</p>
                <p className="text-white font-semibold text-lg mt-1">以太坊</p>
              </div>
            </div>
          </div>
          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <Input placeholder="接收地址" name="addressTo" type="text" handleChange={handleChange} />
            <Input placeholder="金额 (ETH)" name="amount" type="number" handleChange={handleChange} />
            <Input placeholder="关键词 (Gif)" name="keyword" type="text" handleChange={handleChange} />
            <Input placeholder="输入消息" name="message" type="text" handleChange={handleChange} />

            <div className="h-[1px] w-full bg-gray-400 my-2" />

            {isLoading ? (
              <Loader />
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] hover:bg-[#3d4f7c] rounded-full cursor-pointer"
              >
                立即发送
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
