---
sidebar_position: 4
title: Smart Contracts
description: Working with Cairo smart contracts in Scaffold Stark React Native.
---

# Smart Contracts (snfoundry Package)

The `packages/snfoundry` directory contains the smart contract development environment. This package is **identical to Scaffold Stark 2**, ensuring full compatibility between web and mobile frontends.

## Overview

```
packages/snfoundry/
├── contracts/                 # Cairo smart contracts
│   └── src/
│       ├── YourContract.cairo # Your contracts
│       └── lib.cairo          # Module declarations
├── deployments/               # Deployment artifacts
├── scripts-ts/                # Deployment scripts
├── Scarb.toml                 # Cairo package config
├── snfoundry.toml             # Foundry config
└── package.json               # Scripts and dependencies
```

## Reference Documentation

Since the `snfoundry` package is identical to Scaffold Stark 2, refer to the main documentation for comprehensive guides:

- [Installation & Setup](/quick-start/installation) - Setting up the development environment
- [Deploy Smart Contracts](/deploying/deploy-smart-contracts) - Deployment guide
- [Environment Configuration](/quick-start/environment) - Network and account setup

## Available Commands

Run these commands from the project root:

| Command | Description |
|---------|-------------|
| `yarn chain` | Start local Starknet devnet on port 5050 |
| `yarn compile` | Compile Cairo contracts with Scarb |
| `yarn deploy` | Deploy contracts to the active network |
| `yarn deploy:clear` | Deploy with reset (clear previous deployments) |
| `yarn deploy:no-reset` | Deploy without resetting existing contracts |
| `yarn test` | Run contract tests with snforge |
| `yarn verify` | Verify contracts on Starkscan/Voyager |

### Starting Local Development

```bash
# Terminal 1: Start local devnet
yarn chain

# Terminal 2: Deploy contracts
yarn deploy

# Terminal 3: Start mobile app
yarn ios  # or yarn android
```

## Writing Contracts

### Basic Contract Example

```cairo
// contracts/src/YourContract.cairo
#[starknet::contract]
mod YourContract {
    use starknet::ContractAddress;
    use starknet::get_caller_address;

    #[storage]
    struct Storage {
        greeting: felt252,
        owner: ContractAddress,
        balances: LegacyMap<ContractAddress, u256>,
    }

    #[event]
    #[derive(Drop, starknet::Event)]
    enum Event {
        GreetingChanged: GreetingChanged,
    }

    #[derive(Drop, starknet::Event)]
    struct GreetingChanged {
        #[key]
        user: ContractAddress,
        new_greeting: felt252,
    }

    #[constructor]
    fn constructor(ref self: ContractState, initial_greeting: felt252) {
        self.greeting.write(initial_greeting);
        self.owner.write(get_caller_address());
    }

    #[external(v0)]
    fn set_greeting(ref self: ContractState, new_greeting: felt252) {
        let caller = get_caller_address();
        self.greeting.write(new_greeting);
        self.emit(GreetingChanged { user: caller, new_greeting });
    }

    #[external(v0)]
    fn get_greeting(self: @ContractState) -> felt252 {
        self.greeting.read()
    }

    #[external(v0)]
    fn get_balance(self: @ContractState, account: ContractAddress) -> u256 {
        self.balances.read(account)
    }
}
```

### Register Contract Module

```cairo
// contracts/src/lib.cairo
mod YourContract;
// Add more modules as needed
mod AnotherContract;
```

## Deployment Configuration

### Environment Setup

Create a `.env` file in `packages/snfoundry/`:

```bash
# packages/snfoundry/.env

# Local Devnet (default)
# No configuration needed - uses localhost:5050

# Sepolia Testnet
RPC_URL_SEPOLIA=https://starknet-sepolia.public.blastapi.io/rpc/v0_8
ACCOUNT_ADDRESS_SEPOLIA=0x...your_account_address
PRIVATE_KEY_SEPOLIA=0x...your_private_key

# Mainnet
RPC_URL_MAINNET=https://starknet-mainnet.public.blastapi.io/rpc/v0_8
ACCOUNT_ADDRESS_MAINNET=0x...your_account_address
PRIVATE_KEY_MAINNET=0x...your_private_key
```

### Deployment Script

