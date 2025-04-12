// 【目前部署合约后需要手动更新】数据来源于solidityContract项目执行部署脚本后，得到合约部署地址和abi的json文件

import abiJson from '../../../../solidityContract/artifacts/contracts/Transactions.sol/Transactions.json'
export const contractABI = abiJson.abi

export const contractAddress = '0x8437D63884B2F623ff4E0292E18bD6b48c10D3cd'
