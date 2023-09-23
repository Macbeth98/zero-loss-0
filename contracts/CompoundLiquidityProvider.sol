// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {ILiquidityProvider} from "./interfaces/ILiquidityProvider.sol";
import {ICompoundComet} from "./interfaces/ICompoundComet.sol";
import {ICompoundCometRewards} from "./interfaces/ICompoundCometRewards.sol";

/**
 * @title Compound Liquidity Provider
 * @notice This contract is for interacting with the Compound Protocol
 * @dev Implements ILiquidityProvider
 */
contract CompoundLiquidityProvider is ILiquidityProvider {
    address private immutable i_cToken;
    ICompoundComet public compoundComet;
    ICompoundCometRewards public compoundCometRewards;

    constructor(address _cToken, address _cComet, address _cCometRewards) {
        i_cToken = _cToken;
        compoundComet = ICompoundComet(_cComet);
        compoundCometRewards = ICompoundCometRewards(_cCometRewards);
    }

    function supply(address dst, address asset, uint amount) external {
        compoundComet.supplyTo(dst, asset, amount);
    }

    function withdraw(address to, address asset, uint amount) external {
        compoundComet.withdrawTo(to, asset, amount);
    }

    function withdrawSupplyAndRewards(address account, address asset) external {
        compoundComet.withdrawTo(account, asset, type(uint256).max);
        compoundCometRewards.claim(address(compoundComet), account, true);
    }

    function getBalance(address account) external view returns (uint256) {
        return compoundComet.balanceOf(account);
    }
}
