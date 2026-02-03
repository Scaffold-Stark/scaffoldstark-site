---
sidebar_position: 8
title: useTargetNetwork
description: Hook for accessing and managing the target network configuration.
---

# useTargetNetwork

Use this hook to get the current target network configuration. It automatically syncs with the connected wallet's chain and updates global state when the network changes.

```typescript
const { targetNetwork } = useTargetNetwork();

console.log(targetNetwork.name);    // "Starknet Sepolia"
console.log(targetNetwork.id);      // Chain ID
console.log(targetNetwork.network); // "sepolia"
```

## Return Values

| Property | Type | Description |
|:---------|:-----|:------------|
| **targetNetwork** | `ChainWithAttributes` | Current target network configuration object |

### ChainWithAttributes Structure

```typescript
interface ChainWithAttributes {
  id: number;                    // Chain ID
  name: string;                  // Display name (e.g., "Starknet Sepolia")
  network: string;               // Network identifier (e.g., "sepolia", "devnet")
  nativeCurrency: {
    name: string;                // "Ether"
    symbol: string;              // "ETH"
    decimals: number;            // 18
  };
  rpcUrls: {
    default: { http: string[] }; // RPC endpoints
    public: { http: string[] };
  };
  blockExplorers?: {
    default: {
      name: string;              // "Starkscan"
      url: string;               // Explorer URL
    };
  };
  // ... additional chain properties
}
```

## Usage Examples

### Display Current Network

```tsx
import { View, Text } from "react-native";
import { useTargetNetwork } from "@/hooks/scaffold-stark";

export default function NetworkBadge() {
  const { targetNetwork } = useTargetNetwork();

  const getNetworkColor = (network: string) => {
    switch (network) {
      case "mainnet":
        return "#22c55e"; // green
      case "sepolia":
        return "#f59e0b"; // amber
      case "devnet":
        return "#3b82f6"; // blue
      default:
        return "#6b7280"; // gray
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        backgroundColor: getNetworkColor(targetNetwork.network),
      }}
    >
      <Text style={{ color: "white", fontWeight: "600" }}>
        {targetNetwork.name}
      </Text>
    </View>
  );
}
```

### Network-Specific Content

```tsx
import { View, Text } from "react-native";
import { useTargetNetwork } from "@/hooks/scaffold-stark";

export default function NetworkInfo() {
  const { targetNetwork } = useTargetNetwork();

  const isTestnet = targetNetwork.network !== "mainnet";

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: "bold" }}>
        {targetNetwork.name}
      </Text>

      {isTestnet && (
        <View
          style={{
            marginTop: 8,
            padding: 8,
            backgroundColor: "#fef3c7",
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#92400e" }}>
            You're on a test network. Tokens have no real value.
          </Text>
        </View>
      )}

      <View style={{ marginTop: 16 }}>
        <Text style={{ color: "#666" }}>Chain ID: {targetNetwork.id}</Text>
        <Text style={{ color: "#666" }}>
          RPC: {targetNetwork.rpcUrls.default.http[0]}
        </Text>
      </View>
    </View>
  );
}
```

### Block Explorer Link

```tsx
import { TouchableOpacity, Text, Linking } from "react-native";
import { useTargetNetwork } from "@/hooks/scaffold-stark";

export default function ExplorerLink({ transactionHash }) {
  const { targetNetwork } = useTargetNetwork();

  const explorerUrl = targetNetwork.blockExplorers?.default?.url;

  const openInExplorer = () => {
    if (explorerUrl) {
      Linking.openURL(`${explorerUrl}/tx/${transactionHash}`);
    }
  };

  if (!explorerUrl) {
    return <Text>Transaction: {transactionHash.slice(0, 10)}...</Text>;
  }

  return (
    <TouchableOpacity onPress={openInExplorer}>
      <Text style={{ color: "#3b82f6", textDecorationLine: "underline" }}>
        View on {targetNetwork.blockExplorers?.default?.name || "Explorer"}
      </Text>
    </TouchableOpacity>
  );
}
```

### Conditional Features by Network

```tsx
import { View, Text, Button } from "react-native";
import { useTargetNetwork } from "@/hooks/scaffold-stark";

export default function FaucetButton() {
  const { targetNetwork } = useTargetNetwork();

  // Faucet only available on testnets
  if (targetNetwork.network === "mainnet") {
    return null;
  }

  const faucetUrls = {
    sepolia: "https://faucet.starknet.io",
    devnet: "http://localhost:5050/mint",
  };

  const faucetUrl = faucetUrls[targetNetwork.network];

  if (!faucetUrl) {
    return null;
  }

  return (
    <View style={{ padding: 8 }}>
      <Text style={{ marginBottom: 8, color: "#666" }}>
        Need test tokens?
      </Text>
      <Button
        title="Get Test Tokens"
        onPress={() => Linking.openURL(faucetUrl)}
      />
    </View>
  );
}
```

### Network Status Indicator

```tsx
import { View, Text, StyleSheet } from "react-native";
import { useTargetNetwork } from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function NetworkStatus() {
  const { targetNetwork } = useTargetNetwork();
  const { status, chainId } = useAccount();

  const isConnected = status === "connected";
  const isCorrectNetwork = chainId === targetNetwork.id;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View
          style={[
            styles.dot,
            { backgroundColor: isConnected ? "#22c55e" : "#ef4444" },
          ]}
        />
        <Text>{isConnected ? "Connected" : "Disconnected"}</Text>
      </View>

      {isConnected && !isCorrectNetwork && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            Wrong network. Expected {targetNetwork.name}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 12 },
  row: { flexDirection: "row", alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  warning: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#fef2f2",
    borderRadius: 4,
  },
  warningText: { color: "#dc2626" },
});
```

## How It Works

The hook synchronizes the target network between:

1. **Global State**: The app's configured target networks in `scaffold.config.ts`
2. **Wallet State**: The connected wallet's current chain

```
scaffold.config.ts ──→ Available Networks
         │
         ↓
    Wallet chainId
         │
         ↓
   Match & Update Global State
         │
         ↓
    targetNetwork (returned)
```

When the wallet's chain changes, the hook automatically updates the global target network to match.

## Configuration

Target networks are configured in `scaffold.config.ts`:

```typescript
// configs/scaffold.config.ts
const scaffoldConfig = {
  targetNetworks: [
    chains.devnet,
    chains.sepolia,
    chains.mainnet,
  ],
  // ... other config
};
```

The first network in the array is used as the default when no wallet is connected.

## Related Hooks

- [useDeployedContractInfo](./useDeployedContractInfo) - Uses target network for contract lookup
- [useScaffoldReadContract](./useScaffoldReadContract) - Reads from target network
