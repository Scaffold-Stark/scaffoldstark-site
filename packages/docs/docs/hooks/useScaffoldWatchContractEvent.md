---
sidebar_position: 7
---

# useScaffoldWatchContractEvent

The `useScaffoldWatchContractEvent` hook is a custom React hook designed to listen for specific event emission from your contract, and fire a callback provided by you on every emission. It simplifies the process of reading contract data by using Starknet React and Starknetjs utilities.

## Usage Example

```ts
import useScaffoldWatchContractEvent from '~~/hooks/scaffold-stark/useScaffoldWatchContractEvent'

useScaffoldWatchContractEvent({
  contractName: "YourContract",
  eventName: "GreetingChange",
  // The onLogs function is called whenever a GreetingChange event is emitted by the contract.
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

This example subscribes to the `GreetingChange` event emitted by the `YourContract` smart contract and logs the parameters from the event to the console when it's emitted.

This hook is a wrapper around wagmi's [useWatchContractEvent](https://wagmi.sh/react/api/hooks/useWatchContractEvent).

## Configuration

| Parameter        | Type       | Description                                                                                                                                                                                                                                                                                                                                                                           |
| :--------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **contractName** | `string`   | Name of the contract to read from.                                                                                                                                                                                                                                                                                                                                                    |
| **eventName**    | `string`   | Name of the event to listen for.                                                                                                                                                                                                                                                                                                                                                            |
| **onLogs**       | `function` | Callback function to execute when the event is emitted. Accepts an array of `logs` (events) that occurred during the [`pollingInterval`](/deploying/deploy-nextjs-app#--pollinginterval) set at `scaffold.config.ts`. Each array item contains an `args` property, which can be destructured to get the parameters emitted by the event. This function can customized according to your needs. The `onLogs` function is fired for every log within the array |

:::note

It is recommended to `setState` using [updater function](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state) in the `onLogs` function to avoid problems due to caching.

:::

## Return Values

- `isLoading` A boolean indicating whether the data is currently being loaded.
- `error` An error message if an error occurred while fetching the data.

## Best Practices

- Use this hook in components that need to fire a function when an event occurs within the contract..
- Ensure that the component using this hook is wrapped in a StarkNet React provider.

:::note

The onLogs function gives you access to the same data returned in the ```useScaffoldEventHistory``` hook.
The ```args```, ```block```, and other data can be used as valuable data to fire functions based off.

:::
