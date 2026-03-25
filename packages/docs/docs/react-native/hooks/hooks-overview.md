---
sidebar_position: 1
title: Hooks Overview
description: Overview of Scaffold Stark React Native hooks for Starknet integration.
---

# Hooks Overview

Scaffold Stark React Native provides a set of custom hooks that simplify interacting with Starknet smart contracts from your mobile application. These hooks are designed to work seamlessly with React Native and provide type-safe contract interactions.

## Available Hooks

### Contract Interaction Hooks

| Hook | Description |
|------|-------------|
| [useScaffoldReadContract](./useScaffoldReadContract) | Read data from smart contract view functions |
| [useScaffoldWriteContract](./useScaffoldWriteContract) | Execute write transactions on smart contracts |
| [useScaffoldMultiWriteContract](./useScaffoldMultiWriteContract) | Execute multiple transactions in a single batch |
| useScaffoldContract | Get a typed contract instance (starknet.Contract with ABI) |
| [useDeployedContractInfo](./useDeployedContractInfo) | Get deployed contract address and ABI |
| [useScaffoldEventHistory](./useScaffoldEventHistory) | Query historical contract events |
| useScaffoldWatchContractEvent | Watch a specific contract event in real-time |

### Account & Profile Hooks

| Hook | Description |
|------|-------------|
| [useScaffoldStrkBalance](./useScaffoldStrkBalance) | Get STRK token balance for an address |
| useScaffoldStarkProfile | Fetch Starknet ID profile (name, avatar) for an address |

### Network Hooks

| Hook | Description |
|------|-------------|
| [useTargetNetwork](./useTargetNetwork) | Get current target network configuration |
| useSwitchNetwork | Switch between available networks |
| useNetworkColor | Get theme-aware network display color |

### Wallet & Connection Hooks

| Hook | Description |
|------|-------------|
| useAutoConnect | Auto-reconnect wallet on app load (respects manual disconnect and TTL) |

### Low-Level Hooks

| Hook | Description |
|------|-------------|
| [useTransactor](./useTransactor) | Low-level transaction execution with fee estimation and notifications |
| useNativeCurrencyPrice | Poll and cache native currency price |
| useAnimationConfig | Get theme-aware animation configuration |

### WebSocket Hooks

| Hook | Description |
|------|-------------|
| useWebSocketData | Generic WebSocket data fetching |
| useScaffoldWebSocketEvents | Watch contract events via WebSocket |

## Comparison with Web Hooks

The React Native hooks are designed to mirror the Scaffold Stark 2 web hooks as closely as possible, with minor adaptations for the mobile environment:

| Feature | Web (SS2) | React Native |
|---------|-----------|--------------|
| API Signature | Identical | Identical |
| Return Types | Same | Same |
| Wallet Integration | Browser wallets | Cavos Aegis + Burner Wallet |
| Toast Notifications | react-hot-toast | toastify-react-native |
| Network Switching | Wallet prompt | In-app handling |
| Secure Storage | localStorage | expo-secure-store |

## Type Safety

All hooks are fully typed with TypeScript. Contract function names and arguments are inferred from your deployed contract ABIs:

```typescript
// TypeScript will autocomplete function names and validate args
const { data } = useScaffoldReadContract({
  contractName: "YourContract",    // Autocompleted from deployed contracts
  functionName: "getUserBalance",  // Autocompleted from contract ABI
  args: ["0x123..."],             // Type-checked against function signature
});
```

## Using starknet-react Hooks

Scaffold Stark RN hooks are built on top of [@starknet-react/core](https://www.starknet-react.com/). You can also use starknet-react hooks directly for lower-level operations:

```typescript
import { useAccount, useConnect, useDisconnect } from "@starknet-react/core";

// Get connected account
const { account, address, status } = useAccount();

// Handle wallet connection
const { connect, connectors } = useConnect();
const { disconnect } = useDisconnect();
```

## Best Practices

### 1. Conditional Rendering Based on Loading State

```tsx
const { data, isLoading, error } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "getValue",
});

if (isLoading) {
  return <ActivityIndicator />;
}

if (error) {
  return <Text>Error: {error.message}</Text>;
}

return <Text>Value: {data?.toString()}</Text>;
```

### 2. Handling Undefined Args

Hooks automatically disable when args contain `undefined` values:

```tsx
const { address } = useAccount();

// This won't execute until address is defined
const { data } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "getUserBalance",
  args: [address], // Safe even if address is undefined
});
```

### 3. Refreshing Data

Use the `refetch` function for manual data refresh:

```tsx
const { data, refetch } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "getValue",
});

// Manual refresh
<Button title="Refresh" onPress={() => refetch()} />
```

### 4. Transaction Feedback

Provide user feedback during transactions:

```tsx
const { sendAsync, isLoading, status } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "setValue",
  args: [newValue],
});

// Show loading state
<Button
  title={isLoading ? "Processing..." : "Submit"}
  onPress={sendAsync}
  disabled={isLoading}
/>
```

## Quick Reference: Additional Hooks

### useScaffoldContract

Get a typed contract instance for direct interaction:

```typescript
const { data: contract, isLoading } = useScaffoldContract({
  contractName: "YourContract",
});

// Use the starknet.Contract instance directly
const result = await contract?.call("myMethod", [arg1, arg2]);
```

### useScaffoldStarkProfile

Fetch Starknet ID profile data for an address:

```typescript
const { data: profile, isLoading } = useScaffoldStarkProfile(address);
// profile: { name, profilePicture }
```

### useSwitchNetwork

Switch between configured networks:

```typescript
const { switchNetwork, availableNetworks } = useSwitchNetwork();
await switchNetwork("mainnet");
```

## Next Steps

Explore individual hook documentation for detailed usage examples:

- [useScaffoldReadContract](./useScaffoldReadContract) - Start reading contract data
- [useScaffoldWriteContract](./useScaffoldWriteContract) - Learn to write transactions
- [useScaffoldEventHistory](./useScaffoldEventHistory) - Query contract events
