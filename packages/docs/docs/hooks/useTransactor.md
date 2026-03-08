---
sidebar_position: 9
---

# useTransactor

Use this hook to interact with the chain and give UI feedback on the transaction status.

![Transaction success](/img/transactorSuccess.gif)

Any error will instead show a popup with nice error message.

![Error Example](/img/transactorFail.gif)

```ts
const { writeTransaction, transactionReceiptInstance, sendTransactionInstance } = useTransactor();
const calls = [
  {
    contractAddress: "0xd8da6bf26964af9d7eed9e03e53415d37aa96045",
    entrypoint: "transfer",
    calldata: ["0x123...", "1000000000000000000", "0"],
  },
];
await writeTransaction(calls);
```

This example tries to send a transfer transaction, prompting the connected wallet for a signature. In the case of a successful transaction, it will show a popup in the UI with the message: "🎉 Transaction completed successfully!".

You can pass in a list of valid `Call` — Type is from `starknet`.

[Refer to this recipe](/recipes/WriteToContractWriteAsyncButton) for a more detailed example.

## Configuration

### useTransactor

`useTransactor()` takes no arguments. It internally uses `useSendTransaction` from `@starknet-start/react`.

### writeTransaction

| Parameter | Type     | Description                                          |
| :-------- | :------- | :--------------------------------------------------- |
| **calls** | `Call[]` | A list of valid `Call` — Type is from `starknet`. |

## Return Values

### writeTransaction

- The function that is used to initialize the UI feedback flow. Takes a `Call[]` array directly.

### transactionReceiptInstance

- An instance of [useTransactionReceipt](https://start.starknet-react.com/docs/hooks/useTransactionReceipt) for tracking receipt details.

### sendTransactionInstance

- An instance of [useSendTransaction](https://start.starknet-react.com/docs/hooks/useSendTransaction) for tracking transaction status.
