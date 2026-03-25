---
sidebar_position: 9
title: useTransactor
description: Low-level hook for transaction execution with notifications.
---

# useTransactor

Use this hook for low-level transaction execution with built-in fee estimation, user notifications, and transaction tracking. This is the foundation that powers `useScaffoldWriteContract`.

```typescript
const { writeTransaction, transactionReceiptInstance } = useTransactor();

// Execute a transaction
const txHash = await writeTransaction([
  {
    contractAddress: "0x...",
    entrypoint: "transfer",
    calldata: ["0x...", "1000", "0"],
  },
]);
```

## Configuration

| Parameter | Type | Description |
|:----------|:-----|:------------|
| **_walletClient** (optional) | `AccountInterface` | Custom wallet client. If not provided, uses the connected account from `useAccount()`. |

## Return Values

| Property | Type | Description |
|:---------|:-----|:------------|
| **writeTransaction** | `TransactionFunc` | Function to execute transactions |
| **transactionReceiptInstance** | `UseTransactionReceiptResult` | Receipt tracking from starknet-react |
| **sendTransactionInstance** | `UseSendTransactionResult` | Send transaction instance from starknet-react |

### TransactionFunc Type

```typescript
type TransactionFunc = (
  tx: Call[],
  withSendTransaction?: boolean,
) => Promise<string | undefined>;
```

## Usage Examples

### Basic Transaction

```tsx
import { View, Button, Alert } from "react-native";
import { useTransactor } from "@/hooks/scaffold-stark";

export default function DirectTransaction() {
  const { writeTransaction } = useTransactor();

  const sendDirectTx = async () => {
    try {
      const txHash = await writeTransaction([
        {
          contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          entrypoint: "transfer",
          calldata: ["0x123...", "1000000000000000000", "0"],
        },
      ]);

      Alert.alert("Success", `Transaction hash: ${txHash}`);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return <Button title="Send Transaction" onPress={sendDirectTx} />;
}
```

### Multiple Calls

```tsx
import { useTransactor } from "@/hooks/scaffold-stark";

export default function BatchTransaction() {
  const { writeTransaction } = useTransactor();

  const executeBatch = async () => {
    const txHash = await writeTransaction([
      // First call: approve
      {
        contractAddress: tokenAddress,
        entrypoint: "approve",
        calldata: [spenderAddress, amount, "0"],
      },
      // Second call: deposit
      {
        contractAddress: vaultAddress,
        entrypoint: "deposit",
        calldata: [amount, "0"],
      },
    ]);

    console.log("Batch executed:", txHash);
  };

  return <Button title="Approve & Deposit" onPress={executeBatch} />;
}
```

### With Custom Wallet Client

```tsx
import { useTransactor } from "@/hooks/scaffold-stark";
import { Account, RpcProvider } from "starknet";

export default function CustomWalletTransaction() {
  // Create a custom account instance
  const customAccount = new Account(
    new RpcProvider({ nodeUrl: "https://..." }),
    accountAddress,
    privateKey
  );

  const { writeTransaction } = useTransactor(customAccount);

  const sendWithCustomWallet = async () => {
    const txHash = await writeTransaction([
      {
        contractAddress: "0x...",
        entrypoint: "someFunction",
        calldata: [],
      },
    ]);

    console.log("Sent with custom wallet:", txHash);
  };

  return <Button title="Send" onPress={sendWithCustomWallet} />;
}
```

### Transaction Receipt Tracking

```tsx
import { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useTransactor } from "@/hooks/scaffold-stark";

export default function TrackedTransaction() {
  const { writeTransaction, transactionReceiptInstance } = useTransactor();
  const [txHash, setTxHash] = useState<string | null>(null);

  const { data: receipt, isLoading: isReceiptLoading } = transactionReceiptInstance;

  const sendTransaction = async () => {
    const hash = await writeTransaction([
      {
        contractAddress: "0x...",
        entrypoint: "increment",
        calldata: [],
      },
    ]);
    setTxHash(hash);
  };

  return (
    <View style={{ padding: 16 }}>
      <Button title="Send Transaction" onPress={sendTransaction} />

      {txHash && (
        <View style={{ marginTop: 16 }}>
          <Text>Transaction: {txHash.slice(0, 10)}...</Text>

          {isReceiptLoading ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ActivityIndicator size="small" />
              <Text style={{ marginLeft: 8 }}>Waiting for confirmation...</Text>
            </View>
          ) : receipt ? (
            <Text style={{ color: "green" }}>
              Confirmed in block {receipt.block_number}
            </Text>
          ) : null}
        </View>
      )}
    </View>
  );
}
```

### Error Handling with Notifications

```tsx
import { useTransactor } from "@/hooks/scaffold-stark";
import { Alert } from "react-native";

export default function TransactionWithErrorHandling() {
  const { writeTransaction } = useTransactor();

  const sendTransaction = async () => {
    try {
      const txHash = await writeTransaction([
        {
          contractAddress: "0x...",
          entrypoint: "riskyFunction",
          calldata: [],
        },
      ]);

      // Success toast is shown automatically
      console.log("Transaction sent:", txHash);
    } catch (error) {
      // Error toast is shown automatically, but you can add custom handling
      if (error.message.includes("User rejected")) {
        // User cancelled - no additional action needed
        return;
      }

      // Log for debugging
      console.error("Transaction failed:", error);

      // Show additional context if needed
      Alert.alert(
        "Transaction Failed",
        "Please check your balance and try again."
      );
    }
  };

  return <Button title="Send" onPress={sendTransaction} />;
}
```

## Transaction Flow

When `writeTransaction()` is called:

```
1. Validate wallet client exists
         ↓
2. Estimate transaction fees (with 1.5x multiplier)
         ↓
3. Show "Sending transaction" notification
         ↓
4. Execute transaction via wallet
         ↓
5. On success: Show success toast with explorer link
   On error: Show error toast with message
         ↓
6. Return transaction hash (or throw error)
```

## Fee Estimation

The hook automatically estimates gas fees:

```typescript
// Internal fee estimation logic
const estimatedFee = await account.estimateInvokeFee(calls);

// Apply 1.5x safety multiplier
const maxFee = estimatedFee.suggestedMaxFee * 15n / 10n;

// Fallback to defaults if estimation fails
const defaultBounds = {
  l1_gas: { max_amount: "0x2710", max_price_per_unit: "0x5f5e100" },
  l2_gas: { max_amount: "0x0", max_price_per_unit: "0x0" },
};
```

## Notifications

The hook provides automatic toast notifications:

- **Pending**: "Sending transaction..." while waiting for wallet confirmation
- **Success**: Transaction hash with link to block explorer
- **Error**: Error message explaining what went wrong

## When to Use useTransactor

Use `useTransactor` when:
- You need low-level control over transaction calls
- Working with contracts not in `deployedContracts.ts`
- Building custom contract interaction hooks
- Integrating with external SDKs that provide raw call data

For most cases, prefer the higher-level hooks:
- [useScaffoldWriteContract](./useScaffoldWriteContract) - Type-safe writes
- [useScaffoldMultiWriteContract](./useScaffoldMultiWriteContract) - Type-safe batch writes

## Related Hooks

- [useScaffoldWriteContract](./useScaffoldWriteContract) - Higher-level write hook
- [useScaffoldMultiWriteContract](./useScaffoldMultiWriteContract) - Batch transactions
- [useDeployedContractInfo](./useDeployedContractInfo) - Get contract ABI for building calls
