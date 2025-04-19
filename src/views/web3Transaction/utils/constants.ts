// 【目前部署合约后需要手动更新】npx hardhat run scripts/deploy.js  --network sepolia
// 数据来源于solidityContract项目执行部署脚本后，得到合约部署地址和abi的json文件

import abiJson from '../../../../solidityContract/artifacts/contracts/Transactions.sol/Transactions.json'
export const contractABI = abiJson.abi

export const contractAddress = '0x33F3a7c01c6BA7a10e18180723A47E87Afb4fFcE'
