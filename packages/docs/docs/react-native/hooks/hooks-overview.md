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
| [useDeployedContractInfo](./useDeployedContractInfo) | Get deployed contract address and ABI |
| [useScaffoldEventHistory](./useScaffoldEventHistory) | Query historical contract events |

### Utility Hooks

| Hook | Description |
|------|-------------|
| [useScaffoldStrkBalance](./useScaffoldStrkBalance) | Get STRK token balance for an address |
| [useTargetNetwork](./useTargetNetwork) | Get and manage current target network |
| [useTransactor](./useTransactor) | Low-level transaction execution with notifications |

## Comparison with Web Hooks

The React Native hooks are designed to mirror the Scaffold Stark 2 web hooks as closely as possible, with minor adaptations for the mobile environment:

| Feature | Web (SS2) | React Native |
|---------|-----------|--------------|
| API Signature | Identical | Identical |
| Return Types | Same | Same |
| Wallet Integration | Browser wallets | Cavos Aegis (WaaS) |
| Toast Notifications | react-hot-toast | React Native Toast |
| Network Switching | Wallet prompt | In-app handling |

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

## Next Steps

Explore individual hook documentation for detailed usage examples:

- [useScaffoldReadContract](./useScaffoldReadContract) - Start reading contract data
- [useScaffoldWriteContract](./useScaffoldWriteContract) - Learn to write transactions
- [useScaffoldEventHistory](./useScaffoldEventHistory) - Query contract events
