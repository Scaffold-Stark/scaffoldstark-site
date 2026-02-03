---
sidebar_position: 4
title: useScaffoldMultiWriteContract
description: Hook for executing multiple contract transactions in a single batch.
---

# useScaffoldMultiWriteContract

Use this hook to execute multiple contract calls in a single transaction batch. This is more gas-efficient than sending individual transactions and ensures atomicity - either all calls succeed or none do.

```typescript
const { sendAsync, isLoading } = useScaffoldMultiWriteContract({
  calls: [
    {
      contractName: "Token",
      functionName: "approve",
      args: [spenderAddress, amount],
    },
    {
      contractName: "DEX",
      functionName: "swap",
      args: [tokenIn, tokenOut, amount],
    },
  ],
});

// Execute all calls in a single transaction
await sendAsync();
```

## Configuration

| Parameter | Type | Description |
|:----------|:-----|:------------|
| **calls** | `Array<ScaffoldWriteConfig \| Call>` | Array of contract calls to execute. Can be scaffold config objects or raw Starknet `Call` objects. |
| **options** (optional) | `InvocationsDetails` | Additional transaction options (max fee, nonce, etc.) |

### Call Configuration Object

Each call in the `calls` array can be:

**Scaffold Config Format:**
```typescript
{
  contractName: string;    // Name of deployed contract
  functionName: string;    // External function to call
  args: unknown[];         // Function arguments
}
```

**Raw Call Format (Starknet.js):**
```typescript
{
  contractAddress: string; // Contract address
  entrypoint: string;      // Function selector
  calldata: string[];      // Encoded calldata
}
```

## Return Values

| Property | Type | Description |
|:---------|:-----|:------------|
| **sendAsync** | `() => Promise<string \| undefined>` | Function to execute all calls. Returns transaction hash. |
| **isLoading** | `boolean` | `true` while the transaction is being processed |
| **error** | `Error \| null` | Error object if the transaction failed, `null` otherwise |
| **status** | `"idle" \| "loading" \| "success" \| "error"` | Current transaction state |

## Usage Examples

### Approve and Swap

A common DeFi pattern - approve token spending and swap in one transaction:

```tsx
import { View, Button, Alert } from "react-native";
import { useScaffoldMultiWriteContract } from "@/hooks/scaffold-stark";

export default function SwapButton({ amount, tokenIn, tokenOut, dexAddress }) {
  const { sendAsync, isLoading } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "ERC20",
        functionName: "approve",
        args: [dexAddress, amount],
      },
      {
        contractName: "DEX",
        functionName: "swap",
        args: [tokenIn, tokenOut, amount, 0], // minAmountOut = 0
      },
    ],
  });

  const handleSwap = async () => {
    try {
      const txHash = await sendAsync();
      Alert.alert("Success", `Swap completed: ${txHash}`);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Button
      title={isLoading ? "Swapping..." : "Approve & Swap"}
      onPress={handleSwap}
      disabled={isLoading}
    />
  );
}
```

### Batch Transfers

Send tokens to multiple recipients in one transaction:

```tsx
import { View, Button } from "react-native";
import { useScaffoldMultiWriteContract, createContractCall } from "@/hooks/scaffold-stark";

export default function BatchTransfer({ recipients }) {
  // recipients = [{ address: "0x...", amount: 100n }, ...]

  const calls = recipients.map((r) =>
    createContractCall({
      contractName: "Token",
      functionName: "transfer",
      args: [r.address, r.amount],
    })
  );

  const { sendAsync, isLoading, status } = useScaffoldMultiWriteContract({
    calls,
  });

  return (
    <View>
      <Button
        title={isLoading ? "Sending..." : `Send to ${recipients.length} recipients`}
        onPress={() => sendAsync()}
        disabled={isLoading}
      />
      {status === "success" && (
        <Text>All transfers completed!</Text>
      )}
    </View>
  );
}
```

### Mixed Call Formats

Combine scaffold config and raw calls:

```tsx
import { useScaffoldMultiWriteContract } from "@/hooks/scaffold-stark";

export default function MixedCalls() {
  const { sendAsync, isLoading } = useScaffoldMultiWriteContract({
    calls: [
      // Scaffold config format
      {
        contractName: "YourContract",
        functionName: "doSomething",
        args: [123],
      },
      // Raw Starknet.js Call format
      {
        contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
        entrypoint: "transfer",
        calldata: ["0x123...", "1000", "0"],
      },
    ],
  });

  return (
    <Button
      title="Execute Mixed Calls"
      onPress={() => sendAsync()}
      disabled={isLoading}
    />
  );
}
```

### NFT Minting with Metadata

Mint an NFT and set its metadata atomically:

```tsx
import { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { useScaffoldMultiWriteContract } from "@/hooks/scaffold-stark";

export default function MintWithMetadata() {
  const [tokenUri, setTokenUri] = useState("");

  const { sendAsync, isLoading } = useScaffoldMultiWriteContract({
    calls: [
      {
        contractName: "NFT",
        functionName: "mint",
        args: [],
      },
      {
        contractName: "NFT",
        functionName: "setTokenURI",
        args: [nextTokenId, tokenUri],
      },
    ],
  });

  return (
    <View style={{ gap: 12 }}>
      <TextInput
        placeholder="Token URI"
        value={tokenUri}
        onChangeText={setTokenUri}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button
        title={isLoading ? "Minting..." : "Mint NFT"}
        onPress={() => sendAsync()}
        disabled={isLoading || !tokenUri}
      />
    </View>
  );
}
```

## Helper Function

### createContractCall

A helper function to create properly typed call objects:

```typescript
import { createContractCall } from "@/hooks/scaffold-stark";

const call = createContractCall({
  contractName: "Token",
  functionName: "transfer",
  args: [recipient, amount],
});
```

This is useful when building calls dynamically or in loops.

## Atomicity

All calls in a multi-write transaction are atomic:

- If **all calls succeed**, the transaction is confirmed
- If **any call fails**, the entire transaction reverts
- No partial execution is possible

This is critical for operations that must happen together (like approve + swap).

## Gas Efficiency

Batching multiple calls into a single transaction is more gas-efficient than sending them separately:

| Approach | Transaction Count | Gas Overhead |
|----------|------------------|--------------|
| Individual transactions | N | N × base fee |
| Multi-write (batched) | 1 | 1 × base fee |

## Differences from Web Version

The React Native version is functionally identical to the web version. The main differences are:

- Uses React Native UI components
- Integrates with mobile wallet (Cavos Aegis)
- Mobile-optimized toast notifications

## Related Hooks

- [useScaffoldWriteContract](./useScaffoldWriteContract) - Single transaction writes
- [useScaffoldReadContract](./useScaffoldReadContract) - Read contract data
- [useTransactor](./useTransactor) - Low-level transaction handling
