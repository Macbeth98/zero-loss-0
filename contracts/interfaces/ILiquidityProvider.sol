// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

/**
 * @title Liquidity Provider
 * @author Macbeth98
 * @notice The Raffle contract interacts with a Liquidity Provider that implements this interface.
 * @dev It is meant to Abstract the interaction with different Liquidity Protocols.
 */
interface ILiquidityProvider {
    function supply(address dst, address asset, uint amount) external;

    function withdraw(address to, address asset, uint amount) external;

    function withdrawSupplyAndRewards(address account, address asset) external;

    function getBalance(address account) external view returns (uint256);
}
