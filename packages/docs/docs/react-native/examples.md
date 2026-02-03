---
sidebar_position: 7
title: Example Workflows
description: Practical examples for common mobile dApp patterns with Scaffold Stark React Native.
---

# Example Workflows

This guide provides practical examples of common mobile dApp patterns using Scaffold Stark React Native.

## 1. Reading Contract State

Display contract data in a mobile-optimized UI.

### Simple Value Display

```tsx
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import { useScaffoldReadContract } from "@/hooks/scaffold-stark";

export default function GreetingCard() {
  const { data: greeting, isLoading, error } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "get_greeting",
  });

  if (isLoading) {
    return (
      <View style={styles.card}>
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text style={styles.loadingText}>Loading greeting...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.card, styles.errorCard]}>
        <Text style={styles.errorText}>Failed to load greeting</Text>
      </View>
    );
  }

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Current Greeting</Text>
      <Text style={styles.value}>{greeting?.toString()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  errorCard: {
    backgroundColor: "#fef2f2",
  },
  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },
  value: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#111827",
  },
  loadingText: {
    marginTop: 12,
    color: "#6b7280",
    textAlign: "center",
  },
  errorText: {
    color: "#dc2626",
    textAlign: "center",
  },
});
```

### User-Specific Data

```tsx
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useScaffoldReadContract } from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function UserTokens() {
  const { address } = useAccount();

  const { data: balance, isLoading } = useScaffoldReadContract({
    contractName: "Token",
    functionName: "balance_of",
    args: [address],
  });

  const { data: tokenIds } = useScaffoldReadContract({
    contractName: "NFT",
    functionName: "tokens_of_owner",
    args: [address],
  });

  if (!address) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Connect your wallet to view your tokens</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.balanceCard}>
        <Text style={styles.label}>Token Balance</Text>
        <Text style={styles.balance}>
          {isLoading ? "..." : balance?.toString() || "0"}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Your NFTs</Text>
      <FlatList
        data={tokenIds as bigint[]}
        numColumns={2}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <View style={styles.nftCard}>
            <Text style={styles.nftId}>#{item.toString()}</Text>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No NFTs found</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  balanceCard: {
    backgroundColor: "#1e3a5f",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
  },
  label: { color: "#94a3b8", fontSize: 14 },
  balance: { color: "#ffffff", fontSize: 32, fontWeight: "bold" },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },
  nftCard: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  nftId: { fontSize: 16, fontWeight: "600" },
  emptyText: { color: "#9ca3af", textAlign: "center", marginTop: 20 },
  message: { textAlign: "center", color: "#6b7280" },
});
```

## 2. Sending Transactions

Handle user transactions with proper feedback.

### Simple Transaction

```tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";
import { useScaffoldWriteContract } from "@/hooks/scaffold-stark";

export default function SetGreetingForm() {
  const [newGreeting, setNewGreeting] = useState("");

  const { sendAsync, isLoading, status } = useScaffoldWriteContract({
    contractName: "YourContract",
    functionName: "set_greeting",
    args: [newGreeting],
  });

  const handleSubmit = async () => {
    if (!newGreeting.trim()) {
      Alert.alert("Error", "Please enter a greeting");
      return;
    }

    try {
      const txHash = await sendAsync();
      Alert.alert("Success", `Transaction submitted!\n${txHash?.slice(0, 20)}...`);
      setNewGreeting("");
    } catch (error: any) {
      if (!error.message?.includes("User rejected")) {
        Alert.alert("Error", error.message || "Transaction failed");
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update Greeting</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter new greeting..."
        value={newGreeting}
        onChangeText={setNewGreeting}
        editable={!isLoading}
      />

      <TouchableOpacity
        style={[styles.button, isLoading && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Sending..." : "Set Greeting"}
        </Text>
      </TouchableOpacity>

      {status === "success" && (
        <Text style={styles.successText}>Greeting updated successfully!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#3b82f6",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#93c5fd" },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  successText: { color: "#22c55e", marginTop: 12, textAlign: "center" },
});
```

### Transfer Form with Validation

```tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { useScaffoldWriteContract, useScaffoldStrkBalance } from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function TransferScreen() {
  const { address } = useAccount();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const { formatted: balance } = useScaffoldStrkBalance({ address });

  const { sendAsync, isLoading } = useScaffoldWriteContract({
    contractName: "Token",
    functionName: "transfer",
    args: [recipient, BigInt(amount || "0") * BigInt(1e18)],
  });

  const validateAddress = (addr: string) => {
    return addr.startsWith("0x") && addr.length === 66;
  };

  const handleTransfer = async () => {
    // Validation
    if (!validateAddress(recipient)) {
      Alert.alert("Invalid Address", "Please enter a valid Starknet address");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Invalid Amount", "Please enter a valid amount");
      return;
    }

    if (parseFloat(amount) > parseFloat(balance || "0")) {
      Alert.alert("Insufficient Balance", "You don't have enough tokens");
      return;
    }

    // Confirmation
    Alert.alert(
      "Confirm Transfer",
      `Send ${amount} tokens to ${recipient.slice(0, 10)}...?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            try {
              await sendAsync();
              Alert.alert("Success", "Transfer completed!");
              setRecipient("");
              setAmount("");
            } catch (error: any) {
              Alert.alert("Error", error.message);
            }
          },
        },
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceValue}>{balance || "0"} STRK</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Recipient Address</Text>
        <TextInput
          style={styles.input}
          placeholder="0x..."
          value={recipient}
          onChangeText={setRecipient}
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Text style={styles.label}>Amount</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
        />

        <TouchableOpacity
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={handleTransfer}
          disabled={isLoading || !recipient || !amount}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Processing..." : "Send Tokens"}
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  balanceCard: {
    backgroundColor: "#1e40af",
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  balanceLabel: { color: "#bfdbfe", fontSize: 14 },
  balanceValue: { color: "#ffffff", fontSize: 28, fontWeight: "bold" },
  form: { flex: 1 },
  label: { fontSize: 14, color: "#374151", marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#3b82f6",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  buttonDisabled: { backgroundColor: "#93c5fd" },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
});
```

## 3. Real-time Event Listening

Monitor contract events in real-time.

```tsx
import { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useScaffoldEventHistory } from "@/hooks/scaffold-stark";

interface TransferEvent {
  parsedArgs: {
    from: string;
    to: string;
    value: bigint;
  };
  blockNumber?: bigint;
}

