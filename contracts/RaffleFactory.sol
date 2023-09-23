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
        uint256 entranceFee,
        uint256 interval,
        address vrfCoordinator,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit,
        address liquidityProviderAddress
    ) external {
        Raffle raffle = new Raffle(
            entranceFee,
            interval,
            vrfCoordinator,
            gasLane,
            subscriptionId,
            callbackGasLimit,
            liquidityProviderAddress
        );
        s_raffles.push(address(raffle));
        emit RaffleCreated(address(raffle), msg.sender);
    }
}
