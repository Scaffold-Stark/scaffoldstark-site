---
sidebar_position: 3
title: Project Structure
description: Understanding the Scaffold Stark React Native monorepo structure.
---

# Project Structure

Scaffold Stark React Native is organized as a monorepo with two main packages: the React Native application and the smart contracts.

## Overview

```
scaffold-stark-rn/
├── packages/
│   ├── rn/                    # React Native Expo app
│   └── snfoundry/             # Smart contracts (Cairo)
├── package.json               # Root workspace configuration
├── yarn.lock                  # Dependency lock file
└── README.md                  # Project documentation
```

## packages/rn (React Native App)

The React Native application built with Expo.

```
packages/rn/
├── app/                       # Expo Router screens and layouts
│   ├── _layout.tsx            # Root layout with providers
│   ├── index.tsx              # Home screen
│   └── (tabs)/                # Tab-based navigation
│       ├── _layout.tsx        # Tab navigator configuration
│       └── ...                # Individual tab screens
├── assets/                    # Static assets (images, fonts)
├── components/                # Reusable React Native components
│   ├── scaffold-stark/        # Starknet-specific components
│   └── ui/                    # Generic UI components
├── configs/                   # App configuration files
│   └── scaffold.config.ts     # Scaffold Stark configuration
├── constants/                 # Application constants
├── contracts/                 # Generated contract data
│   └── deployedContracts.ts   # Auto-generated contract addresses/ABIs
├── hooks/                     # Custom React hooks
│   └── scaffold-stark/        # Starknet integration hooks
│       ├── useDeployedContractInfo.ts
│       ├── useScaffoldEventHistory.ts
│       ├── useScaffoldMultiWriteContract.ts
│       ├── useScaffoldReadContract.ts
│       ├── useScaffoldStrkBalance.ts
│       ├── useScaffoldWriteContract.ts
│       ├── useTargetNetwork.ts
│       └── useTransactor.ts
├── services/                  # Business logic and API services
├── stores/                    # State management (Zustand)
├── utils/                     # Utility functions
│   └── scaffold-stark/        # Starknet utilities
├── patches/                   # Dependency patches
├── app.json                   # Expo configuration
├── babel.config.js            # Babel configuration
├── metro.config.js            # Metro bundler configuration
├── tailwind.config.js         # NativeWind/Tailwind configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Package dependencies
└── .env.example               # Environment variable template
```

### Key Directories

#### `app/` - Screens and Navigation

