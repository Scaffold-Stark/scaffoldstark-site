---
sidebar_position: 5
title: Mobile Considerations
description: Mobile-specific features, wallet integration, and best practices for Scaffold Stark React Native.
---

# Mobile-Specific Considerations

This guide covers mobile-specific features, wallet integration, UI components, and performance best practices for building mobile dApps with Scaffold Stark React Native.

## Wallet Integration

### Cavos Aegis (Wallet-as-a-Service)

Scaffold Stark RN uses [Cavos Aegis](https://cavos.xyz) (`@cavos/aegis`) for wallet management on Sepolia and Mainnet. This provides:

- **Seamless onboarding**: No wallet app installation required
- **Social login**: Sign in with email, Google, Apple, etc.
- **Secure key management**: Keys stored securely on device
- **Transaction signing**: Native signing experience

#### Configuration

Aegis is configured in `packages/rn/configs/aegisConfig.ts`:

```typescript
const aegisConfig = {
  network: "SN_DEVNET" | "SN_SEPOLIA",
  appName: "Starknet React Native",
  appId: process.env.EXPO_PUBLIC_AEGIS_APP_ID,
  paymasterApiKey: process.env.EXPO_PUBLIC_AVNU_API_KEY,
  enableLogging: true,
};
```

The scaffold automatically wraps your app with the necessary providers in `ScaffoldStarkAppWithProviders`:

```tsx
// Already configured in the scaffold
<StarknetConfig connectors={connectors} provider={provider}>
  <AegisProvider config={aegisConfig}>
    <ThemeProvider>
      {children}
    </ThemeProvider>
  </AegisProvider>
</StarknetConfig>
```

### Burner Wallet (Devnet)

For local development, the scaffold includes a built-in burner wallet that uses prefunded devnet accounts. Burner wallet keys are stored securely using `expo-secure-store`.

The burner wallet is automatically available when `devnet` is included in your `scaffold.config.ts` target networks.

### Supported Wallets

| Environment | Wallet Solution | Notes |
|-------------|-----------------|-------|
| Devnet | Burner Wallet | Prefunded test accounts, stored in secure storage |
| Sepolia | Cavos Aegis (CavosConnector) | Wallet-as-a-Service with social login |
| Mainnet | Cavos Aegis (CavosConnector) | Wallet-as-a-Service with social login |

Wallet connectors are configured in `packages/rn/configs/connectors.ts`:

```typescript
// Connectors include:
// 1. CavosConnector - social login, web2 wallet onboarding
// 2. BurnerConnector - local devnet testing (when devnet is in targetNetworks)
```

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

The scaffold includes a `ThemeProvider` with a built-in color system. Use the `useTheme` hook to access theme state:

```tsx
import { View, Text } from "react-native";
import { useTheme, themeColors } from "@/components/scaffold-stark/ThemeProvider";

export default function ThemedCard() {
  const { theme, isDark, toggleTheme } = useTheme();
  const colors = themeColors[theme];

  return (
    <View style={{ backgroundColor: colors.background, padding: 16, borderRadius: 12 }}>
      <Text style={{ color: colors.text }}>
        Current theme: {theme}
      </Text>
    </View>
  );
}
```

The theme colors include:

```typescript
{
  light: {
    primary: "#8B5CF6",        // Purple
    background: "#FFFFFF",
    text: "#000000",
    border: "#8B45FD",
    // ... additional colors
  },
  dark: {
    primary: "#8B5CF6",        // Purple
    background: "#111827",     // Dark gray
    text: "#FFFFFF",
    border: "#374151",
    // ... additional colors
  },
}
```

You can also use NativeWind's dark mode classes:

```tsx
<View className="bg-white dark:bg-gray-800 p-4 rounded-xl">
  <Text className="text-gray-900 dark:text-white">
    Adapts to system theme
  </Text>
</View>
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
      gcTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
    },
  },
});
```

#### Secure Storage

For sensitive data (wallet keys, tokens), use `expo-secure-store`:

```tsx
import * as SecureStore from "expo-secure-store";

// Store sensitive data securely
await SecureStore.setItemAsync("wallet_key", value);
const key = await SecureStore.getItemAsync("wallet_key");
```

The scaffold uses `expo-secure-store` internally for burner wallet key storage and auto-connect state.

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
// DON'T: Store private keys in plain storage
// DON'T: Log sensitive data
console.log(privateKey); // Never do this

// DO: Use Cavos Aegis for secure key management on testnet/mainnet
// DO: Use expo-secure-store for sensitive data (scaffold does this for burner wallet keys)
import * as SecureStore from "expo-secure-store";

await SecureStore.setItemAsync("sensitive_key", value);
const value = await SecureStore.getItemAsync("sensitive_key");
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

- [Recipes](./recipes) - Practical usage recipes
- [Hooks Reference](./hooks/hooks-overview) - Hook documentation
- [Smart Contracts](./smart-contracts) - Contract development guide
