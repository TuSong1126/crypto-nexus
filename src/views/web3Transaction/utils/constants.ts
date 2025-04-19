// 【目前部署合约后需要手动更新】npx hardhat run scripts/deploy.js  --network sepolia
// 数据来源于solidityContract项目执行部署脚本后，得到合约部署地址和abi的json文件

import abiJson from '../../../../solidityContract/artifacts/contracts/Transactions.sol/Transactions.json'
export const contractABI = abiJson.abi

export const contractAddress = '0x16090eCD30F0b425dD36ae55CA83fFF13514da90'
