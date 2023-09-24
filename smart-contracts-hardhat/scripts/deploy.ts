import { ethers } from 'hardhat';

async function main() {
  const raffleFactory = await ethers.deployContract('RaffleFactory');

  await raffleFactory.waitForDeployment();

  console.log(`RaffleFactory deployed to ${raffleFactory.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
