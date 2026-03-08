---
sidebar_position: 6
---

# useScaffoldContract

Use this hook to get your contract instance by providing the contract name. It enables you to interact with your contract methods.
For reading data or sending transactions, it's recommended to use `useScaffoldReadContract` and `useScaffoldWriteContract`.

```ts
const { data: yourContract } = useScaffoldContract({
  contractName: "YourContract",
});
// Returns the greeting and can be called in any function, unlike useScaffoldReadContract
await yourContract?.call("greeting");

// For write operations, use useScaffoldWriteContract instead:
import { useScaffoldWriteContract } from "~~/hooks/scaffold-stark";

const { sendAsync } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "set_greeting",
  args: ["the greeting here"],
});
await sendAsync();
```

This example uses the `useScaffoldContract` hook to obtain a contract instance for the `YourContract` smart contract.

## Configuration

| Parameter        | Type     | Description           |
| :--------------- | :------- | :-------------------- |
| **contractName** | `string` | Name of the contract. |

## Return Value

- `data`: A read-only Contract instance (from starknet.js). Use `.call()` for reads. For writes, use `useScaffoldWriteContract` instead.

- `isLoading` : Boolean indicating if the contract is being loaded.
