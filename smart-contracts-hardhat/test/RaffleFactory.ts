import { expect } from 'chai';
import { createRaffle, deployCompoundLiquidityProvider, deployRaffleFactory } from '../scripts/deploy';
import { ILiquidityProvider, RaffleFactory } from '../typechain-types';

describe('RaffleFactory', () => {
  let raffleFactory: RaffleFactory;
  let liquidityProvider: ILiquidityProvider;

  before(async () => {
    raffleFactory = await deployRaffleFactory();
    liquidityProvider = await deployCompoundLiquidityProvider();
  });

  it('should create a raffle', async () => {
    const tx = await createRaffle(raffleFactory.target.toString(), liquidityProvider.target.toString());
    await tx.wait();

    const raffles = await raffleFactory.getRaffles();
    console.log('Raffles: ', raffles);
    expect(raffles.length).to.equal(1);
  });
});
