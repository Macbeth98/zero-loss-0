// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;

import {VRFCoordinatorV2Interface} from "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import {VRFConsumerBaseV2} from "@chainlink/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol";
import {ILiquidityProvider} from "./interfaces/ILiquidityProvider.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeMath} from "@openzeppelin/contracts/utils/math/SafeMath.sol";

/**
 * @title A Raffle Contract
 * @notice This contract is for creating a simple Raffle contract
 * @dev Implements Chainlink VRF v2
 * @dev Implements Chainlink Upkeep
 */
contract Raffle is VRFConsumerBaseV2 {
    error Raffle__NotEnoughNativeFeeSent();
    error Raffle__NotEnoughTokensSent();
    error Raffle__TransferFailed();
    error Raffle__RaffleNotOpen(RaffleState raffleState);
    error Raffle__UpkeepNotNeeded(uint256 currentBalance, uint256 raffleState);
    error Raffle__InsufficientFunds();
    error Raffle__RaffleNotClosed(RaffleState raffleState);

    /** Type Declarations */
    enum RaffleState {
        OPEN,
        ACCURING,
        WITHDRAWN,
        CALCULATING,
        CLOSED
    }

    /** State Variables */
    uint16 private constant REQUEST_CONFIRMATIONS = 3;
    uint32 private constant NUM_WORDS = 1;

    uint256 private immutable i_entranceFee;
    // @dev Duration for which the users can supply funds to raffle in seconds
    uint256 private immutable i_interval;
    // @dev Duartion for which the funds are accuring interest at the liquidityProvider in seconds
    uint256 private immutable i_accureInterval;
    VRFCoordinatorV2Interface private immutable i_vrfCoordinator;
    bytes32 private immutable i_gasLane;
    uint64 private immutable i_subscriptionId;
    uint32 private immutable i_callbackGasLimit;
    address private immutable i_deployerAddress;

    uint256 private s_lastTimeStamp;
    address payable[] private s_players;
    mapping(address => uint256) private s_playersAmount;
    address private s_recentWinner;
    RaffleState private s_raffleState;
    uint256 private s_nativeFee;

    uint256 private s_poolSupplyAmount;
    uint256 private s_poolRewardsAmount;

    bool private s_transferedTokens;
    bool private s_withdrawnTokens;

    IERC20 private asset;
    ILiquidityProvider private liquidityProvider;

    /** Events */
    event EnteredRaffle(
        address indexed player,
        uint256 amount,
        uint256 totalAmount
    );
    event RaffleWinner(
        address indexed winner,
        uint256 suppliedAmount,
        uint256 rewardsAmount
    );
    event RequestedRaffleWinner(uint256 indexed requestId);

    event ExitedRaffle(address indexed player, uint256 amount);
    event WinnerWithdrewRewards(
        address indexed winner,
        uint256 amount,
        uint256 rewardsAmount
    );

    /** Functions */
    constructor(
        address assetAddress,
        uint256 nativeFee,
        uint256 entranceFee,
        uint256 interval,
        uint256 accureInterval,
        address liquidityProviderAddress,
        address vrfCoordinator,
        bytes32 gasLane,
        uint64 subscriptionId,
        uint32 callbackGasLimit
    ) VRFConsumerBaseV2(vrfCoordinator) {
        asset = IERC20(assetAddress);
        i_entranceFee = entranceFee;
        s_nativeFee = nativeFee;
        i_interval = interval;
        i_accureInterval = accureInterval;

        i_vrfCoordinator = VRFCoordinatorV2Interface(vrfCoordinator);
        i_gasLane = gasLane;
        i_subscriptionId = subscriptionId;
        i_callbackGasLimit = callbackGasLimit;

        i_deployerAddress = msg.sender;

        s_lastTimeStamp = block.timestamp;
        s_raffleState = RaffleState.OPEN;
        liquidityProvider = ILiquidityProvider(liquidityProviderAddress);

        s_transferedTokens = false;
        s_withdrawnTokens = false;

        asset.approve(address(liquidityProvider), type(uint256).max);
    }

    /**
     * @notice This function is used to enter into the raffle.
     * @notice This function is payable, and the user is required to pay a small nativeFee for the transfers.
     * @notice This function will transfer the tokens amounting to entranceFee from the user to the contract.
     * @dev This function will revert if the raffle is not in OPEN state.
     */
    function enterRaffle(uint256 transferAmount) external payable {
        if (msg.value < s_nativeFee) {
            revert Raffle__NotEnoughNativeFeeSent();
        }

        if (s_raffleState != RaffleState.OPEN) {
            revert Raffle__RaffleNotOpen(s_raffleState);
        }

        if (transferAmount < i_entranceFee) {
            revert Raffle__NotEnoughTokensSent();
        }

        uint256 count = SafeMath.div(transferAmount, i_entranceFee);

        transferAmount = SafeMath.mul(count, i_entranceFee);

        asset.transferFrom(msg.sender, address(this), transferAmount);

        unchecked {
            for (uint256 i = 0; i < count; i++) {
                s_players.push(payable(msg.sender));
            }
        }

        s_playersAmount[msg.sender] += transferAmount;

        emit EnteredRaffle(
            msg.sender,
            transferAmount,
            s_playersAmount[msg.sender]
        );
    }

    function checkTimeHasPassed(uint256 interval) internal view returns (bool) {
        return (block.timestamp - s_lastTimeStamp >= interval);
    }

    /**
     * @notice This is function that the Chainlink automation nodes call to see if it's time to perform an upkeep.
     */
    function checkUpkeep(
        bytes memory /* checkData */
    ) public view returns (bool upkeepNeeded, bytes memory /* performData */) {
        if (s_raffleState == RaffleState.CLOSED) {
            upkeepNeeded = false;
            return (upkeepNeeded, "0x0");
        }

        if (!s_transferedTokens) {
            bool timeHasPassed = checkTimeHasPassed(i_interval);
            bool hasBalance = asset.balanceOf(address(this)) > 0;
            bool hasPlayers = s_players.length > 0;
            bool canTransferFunds = timeHasPassed && hasBalance && hasPlayers;

            if (canTransferFunds) {
                upkeepNeeded = true;
                return (upkeepNeeded, "0x0");
            }
        }

        if (!s_withdrawnTokens) {
            bool timeHasPassed = checkTimeHasPassed(i_accureInterval);

            if (timeHasPassed) {
                upkeepNeeded = true;
                return (upkeepNeeded, "0x0");
            }
        }
    }

    function performUpkeep(bytes calldata /* performData */) external {
        (bool upkeepNeeded, ) = checkUpkeep("");
        if (!upkeepNeeded) {
            revert Raffle__UpkeepNotNeeded(
                address(this).balance,
                uint256(s_raffleState)
            );
        }

        if (s_raffleState == RaffleState.OPEN && !s_transferedTokens) {
            supplyTokens();
        } else if (
            s_raffleState == RaffleState.ACCURING && !s_withdrawnTokens
        ) {
            withdrawTokens();
        }
    }

    function supplyTokens() internal {
        s_transferedTokens = true;
        s_raffleState = RaffleState.ACCURING;
        s_lastTimeStamp = block.timestamp;

        s_poolSupplyAmount = asset.balanceOf(address(this));

        liquidityProvider.supply(
            address(this),
            address(asset),
            s_poolSupplyAmount
        );
    }

    function withdrawTokens() internal {
        s_withdrawnTokens = true;
        s_raffleState = RaffleState.WITHDRAWN;

        liquidityProvider.withdrawSupplyAndRewards(
            address(this),
            address(asset)
        );

        s_poolRewardsAmount =
            asset.balanceOf(address(this)) -
            s_poolSupplyAmount;
        requestPickWinner();
    }

    function requestPickWinner() internal {
        // Check enough time has passed

        s_raffleState = RaffleState.CALCULATING;

        // Chainlink VRF (Verifiable Random Function)
        uint256 requestId = i_vrfCoordinator.requestRandomWords(
            i_gasLane, // gas lane
            i_subscriptionId,
            REQUEST_CONFIRMATIONS,
            i_callbackGasLimit,
            NUM_WORDS
        );

        emit RequestedRaffleWinner(requestId);
    }

    function fulfillRandomWords(
        uint256 /* requestId */,
        uint256[] memory randomWords
    ) internal override {
        uint256 indexOfWinner = randomWords[0] % s_players.length;
        address payable winner = s_players[indexOfWinner];
        s_recentWinner = winner;

        s_raffleState = RaffleState.CLOSED;
        s_lastTimeStamp = block.timestamp;

        emit RaffleWinner(winner, s_playersAmount[winner], s_poolRewardsAmount);
    }

    function playerWithdrawFunds() external {
        if (s_raffleState != RaffleState.CLOSED) {
            revert Raffle__RaffleNotClosed(s_raffleState);
        }

        uint256 amount = s_playersAmount[msg.sender];

        if (amount == 0) {
            revert Raffle__InsufficientFunds();
        }

        bool isWinner = false;

        if (msg.sender == s_recentWinner) {
            amount += s_poolRewardsAmount;
            isWinner = true;
        }

        s_playersAmount[msg.sender] = 0;

        asset.transfer(msg.sender, amount);

        emit ExitedRaffle(msg.sender, amount);
        if (isWinner) {
            emit WinnerWithdrewRewards(msg.sender, amount, s_poolRewardsAmount);
        }
    }

    /**
     * Getter Functions
     */

    function getAssetAddress() external view returns (address) {
        return address(asset);
    }

    function getLiquidityProviderAddress() external view returns (address) {
        return address(liquidityProvider);
    }

    function getEntranceFee() external view returns (uint256) {
        return i_entranceFee;
    }

    function getInterval() external view returns (uint256) {
        return i_interval;
    }

    function getAccureInterval() external view returns (uint256) {
        return i_accureInterval;
    }

    function getNativeFee() external view returns (uint256) {
        return s_nativeFee;
    }

    function getRaffleState() external view returns (RaffleState) {
        return s_raffleState;
    }

    function getPlayer(uint256 indexOfPlayer) external view returns (address) {
        return s_players[indexOfPlayer];
    }

    function getPlayerAmount(address player) external view returns (uint256) {
        return s_playersAmount[player];
    }

    function getPoolSupplyAmount() external view returns (uint256) {
        return s_poolSupplyAmount;
    }

    function getRecentWinner() external view returns (address) {
        return s_recentWinner;
    }

    function getPoolRewardsAmount() external view returns (uint256) {
        if (s_transferedTokens && !s_withdrawnTokens) {
            return
                liquidityProvider.getBalance(address(this)) -
                s_poolSupplyAmount;
        }
        return s_poolRewardsAmount;
    }

    function getPlayersCount() external view returns (uint256) {
        return s_players.length;
    }

    function getLastTimeStamp() external view returns (uint256) {
        return s_lastTimeStamp;
    }
}
