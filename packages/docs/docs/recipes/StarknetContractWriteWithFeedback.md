---
sidebar_position: 4
title: Starknet useSendTransaction with transaction status
description: Show feedback on transaction status to user by `useSendTransaction` along with `useTransactor`
---

# Starknet `useSendTransaction` with transaction status

This recipe demonstrates how to create a button for contract interaction using the `useTransactor` hook from Scaffold-Stark. The interaction includes the capability to provide feedback on the transaction status when using starknet-start `useSendTransaction`.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/ContractInteraction.tsx"
import * as React from "react";
import { useTransactor } from "~~/hooks/scaffold-stark";

export const ContractInteraction = () => {
  const { writeTransaction, sendTransactionInstance } = useTransactor();
  const { isPending } = sendTransactionInstance;

  const handleTransfer = async () => {
    try {
      await writeTransaction([
        {
          contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          entrypoint: "transfer",
          calldata: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "1", "0"],
        },
      ]);
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  return (
    <button className="btn btn-primary" onClick={handleTransfer} disabled={isPending}>
      {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
    </button>
  );
};
```

</details>

## Implementation

### 1. Set Up Your Component

Create a new component in the "components" folder. The component will show a button that will allow users to interact with your smart contract.

```tsx title="components/ContractInteraction.tsx"
import * as React from "react";

export const ContractInteraction = () => {
  return <button>Send</button>;
};
```

### 2. Configure transaction calls

Define your transaction calls as a `Call[]` array. Each call specifies the contract address, entrypoint, and calldata. No `useContractWrite` or `useContract` hooks are needed — `useTransactor` handles everything internally via `useSendTransaction`.

```tsx
import * as React from "react";
// highlight-start
import { useTransactor } from "~~/hooks/scaffold-stark";
// highlight-end

export const ContractInteraction = () => {
  // highlight-start
  const { writeTransaction, sendTransactionInstance } = useTransactor();
  // highlight-end

  return <button>Send</button>;
};
```

### 3. Use `writeTransaction` to send the transaction

Call `writeTransaction` with a `Call[]` array directly. It handles wallet interaction and UI feedback automatically.

```tsx
import * as React from "react";
import { useTransactor } from "~~/hooks/scaffold-stark";

export const ContractInteraction = () => {
  const { writeTransaction, sendTransactionInstance } = useTransactor();

  return (
    <button
      onClick={() =>
        // highlight-start
        writeTransaction([
          {
            contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
            entrypoint: "transfer",
            calldata: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "1", "0"],
          },
        ])
        // highlight-end
      }
    >
      Transfer
    </button>
  );
};
```

### 4. Wrap in an async handler with try/catch

Wrap the `writeTransaction` call in a handler function to start the transaction when the user clicks the button and catch any errors.

```tsx
import * as React from "react";
import { useTransactor } from "~~/hooks/scaffold-stark";

export const ContractInteraction = () => {
  const { writeTransaction, sendTransactionInstance } = useTransactor();

  // highlight-start
  const handleTransfer = async () => {
    try {
      await writeTransaction([
        {
          contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          entrypoint: "transfer",
          calldata: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "1", "0"],
        },
      ]);
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };
  // highlight-end

  return (
    <button className="btn btn-primary" onClick={handleTransfer}>
      Transfer
    </button>
  );
};
```

### 5. Add loading state

Use `sendTransactionInstance.isPending` to show a loading spinner while the transaction is being processed and disable the button.

```tsx
import * as React from "react";
import { useTransactor } from "~~/hooks/scaffold-stark";

export const ContractInteraction = () => {
  const { writeTransaction, sendTransactionInstance } = useTransactor();
  // highlight-start
  const { isPending } = sendTransactionInstance;
  // highlight-end

  const handleTransfer = async () => {
    try {
      await writeTransaction([
        {
          contractAddress: "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
          entrypoint: "transfer",
          calldata: ["0xd8da6bf26964af9d7eed9e03e53415d37aa96045", "1", "0"],
        },
      ]);
    } catch (e) {
      console.log("Unexpected error in writeTx", e);
    }
  };

  return (
    // highlight-start
    <button className="btn btn-primary" onClick={handleTransfer} disabled={isPending}>
      {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Send"}
    </button>
    // highlight-end
  );
};
```
