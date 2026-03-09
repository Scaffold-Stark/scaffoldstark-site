---
sidebar_position: 2
title: Migration Guide (v2 → v3)
---

# Migration Guide: Scaffold-Stark v2 → v3

This guide covers the breaking changes when migrating from Scaffold-Stark v2 (using `@starknet-react/core`) to Scaffold-Stark v3 (using `@starknet-start/react`).

## Package Changes

Update your imports across the codebase:

| Old Package | New Package |
| :--- | :--- |
| `@starknet-react/core` | `@starknet-start/react` |
| `@starknet-react/chains` | `@starknet-start/chains` |

```bash
# Example: find and replace in your project
grep -r "@starknet-react/core" --include="*.ts" --include="*.tsx" -l
grep -r "@starknet-react/chains" --include="*.ts" --include="*.tsx" -l
```

## Wallet Connection

**Before (v2):** Wallets were configured manually using connector classes like `InjectedConnector`.

**After (v3):** Wallets are auto-discovered via the wallet standard ([get-starknet](https://github.com/starknet-io/get-starknet)). No manual connector setup is needed for standard wallets.

## Hook Changes

### `useAccount`

The `useAccount` hook no longer returns an `account: AccountInterface` object.

```ts
// v2
const { account, address, status } = useAccount();
// account was an AccountInterface instance

// v3
const { address, status, chainId, connector } = useAccount();
// No account object — use address and other fields directly
```

### `useScaffoldContract`

The hook no longer accepts an `account` parameter. It returns a read-only contract instance.

```ts
// v2
import { useAccount } from "@starknet-react/core";
const { account } = useAccount();
const { data: contract } = useScaffoldContract({
  contractName: "YourContract",
  account, // No longer supported
});
await contract?.write.setGreeting(["Hello"]);

// v3
const { data: contract } = useScaffoldContract({
  contractName: "YourContract",
});
// Read-only — use .call() for reads
await contract?.call("greeting");
// For writes, use useScaffoldWriteContract instead
```

### `useContractWrite` → Removed

`useContractWrite` no longer exists in `@starknet-start/react`. Use `useSendTransaction` or the scaffold wrapper `useScaffoldWriteContract`.

```ts
// v2
const { sendAsync, isPending } = useContractWrite({ calls });
await sendAsync();

// v3 — use useScaffoldWriteContract
const { sendAsync } = useScaffoldWriteContract({
  contractName: "YourContract",
  functionName: "set_greeting",
  args: ["Hello"],
});
await sendAsync();
```

### `useContract` → Removed

`useContract` no longer exists. Use starknet.js `Contract` class directly if you need low-level contract instances.

```ts
// v2
import { useContract } from "@starknet-react/core";
const { contract } = useContract({ abi, address });

// v3 — use starknet.js directly
import { Contract, RpcProvider } from "starknet";
const provider = new RpcProvider({ nodeUrl: "..." });
const contract = new Contract(abi, address, provider);
```

### `useTransactor`

The API has changed significantly:

```ts
// v2
const writeTx = useTransactor(_walletClient); // accepted optional wallet client
await writeTx(() => sendAsync()); // took a callback function

// v3
const { writeTransaction, transactionReceiptInstance, sendTransactionInstance } = useTransactor();
// No arguments to useTransactor()
// writeTransaction takes Call[] directly, not a callback
await writeTransaction([
  {
    contractAddress: "0x...",
    entrypoint: "transfer",
    calldata: ["0x...", "1", "0"],
  },
]);
```

**Key differences:**
- `useTransactor()` takes **no arguments** (no `_walletClient` parameter)
- Returns `{ writeTransaction, transactionReceiptInstance, sendTransactionInstance }`
- `writeTransaction(calls: Call[])` takes a `Call[]` array directly instead of a callback function
- Use `sendTransactionInstance.isPending` for loading state

## Burner Wallet

The burner wallet integration has changed completely:

```ts
// v2 — BurnerConnector class added to connectors array
import { BurnerConnector } from "@scaffold-stark/stark-burner";
const burnerConnector = new BurnerConnector();
connectors.push(burnerConnector);
// Switch accounts via: burnerConnector.burnerAccount = accounts[index];

// v3 — createBurnerWallet() factory returns a MockWallet, passed via extraWallets
import { createBurnerWallet } from "@scaffold-stark/stark-burner";
const burnerWallet = createBurnerWallet(chain);
// Pass to StarknetConfig via extraWallets prop:
// <StarknetConfig extraWallets={[burnerWallet]} ...>
// Switch accounts via: burnerWallet.switchAccount(index);
```

**Key differences:**
- Package version: `@scaffold-stark/stark-burner@0.2.0` (v3) vs `0.1.x` (v2)
- `BurnerConnector` class → `createBurnerWallet()` factory function
- Returns a `MockWallet` instance (from `@starknet-start/react`), not a connector
- Passed via `extraWallets` prop to `StarknetConfig`, not added to `connectors` array
- Account switching: `connector.switchAccount(index)` instead of `connector.burnerAccount = ...`

## URL Changes for starknet-react Documentation

If you reference starknet-react docs, the domain and URL format have changed:

| Old URL | New URL |
| :--- | :--- |
| `https://starknet-react.com/...` | `https://start.starknet-react.com/...` |
| `https://www.starknet-react.com/...` | `https://start.starknet-react.com/...` |

Hook URL paths changed from kebab-case to camelCase:

| Old Path | New Path |
| :--- | :--- |
| `/docs/hooks/use-read-contract` | `/docs/hooks/useReadContract` |
| `/docs/hooks/use-send-transaction` | `/docs/hooks/useSendTransaction` |
| `/docs/hooks/use-transaction-receipt` | `/docs/hooks/useTransactionReceipt` |

## Block Explorer: Starkscan → Voyager

The default block explorer has changed from Starkscan to Voyager.

**Before (v2):**

```tsx
import { starkscan } from "@starknet-react/core";
// <StarknetConfig explorer={starkscan} ...>
```

**After (v3):**

```tsx
import { voyager } from "@starknet-start/explorers";
// <StarknetConfig explorer={voyager} ...>
```

All default explorer URLs have changed:

| Network | Old URL (Starkscan) | New URL (Voyager) |
| :--- | :--- | :--- |
| Sepolia | `https://sepolia.starkscan.co/` | `https://sepolia.voyager.online/` |
| Mainnet | `https://starkscan.co/` | `https://voyager.online/` |

The helper functions `getBlockExplorerTxLink`, `getBlockExplorerAddressLink`, and `getBlockExplorerClasshashLink` in `utils/scaffold-stark/networks.ts` now default to Voyager URLs. Update the `baseUrl` values in that file if you have customized them:

```ts
// utils/scaffold-stark/networks.ts

// v2 (Starkscan)
const baseUrl = `https://sepolia.starkscan.co`;

// v3 (Voyager)
const baseUrl = `https://sepolia.voyager.online`;
```

## Keplr Wallet Removed

The custom `KeplrConnector` class has been removed entirely in v3. All `@keplr-wallet/*` dependencies (5 packages) have been removed from the project.

If Keplr adds official Starknet wallet standard support in the future, it will be auto-discovered without any custom connector code — no migration action needed beyond removing the old dependencies.

## New Packages in v3

The following packages are new or updated in v3:

| Package | Purpose |
| :--- | :--- |
| `@starknet-start/explorers` | Provides the `voyager` explorer config (replaces Starkscan) |
| `@starknet-start/providers` | Provides `jsonRpcProvider()` for chain-aware RPC configuration |
| `@starknet-io/get-starknet-modal` | Replaces `get-starknet-core` for wallet discovery modal |
| `@tanstack/react-query` | Now an explicit dependency (was previously bundled) |

The `starknet` package has also been bumped from `^9.2.1` to `^9.4.2`.

## Quick Migration Checklist

- [ ] Replace all `@starknet-react/core` imports with `@starknet-start/react`
- [ ] Replace all `@starknet-react/chains` imports with `@starknet-start/chains`
- [ ] Remove `account` parameter from `useScaffoldContract` calls
- [ ] Replace `useContractWrite` usage with `useScaffoldWriteContract` or `useSendTransaction`
- [ ] Replace `useContract` usage with starknet.js `Contract` directly
- [ ] Update `useTransactor` usage: remove arguments, use `writeTransaction(calls)` instead of callback pattern
- [ ] Remove manual connector setup — wallets are auto-discovered via wallet standard
- [ ] Migrate burner wallet from `BurnerConnector` to `createBurnerWallet()` + `extraWallets` prop
- [ ] Update `@scaffold-stark/stark-burner` to `0.2.0`
- [ ] Update any starknet-react documentation links to use `start.starknet-react.com`
- [ ] Remove `@keplr-wallet/*` dependencies and custom `KeplrConnector`
- [ ] Update block explorer from `starkscan` (`@starknet-react/core`) to `voyager` (`@starknet-start/explorers`)
- [ ] Update `baseUrl` values in `getBlockExplorerTxLink`, `getBlockExplorerAddressLink`, and `getBlockExplorerClasshashLink` in `utils/scaffold-stark/networks.ts` to Voyager URLs
- [ ] Replace `get-starknet-core` with `@starknet-io/get-starknet-modal`
- [ ] Add `@tanstack/react-query` as an explicit dependency
- [ ] Add `@starknet-start/explorers` and `@starknet-start/providers`
