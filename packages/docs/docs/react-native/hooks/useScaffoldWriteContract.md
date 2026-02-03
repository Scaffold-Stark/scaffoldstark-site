---
sidebar_position: 3
title: useScaffoldWriteContract
description: Hook for executing write transactions on smart contracts.
---

# useScaffoldWriteContract

Use this hook to execute state-changing (external) functions on your smart contracts. It handles transaction submission, fee estimation, and provides feedback on transaction status.

```typescript
const { sendAsync, isLoading } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "setGreeting",
  args: ["Hello, Starknet!"],
});

// Execute the transaction
await sendAsync();
```

## Configuration

| Parameter | Type | Description |
|:----------|:-----|:------------|
| **contractName** | `string` | Name of the deployed contract to interact with. Must match a contract in `deployedContracts.ts`. |
| **functionName** | `string` | Name of the external function to call. Autocompleted from contract ABI. |
| **args** | `unknown[]` | Array of arguments to pass to the function. Types are inferred from the contract's function parameters. |

## Return Values

| Property | Type | Description |
|:---------|:-----|:------------|
| **sendAsync** | `(options?: { args?: unknown[] }) => Promise<string \| undefined>` | Function to execute the transaction. Optionally override args. Returns transaction hash. |
| **isLoading** | `boolean` | `true` while the transaction is being processed |
| **error** | `Error \| null` | Error object if the transaction failed, `null` otherwise |
| **status** | `"idle" \| "loading" \| "success" \| "error"` | Current transaction state |

Additional properties are inherited from starknet-react's `useSendTransaction`.

## Usage Examples

### Basic Write Transaction

```tsx
import { View, Button, Alert } from "react-native";
import { useScaffoldWriteContract } from "@/hooks/scaffold-stark";

export default function SetGreetingButton() {
  const { sendAsync, isLoading } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "setGreeting",
    args: ["Hello from React Native!"],
  });

  const handlePress = async () => {
    try {
      const txHash = await sendAsync();
      Alert.alert("Success", `Transaction sent: ${txHash}`);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <Button
      title={isLoading ? "Sending..." : "Set Greeting"}
      onPress={handlePress}
      disabled={isLoading}
    />
  );
}
```

### Write with Dynamic Arguments

```tsx
import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useScaffoldWriteContract } from "@/hooks/scaffold-stark";

export default function TransferForm() {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const { sendAsync, isLoading, status } = useScaffoldWriteContract({
    contractName: "Token",
    functionName: "transfer",
    args: [recipient, BigInt(amount || "0")],
  });

  const handleTransfer = async () => {
    if (!recipient || !amount) return;

    try {
      await sendAsync();
    } catch (error) {
      console.error("Transfer failed:", error);
    }
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      <TextInput
        placeholder="Recipient Address"
        value={recipient}
        onChangeText={setRecipient}
        style={{ borderWidth: 1, padding: 8 }}
      />
      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8 }}
      />
      <Button
        title={isLoading ? "Transferring..." : "Transfer"}
        onPress={handleTransfer}
        disabled={isLoading || !recipient || !amount}
      />
      {status === "success" && (
        <Text style={{ color: "green" }}>Transfer successful!</Text>
      )}
      {status === "error" && (
        <Text style={{ color: "red" }}>Transfer failed</Text>
      )}
    </View>
  );
}
```

### Override Arguments at Call Time

```tsx
import { View, Button } from "react-native";
import { useScaffoldWriteContract } from "@/hooks/scaffold-stark";

export default function IncrementButtons() {
  const { sendAsync, isLoading } = useScaffoldWriteContract({
    contractName: "Counter",
    functionName: "incrementBy",
    args: [1], // Default value
  });

  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      <Button
        title="+1"
        onPress={() => sendAsync({ args: [1] })}
        disabled={isLoading}
      />
      <Button
        title="+5"
        onPress={() => sendAsync({ args: [5] })}
        disabled={isLoading}
      />
      <Button
        title="+10"
        onPress={() => sendAsync({ args: [10] })}
        disabled={isLoading}
      />
    </View>
  );
}
```

### With Transaction Status Feedback

```tsx
import { View, Text, Button, ActivityIndicator } from "react-native";
import { useScaffoldWriteContract } from "@/hooks/scaffold-stark";

export default function MintButton() {
  const { sendAsync, isLoading, status, error } = useScaffoldWriteContract({
    contractName: "NFT",
    functionName: "mint",
    args: [],
  });

  const renderStatus = () => {
    switch (status) {
      case "loading":
        return (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <ActivityIndicator size="small" />
            <Text style={{ marginLeft: 8 }}>Processing transaction...</Text>
          </View>
        );
      case "success":
        return <Text style={{ color: "green" }}>NFT minted successfully!</Text>;
      case "error":
        return <Text style={{ color: "red" }}>Error: {error?.message}</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={{ gap: 12 }}>
      <Button
        title="Mint NFT"
        onPress={() => sendAsync()}
        disabled={isLoading}
      />
      {renderStatus()}
    </View>
  );
}
```

## Transaction Flow

When `sendAsync()` is called, the following happens:

1. **Validation**: Checks wallet connection and network compatibility
2. **Contract Resolution**: Gets contract address and ABI from `deployedContracts.ts`
3. **Fee Estimation**: Estimates gas fees with a 1.5x safety multiplier
4. **User Confirmation**: Prompts user to confirm the transaction (via wallet)
5. **Submission**: Sends the transaction to the network
6. **Notification**: Displays toast notification with transaction status
7. **Return**: Returns the transaction hash on success

## Error Handling

```tsx
const { sendAsync } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "riskyOperation",
  args: [],
});

const handleClick = async () => {
  try {
    const txHash = await sendAsync();
    console.log("Transaction successful:", txHash);
  } catch (error) {
    if (error.message.includes("User rejected")) {
      // User cancelled the transaction
      console.log("Transaction cancelled by user");
    } else if (error.message.includes("insufficient funds")) {
      // Not enough balance
      Alert.alert("Error", "Insufficient funds for transaction");
    } else {
      // Other error
      Alert.alert("Error", error.message);
    }
  }
};
```

## Key Behaviors

### Wallet Validation

The hook validates that:
- A wallet is connected
- The connected network matches the target network
- The contract is deployed on the current network

### Fee Estimation

Gas fees are automatically estimated with a 1.5x safety multiplier. If estimation fails, default resource bounds are used as fallback.

### Block Explorer Links

On successful transactions, the toast notification includes a link to view the transaction on the block explorer.

## Differences from Web Version

The React Native version is functionally identical to the web version with these mobile adaptations:

- Uses React Native Alert/Toast for notifications instead of react-hot-toast
- Integrates with Cavos Aegis wallet for transaction signing
- Supports AVNU transaction sponsorship for gasless transactions (when configured)

## Related Hooks

- [useScaffoldReadContract](./useScaffoldReadContract) - Read contract data
- [useScaffoldMultiWriteContract](./useScaffoldMultiWriteContract) - Batch multiple writes
- [useTransactor](./useTransactor) - Low-level transaction handling
