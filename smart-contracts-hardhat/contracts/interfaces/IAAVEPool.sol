// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

interface IAAVEPool {
    function supply(
        address asset,
        uint256 amount,
        address onBehalfOf,
        uint16 referralCode
    ) external;

    function withdraw(address asset, uint256 amount, address to) external;

    function claimRewards(
        address[] memory assets,
        uint256 amount,
        address to,
        address reward
    ) external;

    function balanceOf(address account) external view returns (uint256);
}
