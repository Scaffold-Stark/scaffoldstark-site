---
sidebar_position: 7
---

# useScaffoldWatchContractEvent

Use this hook to subscribe to events emitted by your smart contract, and receive real-time updates when these events are emitted.

```ts
useScaffoldWatchContractEvent({
  contractName: "YourContract",
  eventName: "GreetingChanged",
  // The onLogs function is called whenever a GreetingChanged event is emitted by the contract.
  // Parameters emitted by the event can be destructed using the below example
  // for this example: event GreetingChange(address greetingSetter, string newGreeting, bool premium, uint256 value);
  onLogs: logs => {
    logs.map(log => {
      const { greetingSetter, value, premium, newGreeting } = log.args;
      console.log("📡 GreetingChange event", greetingSetter, value, premium, newGreeting);
    });
  },
});
```

This example subscribes to the `GreetingChanged` event emitted by the `YourContract` smart contract and logs the parameters from the event to the console when it's emitted.


## Configuration

| Parameter        | Type       | Description                                                                                                                                                                                                                                                                                                                                                                           |
| :--------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **contractName** | `string`   | Name of the contract to read from.                                                                                                                                                                                                                                                                                                                                                    |
| **eventName**    | `string`   | Name of the event to read.                                                                                                                                                                                                                                                                                                                                                            |
| **onLogs**       | `function` | Callback function to execute when the event is emitted. Accepts an array of `logs` that occurred during the [`pollingInterval`](/deploying/deploy-nextjs-app#--pollinginterval) set at `scaffold.config.ts`. Each array item contains an `args` property, which can be destructured to get the parameters emitted by the event. This function can customized according to your needs. |

:::note

It is recommended to `setState` using [updater function](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state) in the `onLogs` function to avoid problems due to caching.

:::
