// 【目前部署合约后需要手动更新】数据来源于solidityContract项目执行部署脚本后，得到合约部署地址和abi的json文件

import abiJson from '../../../../solidityContract/artifacts/contracts/Transactions.sol/Transactions.json'
export const contractABI = abiJson.abi

export const contractAddress = '0x2D395177615D171b1fdE3211041b0B04F1b22484'
