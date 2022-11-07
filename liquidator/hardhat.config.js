const { task } = require("hardhat/config")
const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers")
const { BigNumber } = require("ethers")
require("@nomiclabs/hardhat-waffle")

// When using the hardhat network, you may choose to fork Fuji or Avalanche Mainnet
// This will allow you to debug contracts using the hardhat network while keeping the current network state
// To enable forking, turn one of these booleans on, and then run your tasks/scripts using ``--network hardhat``
// For more information go to the hardhat guide
// https://hardhat.org/hardhat-network/
// https://hardhat.org/guides/mainnet-forking.html
const FORK_FUJI = false
const FORK_MAINNET = true
const forkingData = FORK_FUJI ? {
  url: 'https://api.avax-test.network/ext/bc/C/rpc',
} : FORK_MAINNET ? {
  url: 'https://api.avax.network/ext/bc/C/rpc'
} : undefined

task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners()
  accounts.forEach((account) => {
    console.log(account.address)
  })
})

task("balances", "Prints the list of AVAX account balances", async (args, hre) => {
  const accounts = await hre.ethers.getSigners()
  for (const account of accounts) {
    const balance = await hre.ethers.provider.getBalance(
      account.address
    );
    console.log(`${account.address} has balance ${balance.toString()}`);
  }
})

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      // gasPrice: 225000000000,
      // // chainId retrieved from https://docs.avax.network/build/avalanchego-apis/contract-chain-c-chain-api/
      // chainId: !forkingData ? 43112 : undefined, //Only specify a chainId if we are not forking
      // forking: forkingData,
      chainId: 43114,
      gasPrice: 225000000000,
      forking: {
        url: "https://api.avax.network/ext/bc/C/rpc",
        enabled: true,
      },
    },
    // local: {
    //   url: 'http://localhost:9650/ext/bc/C/rpc',
    //   gasPrice: 225000000000,
    //   chainId: 43112,
    //   accounts: [
    //   ]
    // },
    // fuji: {
    //   url: 'https://api.avax-test.network/ext/bc/C/rpc',
    //   gasPrice: 225000000000,
    //   chainId: 43113,
    //   accounts: []
    // },
    mainnet: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      // gasPrice: 225000000000,
      chainId: 43114,
      accounts: []
    }
  },
  solidity: {
    compilers: [
      {
        version: "0.8.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ]
  },
}
