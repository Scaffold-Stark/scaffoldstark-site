---
sidebar_position: 6
title: useScaffoldEventHistory
description: Hook for querying historical contract events.
---

# useScaffoldEventHistory

Use this hook to fetch and parse historical events emitted by your smart contracts. It supports filtering, pagination, and optional continuous watching for new events.

```typescript
const { data: events, isLoading } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "Transfer",
  fromBlock: 0n,
});
```

## Configuration

| Parameter | Type | Description |
|:----------|:-----|:------------|
| **contractName** | `string` | Name of the deployed contract to query events from. |
| **eventName** | `string` | Name of the event to retrieve. Autocompleted from contract ABI. |
| **fromBlock** | `bigint` | Starting block number for event retrieval. |
| **filters** (optional) | `object` | Event parameter filters to narrow results. |
| **blockData** (optional) | `boolean` | Include block information with each event. Default: `false` |
| **transactionData** (optional) | `boolean` | Include transaction details with each event. Default: `false` |
| **receiptData** (optional) | `boolean` | Include receipt information with each event. Default: `false` |
| **watch** (optional) | `boolean` | Enable continuous polling for new events. Default: `false` |
| **format** (optional) | `boolean` | Parse and format event data. Default: `true` |
| **enabled** (optional) | `boolean` | Toggle hook activation. Default: `true` |

## Return Values

| Property | Type | Description |
|:---------|:-----|:------------|
| **data** | `EventData[] \| undefined` | Array of parsed events with type, args, and parsedArgs |
| **isLoading** | `boolean` | `true` while fetching events |
| **error** | `string \| undefined` | Error message if the query failed |

### EventData Structure

```typescript
interface EventData {
  type: string;                    // Event name
  args: Record<string, unknown>;   // Raw event arguments
  parsedArgs: Record<string, any>; // Parsed/formatted arguments
  blockNumber?: bigint;            // Block number (if blockData: true)
  transactionHash?: string;        // Tx hash (if transactionData: true)
  // ... additional fields based on options
}
```

## Usage Examples

### Basic Event Query

```tsx
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useScaffoldEventHistory } from "@/hooks/scaffold-stark";

export default function TransferHistory() {
  const { data: transfers, isLoading, error } = useScaffoldEventHistory({
    contractName: "Token",
    eventName: "Transfer",
    fromBlock: 0n,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <FlatList
      data={transfers}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={{ padding: 12, borderBottomWidth: 1 }}>
          <Text>From: {item.parsedArgs.from}</Text>
          <Text>To: {item.parsedArgs.to}</Text>
          <Text>Amount: {item.parsedArgs.value?.toString()}</Text>
        </View>
      )}
      ListEmptyComponent={<Text>No transfers found</Text>}
    />
  );
}
```

### Filtered Events

```tsx
import { useScaffoldEventHistory } from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function MyTransfers() {
  const { address } = useAccount();

  const { data: myTransfers, isLoading } = useScaffoldEventHistory({
    contractName: "Token",
    eventName: "Transfer",
    fromBlock: 0n,
    filters: {
      from: address, // Only transfers FROM the connected account
    },
    enabled: !!address, // Only run when address is available
  });

  // ... render transfers
}
```

### With Block and Transaction Data

```tsx
import { useScaffoldEventHistory } from "@/hooks/scaffold-stark";

export default function DetailedEventList() {
  const { data: events, isLoading } = useScaffoldEventHistory({
    contractName: "NFT",
    eventName: "Mint",
    fromBlock: 0n,
    blockData: true,
    transactionData: true,
  });

  return (
    <FlatList
      data={events}
      renderItem={({ item }) => (
        <View style={{ padding: 12 }}>
          <Text>Token ID: {item.parsedArgs.tokenId?.toString()}</Text>
          <Text>Block: {item.blockNumber?.toString()}</Text>
          <Text>Tx: {item.transactionHash?.slice(0, 10)}...</Text>
        </View>
      )}
    />
  );
}
```

### Real-time Event Watching

