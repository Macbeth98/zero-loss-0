# Zero-Loss

This contains the smart contracts that are written for the zero-loss.
The projects were written, deployed and verfied using hardhat.

#### Approach

- There is a `RaffleFactory` contract that spits out a `Raffle` contract and keep track of the Raffles created.
- When creating a `Raffle`, it takes 10 Arguments.

  - **_assetAddress_**: The ERC20 token address, in which the Raffle will be pooled in.
  - **_nativeFee_**: A small charge in the native coin of the chain, for the gas fees.
    - In future, this will be pegged to USD, by utilizing price oracles.
  - **_entranceFee_**: The minimum amount of tokens that the Player should send to the Raffle.
  - **_interval_**: The duration in seconds during which the Raffle is in `OPEN` State and accepts pool deposits.
  - **_accureInterval_**: The duration in seconds during which the pool amount is transferred to the Liquidity Providers and earning interest.
  - **_liquidityProviderAddress_**: The address of the contract that implements `ILiquidityProvider`. The `ILiquidityProvider` abstracts the necessary methods from a Liquidty Provider that are needed, for example: `supply` and `withdraw` methods.
  - **_vrfCoordinator_**: The Chainlink's VRFv2 coordinator Address.
  - **_gasLane_**: Chainlink's specified gas key Hash.
  - **_subscriptionId_**: Chainlink's VRF subscription Id.
  - **_callbackGasLimit_**: The gas limit for the vrf call.

- Read more about `VRF` and the corresponding chainlink parameters [here](https://docs.chain.link/vrf/v2/introduction).
- The user enters the Raffle by executing `enterRaffle` method. But before calling this, the user must approve the transfer of the tokens by the Raffle contract.
- Once, the user enters the raffle, the user can set the amount that is being transferred, and is divided up by the `entranceFee`. The user will be inserted that many times in the array of user addresses.
  - For example, `EntranceFee` is 100 and the user sets the transfer amount has 1000, then the user will be 10 times in the array, which will give more probability for the user to win.
- The chainlink Automation is integrated through custom-logic by implementing `checkUpKeep` and `performUpKeep`.
- This will take care of when to transfer the pool funds to the set Liquidity provider and also withdraw the funds from the set Liquidity Provider.
- This will trigger an automatic raffle winner and the user will be awarded the initial amount + pooled earnings. Remaining will get their invest amount back. The user can get their tokens back by executing `withdrawTokens` method.

## Liquidity Pools

### Compound-Finance:

- Compound-Finance V3 was used as the Liquidity Provider, to where the funds are transferred and the funds will get interest from the supply.
- Implemented a Compound Liquidity Provider based on ILiquidity Provider.

### AAVE Finance:

- In the similar way, AAVE V3 is used as Liquidity Provider.

---

### Deployments

- RaffleFactory: [0x188D96ACfC2bf6092264E46fB72Bf7BF068E4128](https://goerli.etherscan.io/address/0x188D96ACfC2bf6092264E46fB72Bf7BF068E4128#code)
- Raffle: [0x188D96ACfC2bf6092264E46fB72Bf7BF068E4128](https://goerli.etherscan.io/address/0x188d96acfc2bf6092264e46fb72bf7bf068e4128#code)
