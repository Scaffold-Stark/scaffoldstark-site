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

The default block explorer is now **Voyager** instead of Starkscan. Block explorer links in the UI (transaction links, address links, etc.) will now point to `voyager.online` and `sepolia.voyager.online` instead of `starkscan.co`.

No changes are required in your app code — this is handled internally by the template. The only case where you need to act is if you customized `ScaffoldStarkAppWithProviders.tsx` to pass `explorer={starkscan}`:

```tsx
// If you have this in your customized ScaffoldStarkAppWithProviders.tsx:
import { starkscan } from "@starknet-react/core"; // remove this

// Replace with:
import { voyager } from "@starknet-start/explorers";
// <StarknetConfig explorer={voyager} ...>
```

## Keplr: Custom Connector Removed

The custom `KeplrConnector` has been removed in v3 — Keplr is still usable, but you no longer need to import and configure it manually. If Keplr supports the Starknet wallet standard in the user's browser, it will be auto-discovered without any connector code, saving you the bundle size cost of the `@keplr-wallet/*` packages.

If your v2 project explicitly installed those packages, you can remove them:

```bash
npm uninstall @keplr-wallet/types @keplr-wallet/cosmos @keplr-wallet/crypto @keplr-wallet/common @keplr-wallet/unit
```


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
- [ ] Remove `@keplr-wallet/*` packages from `package.json` (optional — Keplr is auto-discovered if installed)
- [ ] If you customized `ScaffoldStarkAppWithProviders.tsx`: update `explorer` from `starkscan` to `voyager` (`@starknet-start/explorers`)
