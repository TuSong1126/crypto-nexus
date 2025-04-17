// require('@nomicfoundation/hardhat-toolbox')
require('@nomiclabs/hardhat-waffle')

module.exports = {
  solidity: '0.8.17',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/-kGjWFWJ5szac8ifc_BnU911AcFM_B0O',
      // mainAccount 私钥
      accounts: ['0dfeadf69354d31e41528048c9ea8af654775f223d4eda1599b1b6ab657bfd5d']
    }
  }
}
