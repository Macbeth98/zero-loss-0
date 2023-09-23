// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

interface ICompoundCometRewards {
    error NotSupported(address);

    struct RewardOwed {
        address token;
        uint owed;
    }

    event RewardClaimed(
        address indexed src,
        address indexed recipient,
        address indexed token,
        uint256 amount
    );

    function getRewardOwed(
        address comet,
        address account
    ) external returns (RewardOwed memory);

    function claim(address comet, address src, bool shouldAccrue) external;
}