export default function TransferFeed() {
  const [refreshing, setRefreshing] = useState(false);

  const { data: events, isLoading, error } = useScaffoldEventHistory({
    contractName: "Token",
    eventName: "Transfer",
    fromBlock: 0n,
    watch: true, // Enable real-time updates
    blockData: true,
  });

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Events will auto-refresh, just show loading state
    setTimeout(() => setRefreshing(false), 1000);
  }, []);

  const renderEvent = ({ item }: { item: TransferEvent }) => {
    const { from, to, value } = item.parsedArgs;

    return (
      <View style={styles.eventCard}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventType}>Transfer</Text>
          <Text style={styles.blockNumber}>
            Block #{item.blockNumber?.toString()}
          </Text>
        </View>

        <View style={styles.eventBody}>
          <View style={styles.addressRow}>
            <Text style={styles.addressLabel}>From:</Text>
            <Text style={styles.address}>
              {from.slice(0, 8)}...{from.slice(-6)}
            </Text>
          </View>

          <View style={styles.addressRow}>
            <Text style={styles.addressLabel}>To:</Text>
            <Text style={styles.address}>
              {to.slice(0, 8)}...{to.slice(-6)}
            </Text>
          </View>

          <Text style={styles.amount}>
            {(Number(value) / 1e18).toFixed(4)} STRK
          </Text>
        </View>
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Error loading events: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transfer Activity</Text>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>Live</Text>
        </View>
      </View>

      <FlatList
        data={events as TransferEvent[]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderEvent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.centered}>
            <Text style={styles.emptyText}>
              {isLoading ? "Loading events..." : "No transfers yet"}
            </Text>
          </View>
        }
        contentContainerStyle={events?.length === 0 && styles.emptyList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  title: { fontSize: 20, fontWeight: "bold" },
  liveBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#22c55e",
    marginRight: 4,
  },
  liveText: { color: "#166534", fontSize: 12, fontWeight: "500" },
  eventCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  eventType: { fontWeight: "600", color: "#3b82f6" },
  blockNumber: { color: "#9ca3af", fontSize: 12 },
  eventBody: {},
  addressRow: { flexDirection: "row", marginBottom: 4 },
  addressLabel: { color: "#6b7280", width: 50 },
  address: { fontFamily: "monospace", color: "#374151" },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#111827",
    marginTop: 8,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { color: "#9ca3af" },
  errorText: { color: "#dc2626" },
  emptyList: { flex: 1 },
});
```

## 4. Network Switching UI

Allow users to see and understand the current network.

```tsx
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useTargetNetwork } from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function NetworkSelector() {
  const { targetNetwork } = useTargetNetwork();
  const { chainId, status } = useAccount();

  const isConnected = status === "connected";
  const isCorrectNetwork = chainId === targetNetwork.id;

  const getNetworkStyle = (network: string) => {
    switch (network) {
      case "mainnet":
        return { bg: "#dcfce7", text: "#166534", dot: "#22c55e" };
      case "sepolia":
        return { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" };
      case "devnet":
        return { bg: "#dbeafe", text: "#1e40af", dot: "#3b82f6" };
      default:
        return { bg: "#f3f4f6", text: "#374151", dot: "#9ca3af" };
    }
  };

  const networkStyle = getNetworkStyle(targetNetwork.network);

  const handleNetworkInfo = () => {
    Alert.alert(
      targetNetwork.name,
      `Chain ID: ${targetNetwork.id}\n` +
      `RPC: ${targetNetwork.rpcUrls.default.http[0]}\n` +
      `Explorer: ${targetNetwork.blockExplorers?.default?.url || "N/A"}`,
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.networkBadge, { backgroundColor: networkStyle.bg }]}
        onPress={handleNetworkInfo}
      >
        <View style={[styles.dot, { backgroundColor: networkStyle.dot }]} />
        <Text style={[styles.networkName, { color: networkStyle.text }]}>
          {targetNetwork.name}
        </Text>
      </TouchableOpacity>

      {isConnected && !isCorrectNetwork && (
        <View style={styles.warning}>
          <Text style={styles.warningText}>
            Your wallet is on a different network
          </Text>
        </View>
      )}

      {targetNetwork.network !== "mainnet" && (
        <View style={styles.testnetBanner}>
          <Text style={styles.testnetText}>
            Test network - tokens have no real value
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", padding: 16 },
  networkBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  networkName: {
    fontWeight: "600",
    fontSize: 14,
  },
  warning: {
    marginTop: 12,
    padding: 12,
    backgroundColor: "#fef2f2",
    borderRadius: 8,
  },
  warningText: {
    color: "#dc2626",
    fontSize: 12,
  },
  testnetBanner: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#f3f4f6",
    borderRadius: 4,
  },
  testnetText: {
    color: "#6b7280",
    fontSize: 11,
  },
});
```

## Complete Example: Mini DeFi App

A complete example combining multiple patterns:

```tsx
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import {
  useScaffoldReadContract,
  useScaffoldWriteContract,
  useScaffoldStrkBalance,
  useTargetNetwork,
} from "@/hooks/scaffold-stark";
import { useAccount } from "@starknet-react/core";

export default function MiniDeFiApp() {
  const { address, status } = useAccount();
  const { targetNetwork } = useTargetNetwork();
  const [depositAmount, setDepositAmount] = useState("");

  // Read user's STRK balance
  const { formatted: strkBalance } = useScaffoldStrkBalance({ address });

  // Read user's staked balance
  const { data: stakedBalance } = useScaffoldReadContract({
    contractName: "Staking",
    functionName: "staked_balance",
    args: [address],
  });

  // Read total staked
  const { data: totalStaked } = useScaffoldReadContract({
    contractName: "Staking",
    functionName: "total_staked",
  });

  // Stake action
  const { sendAsync: stake, isLoading: isStaking } = useScaffoldWriteContract({
    contractName: "Staking",
    functionName: "stake",
    args: [BigInt(parseFloat(depositAmount || "0") * 1e18)],
  });

  // Withdraw action
  const { sendAsync: withdraw, isLoading: isWithdrawing } = useScaffoldWriteContract({
    contractName: "Staking",
    functionName: "withdraw_all",
    args: [],
  });

  const handleStake = async () => {
    if (!depositAmount || parseFloat(depositAmount) <= 0) {
      Alert.alert("Error", "Enter a valid amount");
      return;
    }

    try {
      await stake();
      setDepositAmount("");
      Alert.alert("Success", "Tokens staked!");
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  const handleWithdraw = async () => {
    Alert.alert("Confirm", "Withdraw all staked tokens?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Withdraw",
        onPress: async () => {
          try {
            await withdraw();
            Alert.alert("Success", "Tokens withdrawn!");
          } catch (error: any) {
            Alert.alert("Error", error.message);
          }
        },
      },
    ]);
  };

  if (status !== "connected") {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.centered}>
          <Text style={styles.title}>Mini Staking</Text>
          <Text style={styles.subtitle}>Connect your wallet to continue</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Network Badge */}
        <View style={styles.networkBadge}>
          <Text style={styles.networkText}>{targetNetwork.name}</Text>
        </View>

        {/* Balance Cards */}
        <View style={styles.cardRow}>
          <View style={[styles.card, styles.cardHalf]}>
            <Text style={styles.cardLabel}>Wallet Balance</Text>
            <Text style={styles.cardValue}>{strkBalance || "0"}</Text>
            <Text style={styles.cardSymbol}>STRK</Text>
          </View>
          <View style={[styles.card, styles.cardHalf]}>
            <Text style={styles.cardLabel}>Staked</Text>
            <Text style={styles.cardValue}>
              {stakedBalance ? (Number(stakedBalance) / 1e18).toFixed(2) : "0"}
            </Text>
            <Text style={styles.cardSymbol}>STRK</Text>
          </View>
        </View>

        {/* Total Staked */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Total Protocol TVL</Text>
          <Text style={styles.tvlValue}>
            {totalStaked ? (Number(totalStaked) / 1e18).toFixed(2) : "0"} STRK
          </Text>
        </View>

        {/* Stake Form */}
        <View style={styles.form}>
          <Text style={styles.formTitle}>Stake STRK</Text>
          <TextInput
            style={styles.input}
            placeholder="Amount to stake"
            value={depositAmount}
            onChangeText={setDepositAmount}
            keyboardType="decimal-pad"
          />
          <TouchableOpacity
            style={[styles.button, styles.stakeButton]}
            onPress={handleStake}
            disabled={isStaking}
          >
            <Text style={styles.buttonText}>
              {isStaking ? "Staking..." : "Stake"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Withdraw Button */}
        {stakedBalance && BigInt(stakedBalance.toString()) > 0n && (
          <TouchableOpacity
            style={[styles.button, styles.withdrawButton]}
            onPress={handleWithdraw}
            disabled={isWithdrawing}
          >
            <Text style={styles.withdrawText}>
              {isWithdrawing ? "Withdrawing..." : "Withdraw All"}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f172a" },
  scrollContent: { padding: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { color: "#ffffff", fontSize: 28, fontWeight: "bold" },
  subtitle: { color: "#94a3b8", marginTop: 8 },
  networkBadge: {
    alignSelf: "center",
    backgroundColor: "#1e293b",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 20,
  },
  networkText: { color: "#94a3b8", fontSize: 12 },
  cardRow: { flexDirection: "row", gap: 12, marginBottom: 12 },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardHalf: { flex: 1 },
  cardLabel: { color: "#94a3b8", fontSize: 12 },
  cardValue: { color: "#ffffff", fontSize: 24, fontWeight: "bold", marginTop: 4 },
  cardSymbol: { color: "#64748b", fontSize: 14 },
  tvlValue: { color: "#22c55e", fontSize: 20, fontWeight: "bold", marginTop: 4 },
  form: { backgroundColor: "#1e293b", borderRadius: 16, padding: 16, marginTop: 8 },
  formTitle: { color: "#ffffff", fontSize: 16, fontWeight: "600", marginBottom: 12 },
  input: {
    backgroundColor: "#334155",
    borderRadius: 8,
    padding: 12,
    color: "#ffffff",
    fontSize: 16,
    marginBottom: 12,
  },
  button: { borderRadius: 12, padding: 16, alignItems: "center" },
  stakeButton: { backgroundColor: "#3b82f6" },
  withdrawButton: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#475569" },
  buttonText: { color: "#ffffff", fontSize: 16, fontWeight: "600" },
  withdrawText: { color: "#94a3b8", fontSize: 16, fontWeight: "600" },
});
```

## Next Steps

- [Hooks Reference](./hooks/hooks-overview) - Detailed hook documentation
- [Mobile Considerations](./mobile-considerations) - Performance and UX tips
- [Smart Contracts](./smart-contracts) - Contract development guide
