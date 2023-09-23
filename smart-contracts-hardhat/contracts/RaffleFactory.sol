// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {Raffle} from "./Raffle.sol";

/**
 * @title A Raffle Factory Contract
 * @notice This contract is for creating a simple Raffle contract
 */
contract RaffleFactory {
    /** State Variables */
    address[] private s_raffles;

    /** Events */
    event RaffleCreated(address indexed raffle, address indexed creator);

    /** Functions */
    function createRaffle(
        address assetAddress,
        uint256 nativeFee,
        uint256 entranceFee,
        uint256 interval,
        uint256 accureInterval,
        address vrfCoordinator,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit,
        address liquidityProviderAddress
    ) external {
        Raffle raffle = new Raffle(
            assetAddress,
            nativeFee,
            entranceFee,
            interval,
            accureInterval,
            liquidityProviderAddress,
            vrfCoordinator,
            gasLane,
            subscriptionId,
            callbackGasLimit
        );
        s_raffles.push(address(raffle));
        emit RaffleCreated(address(raffle), msg.sender);
    }

    function getRaffles() external view returns (address[] memory) {
        return s_raffles;
    }

    function getRaffleCount() external view returns (uint256) {
        return s_raffles.length;
    }
}
