import { ethers } from 'hardhat';
import { BigNumber } from '@ethersproject/bignumber';
import { PRIVATE_KEY, SEPOLIA_URL, GOERLI_URL } from './network-config';

const USDC_ADDRESS = '0x07865c6E87B9F70255377e024ace6630C1Eaa37F';
const USDC_DECIMALS = 6;

const NATIVE_FEE = 0.0001;
const ENTRANCE_FEE = 10;
const interval = 500;
const accureInterval = 500;

const chainLinkConfig = {
  SEPOLIA: {
    vrfCoordinator: '0x8103B0A8A00be2DDC778e6e7eaa21791Cd364625',
    gasLane: '0x474e34a077df58807dbe9c96d3c009b23b3c6d0cce433e59bbf5b34f823bc56c',
    subscriptionId: '',
    callbackGasLimit: 500000,
  },
  GOERLI: {
    vrfCoordinator: '0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D',
    gasLane: '0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15',
    subscriptionId: 14483,
    callbackGasLimit: 500000,
  },
};

const comet_USDC = '0x3EE77595A8459e93C2888b13aDB354017B198188';
const compoundCometRewards = '0xef9e070044d62C38D2e316146dDe92AD02CF2c2c';

const bigNumber = (num: number | string) => {
  return BigNumber.from(num);
};

const parseEther = (num: number | string) => {
  return ethers.parseEther(num.toString());
};

const parseUnits = (num: number | string, decimals: number) => {
  return ethers.parseUnits(num.toString(), 6);
};

export {
  SEPOLIA_URL,
  GOERLI_URL,
  PRIVATE_KEY,
  USDC_ADDRESS,
  USDC_DECIMALS,
  NATIVE_FEE,
  ENTRANCE_FEE,
  interval,
  accureInterval,
  chainLinkConfig,
  comet_USDC,
  compoundCometRewards,
  bigNumber,
  parseEther,
  parseUnits,
};