```typescript
// scripts-ts/deploy.ts
import { deployContract, deployer } from "./helpers";

async function main() {
  // Deploy with constructor arguments
  await deployContract({
    contract: "YourContract",
    constructorArgs: {
      initial_greeting: "Hello, Starknet!",
    },
  });

  // Deploy another contract
  await deployContract({
    contract: "AnotherContract",
    constructorArgs: {},
  });
}

main();
```

### Deploy to Different Networks

```bash
# Deploy to local devnet (default)
yarn deploy

# Deploy to Sepolia testnet
yarn deploy --network sepolia

# Deploy to mainnet
yarn deploy --network mainnet
```

## Testing Contracts

### Writing Tests

```cairo
// tests/test_your_contract.cairo
use snforge_std::{declare, ContractClassTrait};

#[test]
fn test_greeting() {
    // Declare and deploy
    let contract = declare('YourContract');
    let contract_address = contract.deploy(@array!['Hello']).unwrap();

    // Create dispatcher
    let dispatcher = IYourContractDispatcher { contract_address };

    // Test read
    let greeting = dispatcher.get_greeting();
    assert(greeting == 'Hello', 'Wrong initial greeting');

    // Test write
    dispatcher.set_greeting('World');
    let new_greeting = dispatcher.get_greeting();
    assert(new_greeting == 'World', 'Greeting not updated');
}

#[test]
#[should_panic(expected: ('Only owner', ))]
fn test_unauthorized() {
    // Test that should panic
}
```

### Running Tests

```bash
# Run all tests
yarn test

# Run specific test file
yarn test tests/test_your_contract.cairo

# Run with verbose output
yarn test -v
```

## Contract Verification

Verify your contracts on block explorers:

```bash
# Verify on Starkscan (Sepolia)
yarn verify --network sepolia

# Verify on Voyager
yarn verify --network sepolia --explorer voyager
```

## Auto-Generated Types

When you run `yarn deploy`, the deployment script automatically:

1. Compiles your contracts
2. Deploys to the target network
3. Generates TypeScript types in `packages/rn/contracts/deployedContracts.ts`

```typescript
// packages/rn/contracts/deployedContracts.ts (auto-generated)
export const contracts = {
  devnet: {
    YourContract: {
      address: "0x...",
      abi: [...],
      classHash: "0x...",
    },
  },
  sepolia: {
    YourContract: {
      address: "0x...",
      abi: [...],
      classHash: "0x...",
    },
  },
} as const;
```

This enables type-safe contract interactions in your React Native app:

```typescript
// Type-safe hook usage
const { data } = useScaffoldReadContract({
  contractName: "YourContract",  // Autocomplete from deployedContracts
  functionName: "get_greeting",  // Autocomplete from ABI
});
```

## Sharing Contracts with Web

Since `snfoundry` is identical between Scaffold Stark 2 and React Native, you can:

1. **Share contracts** between web and mobile projects
2. **Deploy once**, use everywhere
3. **Maintain consistency** across platforms

### Example: Shared Contract Repository

```
my-starknet-project/
├── contracts/           # Shared Cairo contracts
│   └── src/
│       └── Token.cairo
├── web-app/             # Scaffold Stark 2
│   └── packages/
│       ├── nextjs/
│       └── snfoundry/   # Symlink to ../contracts
└── mobile-app/          # Scaffold Stark RN
    └── packages/
        ├── rn/
        └── snfoundry/   # Symlink to ../contracts
```

## Compatible Versions

| Tool | Version |
|------|---------|
| Scarb | 2.14.0 |
| Starknet Foundry | 0.54.0 |
| Cairo | 2.14.x |
| starknet.js | 9.2.1 |
| Starknet Devnet | 0.7.1 |

## Troubleshooting

### Compilation Errors

```bash
# Check Scarb version
scarb --version

# Clean and recompile
yarn clean && yarn compile
```

### Deployment Failures

```bash
# Check devnet is running
curl http://localhost:5050/is_alive

# Check account balance
yarn chain  # Devnet provides prefunded accounts
```

### Type Generation Issues

```bash
# Regenerate types
yarn deploy:clear
```

## Next Steps

- [Hooks Reference](./hooks/hooks-overview) - Use contracts in your app
- [Recipes](./recipes) - Practical usage recipes
- [Mobile Considerations](./mobile-considerations) - Mobile-specific tips
