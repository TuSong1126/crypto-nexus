import React from 'react'

const Welcome: React.FC = () => {
  return (
    <div className="flex w-full justify-center items-center">
      <div className="flex mf:flex-row flex-col items-start justify-between md:p-20 py-12 px-4">
        <div className="flex flex-1 justify-start flex-col mf:mr-10">
          <h1 className="text-3xl sm:text-5xl text-white text-gradient py-1">
            在区块链上
            <br />
            发送加密货币
          </h1>
          <p className="text-left mt-5 text-white font-light md:w-9/12 w-11/12 text-base">
            探索加密世界。在以太坊区块链上安全地交易加密货币。
          </p>

          <div className="grid sm:grid-cols-3 grid-cols-2 w-full mt-10">
            <div className="rounded-tl-2xl min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white">
              可靠性
            </div>
            <div className="min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white">
              安全性
            </div>
            <div className="rounded-tr-2xl min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white">
              以太坊
            </div>
            <div className="rounded-bl-2xl min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white">
              Web 3.0
            </div>
            <div className="min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white">
              低手续费
            </div>
            <div className="rounded-br-2xl min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-white">
              区块链
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1 items-center justify-start w-full mf:mt-0 mt-10">
          <div className="p-3 justify-end items-start flex-col rounded-xl h-40 sm:w-72 w-full my-5 eth-card white-glassmorphism">
            <div className="flex justify-between flex-col w-full h-full">
              <div className="flex justify-between items-start">
                <div className="w-10 h-10 rounded-full border-2 border-white flex justify-center items-center">
                  <p className="text-white font-bold">ETH</p>
                </div>
              </div>
              <div>
                <p className="text-white font-light text-sm">0xabcd...1234</p>
                <p className="text-white font-semibold text-lg mt-1">以太坊</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism">
            <button
              type="button"
              className="text-white w-full mt-2 border-[1px] p-2 border-[#3d4f7c] rounded-full cursor-pointer"
            >
              连接钱包
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Welcome
