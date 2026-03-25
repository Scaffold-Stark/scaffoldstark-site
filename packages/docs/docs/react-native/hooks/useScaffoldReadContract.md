---
sidebar_position: 2
title: useScaffoldReadContract
description: Hook for reading data from smart contract view functions.
---

# useScaffoldReadContract

Use this hook to read public variables and get data from read-only (view) functions of your smart contracts.

```typescript
const { data: totalCounter } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "userGreetingCounter",
  args: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045"],
});
```

This example retrieves the data returned by the `userGreetingCounter` function of the `YourContract` smart contract.

## Configuration

| Parameter | Type | Description |
|:----------|:-----|:------------|
| **contractName** | `string` | Name of the deployed contract to read from. Must match a contract in `deployedContracts.ts`. |
| **functionName** | `string` | Name of the view function to call. Autocompleted from contract ABI. |
| **args** (optional) | `unknown[]` | Array of arguments to pass to the function. Types are inferred from the contract's function parameters. |
| **blockIdentifier** (optional) | `BlockNumber` | Block identifier to use. Default: `"pre_confirmed"` |
| **watch** (optional) | `boolean` | Automatically refresh data on new blocks. Default: `true` |

You can also pass additional arguments accepted by [starknet-react useReadContract](https://www.starknet-react.com/docs/hooks/use-read-contract).

## Return Values

| Property | Type | Description |
|:---------|:-----|:------------|
| **data** | `T \| undefined` | The function's return value, or `undefined` if not yet loaded |
| **isLoading** | `boolean` | `true` while the read operation is in progress |
| **error** | `Error \| null` | Error object if the read failed, `null` otherwise |
| **refetch** | `() => void` | Function to manually trigger a data refresh |

Additional properties are inherited from [starknet-react useReadContract](https://www.starknet-react.com/docs/hooks/use-read-contract).

## Usage Examples

### Basic Read

```tsx
import { View, Text, ActivityIndicator } from "react-native";
import { useScaffoldReadContract } from "@/hooks/scaffold-stark";

export default function GreetingDisplay() {
  const { data: greeting, isLoading } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "greeting",
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      <Text>Current Greeting: {greeting?.toString()}</Text>
    </View>
  );
}
```

### Read with Arguments

```tsx
import { View, Text } from "react-native";
import { useScaffoldReadContract } from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function UserBalance() {
  const { address } = useAccount();

  const { data: balance, isLoading, error } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "balanceOf",
    args: [address], // Hook is disabled when address is undefined
  });

  if (!address) {
    return <Text>Please connect your wallet</Text>;
  }

  if (isLoading) {
    return <Text>Loading balance...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <Text>Your Balance: {balance?.toString()}</Text>
    </View>
  );
}
```

### Manual Refresh

```tsx
import { View, Text, Button } from "react-native";
import { useScaffoldReadContract } from "@/hooks/scaffold-stark";

export default function PriceDisplay() {
  const { data: price, isLoading, refetch } = useScaffoldReadContract({
    contractName: "PriceOracle",
    functionName: "getLatestPrice",
    watch: false, // Disable auto-refresh
  });

  return (
    <View>
      <Text>Current Price: {price?.toString()}</Text>
      <Button
        title={isLoading ? "Refreshing..." : "Refresh Price"}
        onPress={() => refetch()}
        disabled={isLoading}
      />
    </View>
  );
}
```

### Multiple Contract Reads

```tsx
import { View, Text } from "react-native";
import { useScaffoldReadContract } from "@/hooks/scaffold-stark";

export default function ContractStats() {
  const { data: totalSupply } = useScaffoldReadContract({
    contractName: "Token",
    functionName: "totalSupply",
  });

  const { data: name } = useScaffoldReadContract({
    contractName: "Token",
    functionName: "name",
  });

  const { data: symbol } = useScaffoldReadContract({
    contractName: "Token",
    functionName: "symbol",
  });

  return (
    <View>
      <Text>Token: {name?.toString()} ({symbol?.toString()})</Text>
      <Text>Total Supply: {totalSupply?.toString()}</Text>
    </View>
  );
}
```

## Key Behaviors

### Automatic Disabling

The hook automatically disables when any argument is `undefined`. This prevents unnecessary RPC calls and errors:

```typescript
const { address } = useAccount(); // undefined when not connected

// This read is automatically disabled until address has a value
const { data } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "getUserData",
  args: [address],
});
```

### Continuous Watching

By default, the hook watches for new blocks and refreshes data automatically. Disable this for static data:

```typescript
const { data } = useScaffoldReadContract({
  contractName: "YourContract",
  functionName: "owner", // Unlikely to change
  watch: false,
});
```

## Differences from Web Version

The React Native version is functionally identical to the Scaffold Stark 2 web version. The only differences are:

- Uses React Native components in examples
- Integrates with mobile-specific notification systems
- Works with Cavos Aegis wallet instead of browser extensions

## Related Hooks

- [useScaffoldWriteContract](./useScaffoldWriteContract) - Write data to contracts
- [useDeployedContractInfo](./useDeployedContractInfo) - Get contract metadata
- [useScaffoldEventHistory](./useScaffoldEventHistory) - Read historical events
