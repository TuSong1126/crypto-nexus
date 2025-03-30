// 这里是示例ABI，实际使用时需要替换为真实的合约ABI
export const contractABI = [
  {
    inputs: [
      {
        internalType: 'address payable',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'string',
        name: 'message',
        type: 'string'
      },
      {
        internalType: 'string',
        name: 'keyword',
        type: 'string'
      }
    ],
    name: 'addToBlockchain',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getAllTransactions',
    outputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address'
          },
          {
            internalType: 'address',
            name: 'receiver',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'message',
            type: 'string'
          },
          {
            internalType: 'uint256',
            name: 'timestamp',
            type: 'uint256'
          },
          {
            internalType: 'string',
            name: 'keyword',
            type: 'string'
          }
        ],
        internalType: 'struct Transactions.TransferStruct[]',
        name: '',
        type: 'tuple[]'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'getTransactionCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

// 示例合约地址，实际使用时需要替换为部署的合约地址
export const contractAddress = '0x0000000000000000000000000000000000000000'
