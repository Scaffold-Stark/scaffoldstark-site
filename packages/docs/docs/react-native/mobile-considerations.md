---
sidebar_position: 6
title: Mobile Considerations
description: Mobile-specific features, wallet integration, and best practices for Scaffold Stark React Native.
---

# Mobile-Specific Considerations

This guide covers mobile-specific features, wallet integration, UI components, and performance best practices for building mobile dApps with Scaffold Stark React Native.

## Wallet Integration

### Cavos Aegis (Wallet-as-a-Service)

Scaffold Stark RN uses [Cavos Aegis](https://cavos.xyz) for wallet management on Sepolia and Mainnet. This provides:

- **Seamless onboarding**: No wallet app installation required
- **Social login**: Sign in with email, Google, Apple, etc.
- **Secure key management**: Keys stored securely on device
- **Transaction signing**: Native signing experience

#### Configuration

```bash
# packages/rn/.env
EXPO_PUBLIC_AEGIS_APP_ID=your_aegis_app_id
```

```tsx
// App setup (already configured in scaffold)
import { CavosProvider } from "@cavos/react-native";

export default function App() {
  return (
    <CavosProvider appId={process.env.EXPO_PUBLIC_AEGIS_APP_ID}>
      <StarknetProvider>
        {/* Your app */}
      </StarknetProvider>
    </CavosProvider>
  );
}
```

### Local Development (Devnet)

For local development, the app connects directly to devnet accounts without wallet authentication:

```typescript
// Devnet uses prefunded accounts
// No wallet configuration needed
yarn chain  # Provides accounts with test ETH/STRK
```

### Supported Wallets

| Environment | Wallet Solution | Notes |
|-------------|-----------------|-------|
| Devnet | Direct account | Prefunded test accounts |
| Sepolia | Cavos Aegis | Wallet-as-a-Service |
| Mainnet | Cavos Aegis | Wallet-as-a-Service |

:::note Future Support
Support for external mobile wallets (Argent Mobile, Braavos) via WalletConnect is planned for future releases.
:::

## Transaction Sponsorship (AVNU)

Scaffold Stark RN integrates with [AVNU](https://avnu.fi) for gasless transactions:

```bash
# packages/rn/.env
EXPO_PUBLIC_AVNU_API_KEY=your_avnu_api_key
```

This enables:
- Users don't need ETH/STRK for gas
- Improved onboarding experience
- Sponsored transactions on testnet/mainnet

## UI Components

### Styling with NativeWind

Scaffold Stark RN uses [NativeWind](https://www.nativewind.dev/) (Tailwind CSS for React Native):

```tsx
import { View, Text } from "react-native";

export default function Card() {
  return (
    <View className="bg-white rounded-xl p-4 shadow-lg">
      <Text className="text-lg font-bold text-gray-900">
        Card Title
      </Text>
      <Text className="text-gray-600 mt-2">
        Card content goes here
      </Text>
    </View>
  );
}
```

### Dark Mode Support

```tsx
import { View, Text, useColorScheme } from "react-native";

export default function ThemedCard() {
  const colorScheme = useColorScheme();

  return (
    <View className="bg-white dark:bg-gray-800 p-4 rounded-xl">
      <Text className="text-gray-900 dark:text-white">
        Adapts to system theme
      </Text>
    </View>
  );
}
```

### Common Component Patterns

#### Address Display

```tsx
import { View, Text, TouchableOpacity } from "react-native";
import * as Clipboard from "expo-clipboard";

interface AddressProps {
  address: string;
  truncate?: boolean;
}

export function Address({ address, truncate = true }: AddressProps) {
  const displayAddress = truncate
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : address;

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(address);
    // Show toast notification
  };

  return (
    <TouchableOpacity onPress={copyToClipboard}>
      <Text className="font-mono text-blue-500">{displayAddress}</Text>
    </TouchableOpacity>
  );
}
```

#### Balance Display

```tsx
import { View, Text } from "react-native";
import { useScaffoldStrkBalance } from "@/hooks/scaffold-stark";

export function BalanceDisplay({ address }) {
  const { formatted, symbol, isLoading } = useScaffoldStrkBalance({ address });

  if (isLoading) {
    return <Text className="text-gray-400">Loading...</Text>;
  }

  return (
    <View className="flex-row items-baseline">
      <Text className="text-2xl font-bold">{formatted}</Text>
      <Text className="text-gray-500 ml-1">{symbol}</Text>
    </View>
  );
}
```

#### Transaction Button

```tsx
import { TouchableOpacity, Text, ActivityIndicator } from "react-native";

interface TxButtonProps {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function TxButton({ title, onPress, isLoading, disabled }: TxButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`
        py-3 px-6 rounded-xl flex-row justify-center items-center
        ${disabled || isLoading ? "bg-gray-300" : "bg-blue-500"}
      `}
    >
      {isLoading && <ActivityIndicator color="white" className="mr-2" />}
      <Text className="text-white font-semibold">
        {isLoading ? "Processing..." : title}
      </Text>
    </TouchableOpacity>
  );
}
```

## Performance Optimization

### RPC Call Optimization

Minimize RPC calls on mobile to save battery and data:

```tsx
// DON'T: Multiple separate reads
const { data: balance } = useScaffoldReadContract({ ... });
const { data: name } = useScaffoldReadContract({ ... });
const { data: symbol } = useScaffoldReadContract({ ... });

// DO: Batch reads in a single component with useEffect
// Or create a contract function that returns multiple values
```

#### Disable Unnecessary Watching

```tsx
// For rarely changing data, disable watch
const { data } = useScaffoldReadContract({
  contractName: "Token",
  functionName: "name",
  watch: false,  // Name doesn't change
});
```

#### Conditional Data Fetching

```tsx
const [showDetails, setShowDetails] = useState(false);

// Only fetch when user wants to see details
const { data } = useScaffoldEventHistory({
  contractName: "YourContract",
  eventName: "Transfer",
  fromBlock: 0n,
  enabled: showDetails,  // Disable until needed
});
```

### Caching Strategies

#### React Query Integration

The hooks use TanStack Query (React Query) internally. Configure caching:

```tsx
// In your app setup
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minute
      cacheTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});
```

#### Local Storage Cache

For frequently accessed data:

```tsx
import AsyncStorage from "@react-native-async-storage/async-storage";

// Cache contract addresses locally
const cacheContractData = async (key: string, data: any) => {
  await AsyncStorage.setItem(key, JSON.stringify(data));
};

const getCachedData = async (key: string) => {
  const cached = await AsyncStorage.getItem(key);
  return cached ? JSON.parse(cached) : null;
};
```

### Offline Handling

Handle offline scenarios gracefully:

```tsx
import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export function useNetworkStatus() {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? false);
    });

    return unsubscribe;
  }, []);

  return isConnected;
}

// Usage
export default function MyComponent() {
  const isConnected = useNetworkStatus();

  if (!isConnected) {
    return (
      <View className="p-4 bg-yellow-100 rounded-lg">
        <Text>You're offline. Some features may be unavailable.</Text>
      </View>
    );
  }

  return <YourContent />;
}
```

## Responsive Design

### Safe Area Handling

```tsx
import { SafeAreaView } from "react-native-safe-area-context";

export default function Screen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Content */}
    </SafeAreaView>
  );
}
```

### Device-Specific Layouts

```tsx
import { Dimensions, useWindowDimensions } from "react-native";

export default function ResponsiveLayout({ children }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <View className={isTablet ? "flex-row" : "flex-col"}>
      {children}
    </View>
  );
}
```

### Keyboard Handling

```tsx
import { KeyboardAvoidingView, Platform } from "react-native";

export default function FormScreen() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      {/* Form inputs */}
    </KeyboardAvoidingView>
  );
}
```

## Security Best Practices

### Sensitive Data

```tsx
// DON'T: Store private keys in AsyncStorage
// DON'T: Log sensitive data
console.log(privateKey); // Never do this

// DO: Use Cavos Aegis for secure key management
// DO: Use secure storage for sensitive data
import * as SecureStore from "expo-secure-store";

await SecureStore.setItemAsync("sensitive_key", value);
```

### Deep Link Validation

```tsx
// Validate deep link parameters
const handleDeepLink = (url: string) => {
  const parsed = parseUrl(url);

  // Validate contract addresses
  if (!isValidStarknetAddress(parsed.contractAddress)) {
    console.warn("Invalid contract address in deep link");
    return;
  }

  // Proceed with valid data
};
```

### Transaction Confirmation

Always show clear transaction details before signing:

```tsx
export function TransactionConfirmation({ tx, onConfirm, onCancel }) {
  return (
    <View className="p-4 bg-white rounded-xl">
      <Text className="text-lg font-bold">Confirm Transaction</Text>

      <View className="mt-4 space-y-2">
        <Text>Contract: {tx.contractName}</Text>
        <Text>Function: {tx.functionName}</Text>
        <Text>Estimated Fee: {tx.estimatedFee} STRK</Text>
      </View>

      <View className="flex-row mt-6 space-x-4">
        <TouchableOpacity onPress={onCancel} className="flex-1 py-3 bg-gray-200 rounded-lg">
          <Text className="text-center">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onConfirm} className="flex-1 py-3 bg-blue-500 rounded-lg">
          <Text className="text-center text-white">Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
```

## App Store Submission

For guidance on submitting your app to the App Store and Play Store, refer to `SUBMIT.md` in the scaffold-stark-rn repository.

Key considerations:
- Configure app icons and splash screens
- Set up proper bundle identifiers
- Configure signing certificates
- Test on physical devices before submission

## Related Documentation

- [Example Workflows](./examples) - Complete usage examples
- [Hooks Reference](./hooks/hooks-overview) - Hook documentation
- [Project Structure](./project-structure) - Understand the codebase
