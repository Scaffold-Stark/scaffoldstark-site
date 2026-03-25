---
sidebar_position: 7
title: useScaffoldStrkBalance
description: Hook for fetching STRK token balance.
---

# useScaffoldStrkBalance

Use this hook to fetch the STRK token balance for a given address. It returns both the raw balance value and a formatted human-readable string.

```typescript
const { value, formatted, symbol } = useScaffoldStrkBalance({
  address: "0x123...",
});

console.log(`Balance: ${formatted} ${symbol}`); // "Balance: 100.5 STRK"
```

## Configuration

| Parameter | Type | Description |
|:----------|:-----|:------------|
| **address** | `string \| undefined` | Wallet address to query balance for. Hook is disabled when undefined. |

## Return Values

| Property | Type | Description |
|:---------|:-----|:------------|
| **value** | `bigint` | Raw balance value in wei (smallest unit) |
| **decimals** | `number` | Token decimal places (18 for STRK) |
| **symbol** | `string` | Token symbol (`"STRK"`) |
| **formatted** | `string` | Human-readable balance (e.g., `"100.5"`) |

Additional properties are inherited from `useReadContract`.

## Usage Examples

### Display Connected Account Balance

```tsx
import { View, Text, ActivityIndicator } from "react-native";
import { useScaffoldStrkBalance } from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function MyBalance() {
  const { address } = useAccount();

  const { formatted, symbol, isLoading } = useScaffoldStrkBalance({
    address,
  });

  if (!address) {
    return <Text>Connect wallet to see balance</Text>;
  }

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>
        {formatted} {symbol}
      </Text>
    </View>
  );
}
```

### Balance Card Component

```tsx
import { View, Text, StyleSheet } from "react-native";
import { useScaffoldStrkBalance } from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function BalanceCard() {
  const { address } = useAccount();

  const { value, formatted, symbol, isLoading } = useScaffoldStrkBalance({
    address,
  });

  // Calculate if balance is low
  const isLowBalance = value < BigInt(1e18); // Less than 1 STRK

  return (
    <View style={[styles.card, isLowBalance && styles.lowBalance]}>
      <Text style={styles.label}>Available Balance</Text>
      {isLoading ? (
        <Text style={styles.loading}>Loading...</Text>
      ) : (
        <Text style={styles.balance}>
          {formatted} <Text style={styles.symbol}>{symbol}</Text>
        </Text>
      )}
      {isLowBalance && (
        <Text style={styles.warning}>Low balance - consider adding funds</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: "#1a1a2e",
  },
  lowBalance: {
    borderColor: "#ff6b6b",
    borderWidth: 1,
  },
  label: {
    color: "#888",
    fontSize: 14,
  },
  balance: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },
  symbol: {
    color: "#888",
    fontSize: 20,
  },
  loading: {
    color: "#888",
    fontSize: 18,
  },
  warning: {
    color: "#ff6b6b",
    fontSize: 12,
    marginTop: 8,
  },
});
```

### Check Balance for Any Address

```tsx
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useScaffoldStrkBalance } from "@/hooks/scaffold-stark";

export default function BalanceChecker() {
  const [inputAddress, setInputAddress] = useState("");
  const [queryAddress, setQueryAddress] = useState("");

  const { formatted, symbol, isLoading, error } = useScaffoldStrkBalance({
    address: queryAddress || undefined,
  });

  const handleCheck = () => {
    setQueryAddress(inputAddress);
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput
        placeholder="Enter address (0x...)"
        value={inputAddress}
        onChangeText={setInputAddress}
        style={{ borderWidth: 1, padding: 8, borderRadius: 4 }}
      />
      <Button title="Check Balance" onPress={handleCheck} />

      {queryAddress && (
        <View style={{ marginTop: 16 }}>
          {isLoading ? (
            <Text>Checking balance...</Text>
          ) : error ? (
            <Text style={{ color: "red" }}>Invalid address</Text>
          ) : (
            <Text style={{ fontSize: 20 }}>
              Balance: {formatted} {symbol}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}
```

### Real-time Balance Updates

```tsx
import { useEffect } from "react";
import { View, Text } from "react-native";
import { useScaffoldStrkBalance } from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function LiveBalance() {
  const { address } = useAccount();

  // Hook automatically watches for balance changes
  const { formatted, symbol, value } = useScaffoldStrkBalance({
    address,
  });

  // Optional: Track balance changes
  useEffect(() => {
    console.log("Balance updated:", value?.toString());
  }, [value]);

  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: "green",
          marginRight: 8,
        }}
      />
      <Text>
        {formatted} {symbol}
      </Text>
    </View>
  );
}
```

### Formatted Balance Display

```tsx
import { View, Text } from "react-native";
import { useScaffoldStrkBalance } from "@/hooks/scaffold-stark";

function formatBalance(value: bigint, decimals: number): string {
  const divisor = BigInt(10 ** decimals);
  const integerPart = value / divisor;
  const fractionalPart = value % divisor;

  // Format with thousands separators
  const formattedInteger = integerPart.toLocaleString();

  // Show 4 decimal places
  const fractionalStr = fractionalPart.toString().padStart(decimals, "0").slice(0, 4);

  return `${formattedInteger}.${fractionalStr}`;
}

export default function FormattedBalance({ address }) {
  const { value, decimals, symbol } = useScaffoldStrkBalance({ address });

  const displayBalance = value ? formatBalance(value, decimals) : "0.0000";

  return (
    <Text style={{ fontFamily: "monospace" }}>
      {displayBalance} {symbol}
    </Text>
  );
}
```

## How It Works

The hook uses `useReadContract` to call the `balance_of` function on the deployed STRK token contract:

```typescript
// Internally, the hook does:
useReadContract({
  address: strkContractAddress,
  abi: strkAbi,
  functionName: "balance_of",
  args: [address],
  watch: true,  // Auto-refresh on new blocks
  blockIdentifier: "pre_confirmed",
});
```

## Automatic Updates

The hook is configured with `watch: true`, meaning it automatically refreshes the balance when new blocks are confirmed. This ensures your UI always shows the current balance without manual refresh.

## Related Hooks

- [useScaffoldReadContract](./useScaffoldReadContract) - Read any contract data
- [useTargetNetwork](./useTargetNetwork) - Get current network info
