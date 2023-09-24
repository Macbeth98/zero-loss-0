export const raffleFactoryABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'raffle',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'RaffleCreated',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'assetAddress',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'nativeFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'entranceFee',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'interval',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'accureInterval',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: 'vrfCoordinator',
        type: 'address',
      },
      {
        internalType: 'bytes32',
        name: 'gasLane',
        type: 'bytes32',
      },
      {
        internalType: 'uint64',
        name: 'subscriptionId',
        type: 'uint64',
      },
      {
        internalType: 'uint32',
        name: 'callbackGasLimit',
        type: 'uint32',
      },
      {
        internalType: 'address',
        name: 'liquidityProviderAddress',
        type: 'address',
      },
    ],
    name: 'createRaffle',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRaffleCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getRaffles',
    outputs: [
      {
        internalType: 'address[]',
        name: '',
        type: 'address[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];
