---
sidebar_position: 5
title: useDeployedContractInfo
description: Hook for retrieving deployed contract address and ABI.
---

# useDeployedContractInfo

Use this hook to get information about a deployed contract, including its address, ABI, and deployment status. This is useful for dynamically accessing contract data and verifying contract availability.

```typescript
const { data: contractInfo, isLoading } = useDeployedContractInfo("YourContract");

// Access contract details
console.log(contractInfo?.address);
console.log(contractInfo?.abi);
```

## Configuration

| Parameter | Type | Description |
|:----------|:-----|:------------|
| **contractName** | `string` | Name of the contract as defined in `deployedContracts.ts`. |

## Return Values

| Property | Type | Description |
|:---------|:-----|:------------|
| **data** | `Contract \| undefined` | Contract information object containing address, abi, and classHash |
| **isLoading** | `boolean` | `true` while verifying contract deployment |
| **raw** | `Contract \| undefined` | Contract config from deployedContracts.ts (independent of deployment status) |
| **status** | `ContractCodeStatus` | Deployment status: `"LOADING"`, `"DEPLOYED"`, or `"NOT_FOUND"` |

### Contract Object Structure

```typescript
interface Contract {
  address: string;     // Contract address on current network
  abi: Abi;           // Contract ABI for type generation
  classHash: string;  // Cairo class hash
}
```

### ContractCodeStatus

```typescript
type ContractCodeStatus = "LOADING" | "DEPLOYED" | "NOT_FOUND";
```

## Usage Examples

### Basic Usage

```tsx
import { View, Text, ActivityIndicator } from "react-native";
import { useDeployedContractInfo } from "@/hooks/scaffold-stark";

export default function ContractInfo() {
  const { data, isLoading, status } = useDeployedContractInfo("YourContract");

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (status === "NOT_FOUND") {
    return <Text>Contract not deployed on this network</Text>;
  }

  return (
    <View>
      <Text>Address: {data?.address}</Text>
      <Text>Class Hash: {data?.classHash}</Text>
      <Text>Functions: {data?.abi.length}</Text>
    </View>
  );
}
```

### Conditional Rendering

```tsx
import { View, Text, Button } from "react-native";
import { useDeployedContractInfo, useScaffoldWriteContract } from "@/hooks/scaffold-stark";

export default function ConditionalInteraction() {
  const { status } = useDeployedContractInfo("OptionalFeature");

  const { sendAsync, isLoading } = useScaffoldWriteContract({
    contractName: "OptionalFeature",
    functionName: "activate",
    args: [],
  });

  // Only show button if contract is deployed
  if (status !== "DEPLOYED") {
    return (
      <View>
        <Text>This feature is not available on the current network.</Text>
      </View>
    );
  }

  return (
    <Button
      title="Activate Feature"
      onPress={() => sendAsync()}
      disabled={isLoading}
    />
  );
}
```

### Display Contract Address

```tsx
import { View, Text, TouchableOpacity, Clipboard } from "react-native";
import { useDeployedContractInfo } from "@/hooks/scaffold-stark";

export default function ContractAddress({ contractName }) {
  const { data, status } = useDeployedContractInfo(contractName);

  const copyAddress = () => {
    if (data?.address) {
      Clipboard.setString(data.address);
      // Show toast or feedback
    }
  };

  if (status !== "DEPLOYED") {
    return <Text>Not deployed</Text>;
  }

  return (
    <TouchableOpacity onPress={copyAddress}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Text style={{ fontFamily: "monospace" }}>
          {data?.address.slice(0, 6)}...{data?.address.slice(-4)}
        </Text>
        <Text style={{ marginLeft: 4 }}>📋</Text>
      </View>
    </TouchableOpacity>
  );
}
```

### Multiple Contracts

```tsx
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useDeployedContractInfo } from "@/hooks/scaffold-stark";

const CONTRACT_NAMES = ["Token", "NFT", "Governance", "Treasury"];

function ContractRow({ name }) {
  const { data, status, isLoading } = useDeployedContractInfo(name);

  return (
    <View style={{ flexDirection: "row", padding: 8, borderBottomWidth: 1 }}>
      <Text style={{ flex: 1 }}>{name}</Text>
      {isLoading ? (
        <ActivityIndicator size="small" />
      ) : (
        <Text style={{ color: status === "DEPLOYED" ? "green" : "red" }}>
          {status}
        </Text>
      )}
    </View>
  );
}

export default function ContractStatusList() {
  return (
    <FlatList
      data={CONTRACT_NAMES}
      keyExtractor={(item) => item}
      renderItem={({ item }) => <ContractRow name={item} />}
    />
  );
}
```

### Using Raw Config

Access contract configuration even before deployment verification:

```tsx
import { useDeployedContractInfo } from "@/hooks/scaffold-stark";

export default function ContractPreview({ contractName }) {
  const { raw, status } = useDeployedContractInfo(contractName);

  // raw is available immediately from deployedContracts.ts
  // data is only available after on-chain verification

  return (
    <View>
      <Text>Expected Address: {raw?.address}</Text>
      <Text>Verification: {status}</Text>
    </View>
  );
}
```

## How It Works

The hook performs two operations:

1. **Config Lookup**: Reads contract information from `deployedContracts.ts` for the current network
2. **On-chain Verification**: Checks if the contract is actually deployed by querying its class hash

```
deployedContracts.ts ──→ raw (immediate)
         │
         ↓
   Check class hash on-chain
         │
         ↓
   status: DEPLOYED | NOT_FOUND
         │
         ↓
      data (verified)
```

## Network Awareness

The hook automatically uses the contract configuration for the current target network:

```typescript
// deployedContracts.ts
export const contracts = {
  devnet: {
    YourContract: { address: "0x123...", abi: [...] },
  },
  sepolia: {
    YourContract: { address: "0x456...", abi: [...] },
  },
};

// Hook automatically selects based on current network
const { data } = useDeployedContractInfo("YourContract");
// Returns devnet config on devnet, sepolia config on sepolia
```

## Related Hooks

- [useScaffoldReadContract](./useScaffoldReadContract) - Uses this hook internally
- [useScaffoldWriteContract](./useScaffoldWriteContract) - Uses this hook internally
- [useTargetNetwork](./useTargetNetwork) - Get current network info