```tsx
import { useState, useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { useScaffoldEventHistory } from "@/hooks/scaffold-stark";

export default function LiveOrderBook() {
  const { data: orders, isLoading } = useScaffoldEventHistory({
    contractName: "Exchange",
    eventName: "OrderPlaced",
    fromBlock: 0n,
    watch: true, // Poll for new events
  });

  return (
    <View>
      <Text style={{ fontWeight: "bold" }}>
        Live Orders ({orders?.length || 0})
      </Text>
      <FlatList
        data={orders?.slice(0, 10)} // Show latest 10
        renderItem={({ item }) => (
          <View style={{ padding: 8 }}>
            <Text>
              {item.parsedArgs.side}: {item.parsedArgs.amount?.toString()} @ {item.parsedArgs.price?.toString()}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
```

### Pagination Pattern

```tsx
import { useState } from "react";
import { View, Button, FlatList } from "react-native";
import { useScaffoldEventHistory } from "@/hooks/scaffold-stark";

const EVENTS_PER_PAGE = 20;

export default function PaginatedEvents() {
  const [fromBlock, setFromBlock] = useState(0n);

  const { data: events, isLoading } = useScaffoldEventHistory({
    contractName: "YourContract",
    eventName: "SomeEvent",
    fromBlock,
  });

  const loadMore = () => {
    if (events && events.length > 0) {
      const lastEvent = events[events.length - 1];
      setFromBlock(lastEvent.blockNumber + 1n);
    }
  };

  return (
    <View>
      <FlatList
        data={events}
        renderItem={({ item }) => (
          <View style={{ padding: 8 }}>
            <Text>{JSON.stringify(item.parsedArgs)}</Text>
          </View>
        )}
        ListFooterComponent={
          <Button
            title={isLoading ? "Loading..." : "Load More"}
            onPress={loadMore}
            disabled={isLoading}
          />
        }
      />
    </View>
  );
}
```

### Activity Feed

```tsx
import { View, Text, FlatList, Image } from "react-native";
import { useScaffoldEventHistory } from "@/hooks/scaffold-stark";
import { formatDistanceToNow } from "date-fns";

export default function ActivityFeed() {
  const { data: activities, isLoading } = useScaffoldEventHistory({
    contractName: "Social",
    eventName: "Activity",
    fromBlock: 0n,
    blockData: true,
    watch: true,
  });

  const renderActivity = ({ item }) => {
    const { activityType, user, data } = item.parsedArgs;

    return (
      <View style={{ flexDirection: "row", padding: 12, alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "bold" }}>
            {user.slice(0, 8)}... {activityType}
          </Text>
          <Text style={{ color: "gray" }}>
            Block #{item.blockNumber?.toString()}
          </Text>
        </View>
      </View>
    );
  };

  if (isLoading && !activities?.length) {
    return <Text>Loading activity...</Text>;
  }

  return (
    <FlatList
      data={activities}
      renderItem={renderActivity}
      keyExtractor={(_, index) => index.toString()}
      ListEmptyComponent={<Text>No activity yet</Text>}
    />
  );
}
```

## Event Filtering

Filters are applied at the RPC level for efficiency:

```typescript
// Filter by single value
filters: {
  from: "0x123...",
}

// Multiple filters (AND logic)
filters: {
  from: "0x123...",
  to: "0x456...",
}
```

:::note
Not all event parameters can be filtered. Only indexed parameters in the Cairo event definition support filtering.
:::

## Performance Considerations

### Large Block Ranges

Querying from block 0 on mainnet can be slow. Consider:

```typescript
// Start from a recent block
const recentBlock = currentBlock - 10000n;

const { data } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "SomeEvent",
  fromBlock: recentBlock,
});
```

### Disable When Not Needed

```typescript
const [showHistory, setShowHistory] = useState(false);

const { data } = useScaffoldEventHistory({
  // ...config
  enabled: showHistory, // Only fetch when user wants to see history
});
```

### Watch Mode Polling

When `watch: true`, the hook polls for new events at regular intervals. This is useful for real-time UIs but consumes RPC resources.

## Related Hooks

- [useScaffoldReadContract](./useScaffoldReadContract) - Read current contract state
- [useDeployedContractInfo](./useDeployedContractInfo) - Get contract metadata
