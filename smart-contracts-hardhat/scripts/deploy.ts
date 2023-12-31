import { ethers } from 'hardhat';
import {
  ENTRANCE_FEE,
  NATIVE_FEE,
  USDC_ADDRESS,
  USDC_DECIMALS,
  accureInterval,
  chainLinkConfig,
  comet_USDC,
  compoundCometRewards,
  interval,
  parseEther,
  parseUnits,
} from '../utils';

async function deployRaffleFactory() {
  const raffleFactory = await ethers.deployContract('RaffleFactory');

  await raffleFactory.waitForDeployment();

  console.log(`RaffleFactory deployed to ${raffleFactory.target}`);

  return raffleFactory;
}

const deployCompoundLiquidityProvider = async () => {
  const compoundLiquidityProvider = await ethers.deployContract('CompoundLiquidityProvider', [
    USDC_ADDRESS,
    comet_USDC,
    compoundCometRewards,
  ]);
  await compoundLiquidityProvider.waitForDeployment();
  console.log(`CompoundLiquidityProvider deployed to ${compoundLiquidityProvider.target}`);
  return compoundLiquidityProvider;
};

async function createRaffle(
  factoryAddress: string = '0x188D96ACfC2bf6092264E46fB72Bf7BF068E4128',
  liquidityProvider: string = '0x34Dbc2e9DD2E53dF96dC8B33b716bDf5eA35ebd4'
) {
  const raffleFactory = await ethers.getContractAt('RaffleFactory', factoryAddress);
  const tx = await raffleFactory.createRaffle(
    USDC_ADDRESS,
    parseEther(NATIVE_FEE),
    parseUnits(ENTRANCE_FEE, USDC_DECIMALS),
    interval,
    accureInterval,
    chainLinkConfig.GOERLI.vrfCoordinator,
    chainLinkConfig.GOERLI.gasLane,
    chainLinkConfig.GOERLI.subscriptionId,
    chainLinkConfig.GOERLI.callbackGasLimit,
    liquidityProvider
  );

  console.log(`Raffle created at ${tx.hash}`);

  return tx;
}

async function main(predefined: boolean = true) {
  if (predefined) {
    return await createRaffle();
  }
  await deployRaffleFactory();
  await deployCompoundLiquidityProvider();
}

async function createRaffleScript() {
  const raffleFactory = await deployRaffleFactory();
  const compoundLiquidityProvider = await deployCompoundLiquidityProvider();

  const tx = await createRaffle(raffleFactory.target.toString(), compoundLiquidityProvider.target.toString());
  const txReceipt = await tx.wait();
  console.log('Raffle contract Adddress: ', txReceipt?.contractAddress);
}

main(false).catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

export { deployRaffleFactory, deployCompoundLiquidityProvider, createRaffle, createRaffleScript };
