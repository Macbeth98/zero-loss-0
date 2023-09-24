// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {ILiquidityProvider} from "./interfaces/ILiquidityProvider.sol";
import {IAAVEPool} from "./interfaces/IAAVEPool.sol";

/**
 * @title AAVE Liquidity Provider
 * @notice This contract is for interacting with the AAVE Protocol
 * @dev Implements ILiquidityProvider
 */
contract AAVELiquidityProvider is ILiquidityProvider {
    address private immutable asset;
    address private immutable rewardAsset;
    IAAVEPool public aavePool;
    IAAVEPool public aaveRewards;

    constructor(
        address _asset,
        address _rewardAsset,
        address _aavePool,
        address _aaveRewards
    ) {
        asset = _asset;
        rewardAsset = _rewardAsset;
        aavePool = IAAVEPool(_aavePool);
        aaveRewards = IAAVEPool(_aaveRewards);
    }

    function supply(address dst, address, uint amount) external override {
        aavePool.supply(asset, amount, dst, 0);
    }

    function withdraw(address to, address, uint amount) external override {
        aavePool.withdraw(asset, amount, to);
    }

    function withdrawSupplyAndRewards(
        address account,
        address
    ) external override {
        aavePool.withdraw(asset, type(uint256).max, account);

        address[] memory assets;
        assets[0] = asset;

        aaveRewards.claimRewards(
            assets,
            type(uint256).max,
            account,
            rewardAsset
        );
    }

    function getBalance(
        address account
    ) external view override returns (uint256) {
        return aavePool.balanceOf(account);
    }
}
