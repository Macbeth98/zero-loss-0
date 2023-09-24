import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import { PRIVATE_KEY, SEPOLIA_URL, GOERLI_URL, LINEA_TESTNET_URL } from './network-config';

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  etherscan: {
    apiKey: 'GMW3CW74BPY41P6KDX81318RHZWHVUR749',
  },
  networks: {
    hardhat: {
      forking: {
        url: GOERLI_URL,
        blockNumber: 9749596,
      },
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
    goerli: {
      url: GOERLI_URL,
      accounts: [PRIVATE_KEY],
    },
    linea_testnet: {
      url: LINEA_TESTNET_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

export default config;
