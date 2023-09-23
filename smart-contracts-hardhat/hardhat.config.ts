import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

const SEPOLIA_URL = 'https://ethereum-sepolia.blockpi.network/v1/rpc/public';
const SEPOLIA_PRIVATE_KEY = 'e0fde4f668d1148f89fbfd851dfb32981410fddaa020ee70a49b82a5defe54c6';

const config: HardhatUserConfig = {
  solidity: '0.8.19',
  etherscan: {
    apiKey: 'GMW3CW74BPY41P6KDX81318RHZWHVUR749',
  },
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [SEPOLIA_PRIVATE_KEY],
    },
  },
};

export default config;
