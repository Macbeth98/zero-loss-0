// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

interface ICompoundComet {
    error Paused();
    error Unauthorized();

    struct UserBasic {
        int104 principal;
        uint64 baseTrackingIndex;
        uint64 baseTrackingAccrued;
        uint16 assetsIn;
    }

    event Supply(address indexed from, address indexed dst, uint amount);
    event Transfer(address indexed from, address indexed to, uint amount);
    event Withdraw(address indexed src, address indexed to, uint amount);

    function supply(address asset, uint amount) external;

    function supplyTo(address dst, address asset, uint amount) external;

    function supplyFrom(
        address from,
        address dst,
        address asset,
        uint amount
    ) external;

    function withdraw(address asset, uint amount) external;

    function withdrawTo(address to, address asset, uint amount) external;

    function withdrawFrom(
        address src,
        address to,
        address asset,
        uint amount
    ) external;

    function balanceOf(address account) external view returns (uint256);

    function userBasic(
        address account
    ) external view returns (UserBasic memory);
}