Uses [Expo Router](https://docs.expo.dev/router/introduction/) for file-based routing. Each file in this directory automatically becomes a route.

```tsx
// app/index.tsx - Home screen at "/"
export default function HomeScreen() {
  return (
    <View>
      <Text>Welcome to Scaffold Stark RN</Text>
    </View>
  );
}
```

#### `components/` - Reusable Components

Contains both generic UI components and Starknet-specific components:

- `components/ui/` - Buttons, inputs, modals, etc.
- `components/scaffold-stark/` - Address display, balance components, etc.

#### `hooks/scaffold-stark/` - Starknet Hooks

The core of Scaffold Stark RN - hooks for interacting with smart contracts:

| Hook | Purpose |
|------|---------|
| `useScaffoldReadContract` | Read contract state |
| `useScaffoldWriteContract` | Send transactions |
| `useScaffoldMultiWriteContract` | Batch multiple transactions |
| `useDeployedContractInfo` | Get contract ABI and address |
| `useScaffoldEventHistory` | Query historical events |
| `useScaffoldStrkBalance` | Get STRK token balance |
| `useTargetNetwork` | Current network configuration |
| `useTransactor` | Transaction execution with notifications |

#### `contracts/` - Generated Contract Data

Contains auto-generated TypeScript files with deployed contract addresses and ABIs. Updated automatically when running `yarn deploy`.

```typescript
// contracts/deployedContracts.ts (auto-generated)
export const contracts = {
  devnet: {
    YourContract: {
      address: "0x...",
      abi: [...],
    },
  },
};
```

#### `stores/` - State Management

Uses [Zustand](https://zustand-demo.pmnd.rs/) for global state management:

```typescript
// Example store structure
import { create } from 'zustand';

interface GlobalState {
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (network: ChainWithAttributes) => void;
}

export const useGlobalState = create<GlobalState>((set) => ({
  targetNetwork: scaffoldConfig.targetNetworks[0],
  setTargetNetwork: (network) => set({ targetNetwork: network }),
}));
```

#### `configs/scaffold.config.ts` - Configuration

Central configuration file for the Scaffold Stark RN app:

```typescript
const scaffoldConfig = {
  targetNetworks: [chains.devnet, chains.sepolia],
  pollingInterval: 30000,
  // ... other configuration options
};
```

## packages/snfoundry (Smart Contracts)

The smart contract package - **identical to Scaffold Stark 2**. This ensures compatibility and allows sharing contracts between web and mobile apps.

```
packages/snfoundry/
├── contracts/                 # Cairo smart contracts
│   └── src/
│       ├── YourContract.cairo # Example contract
│       └── lib.cairo          # Module declarations
├── deployments/               # Deployment artifacts
│   └── devnet/                # Network-specific deployments
├── scripts-ts/                # TypeScript deployment scripts
│   ├── deploy.ts              # Main deployment script
│   └── helpers/               # Deployment utilities
├── scripts-cairo/             # Cairo scripts
├── Scarb.toml                 # Scarb package configuration
├── snfoundry.toml             # Starknet Foundry configuration
├── package.json               # Package dependencies
└── .env.example               # Environment variable template
```

### Key Files

#### `contracts/src/` - Cairo Contracts

Write your smart contracts here in Cairo:

```cairo
// contracts/src/YourContract.cairo
#[starknet::contract]
mod YourContract {
    #[storage]
    struct Storage {
        greeting: felt252,
    }

    #[external(v0)]
    fn set_greeting(ref self: ContractState, new_greeting: felt252) {
        self.greeting.write(new_greeting);
    }

    #[external(v0)]
    fn get_greeting(self: @ContractState) -> felt252 {
        self.greeting.read()
    }
}
```

#### `scripts-ts/deploy.ts` - Deployment Script

Customize contract deployment:

```typescript
// scripts-ts/deploy.ts
import { deployContract } from "./helpers";

async function main() {
  await deployContract({
    contract: "YourContract",
    constructorArgs: [],
  });
}

main();
```

#### `Scarb.toml` - Package Configuration

Cairo package manifest:

```toml
[package]
name = "contracts"
version = "0.1.0"

[dependencies]
starknet = ">=2.12.0"

[[target.starknet-contract]]
```

## Environment Variables

### packages/rn/.env

```bash
# Network Configuration
EXPO_PUBLIC_PROVIDER_URL=http://localhost:5050

# Wallet-as-a-Service (Production)
EXPO_PUBLIC_AEGIS_APP_ID=your_aegis_app_id

# Transaction Sponsorship (Production)
EXPO_PUBLIC_AVNU_API_KEY=your_avnu_api_key
```

### packages/snfoundry/.env

```bash
# Deployment Configuration
PRIVATE_KEY=your_private_key
RPC_URL_SEPOLIA=https://starknet-sepolia.public.blastapi.io/rpc/v0_8
ACCOUNT_ADDRESS=your_account_address
```

## Workflow

The typical development workflow:

```
1. Write/modify contracts in packages/snfoundry/contracts/
                    ↓
2. Compile with `yarn compile`
                    ↓
3. Test with `yarn test`
                    ↓
4. Deploy with `yarn deploy`
                    ↓
5. contracts/deployedContracts.ts is auto-updated
                    ↓
6. Use hooks in packages/rn/ to interact with contracts
```

## Related Documentation

- [Hooks Reference](./hooks/hooks-overview) - Learn about available hooks
- [Smart Contracts](./smart-contracts) - Detailed snfoundry documentation
- [Scaffold Stark 2 Docs](/quick-start/installation) - Web version documentation
