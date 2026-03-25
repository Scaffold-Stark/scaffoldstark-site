---
sidebar_position: 7
---

# CustomConnectButton

Scaffold-Stark uses a custom _"Connect Button"_, that is enhanced with several useful features:

- **Balance Display**: Shows the balance of the native token from the connected address.
- **Chain Name and Color**: Displays the name of the connected blockchain and uses a distinct color for each chain.
- **Custom Modal**: Includes copy address feature, view its QR code, access address details in blockexplorer, and disconnect.

You can extend this component to suit your app's needs.

### Wallet Discovery

In v3, wallet discovery is automatic via the [wallet standard](https://github.com/starknet-io/get-starknet). Any installed browser wallet that implements the Starknet wallet standard will appear in the connect modal without any manual connector configuration.

On **devnet**, the burner wallet is shown as the primary connection option, making local development fast without requiring a browser extension.

Additional wallets (such as Cartridge Controller) can be injected via the `extraWallets` prop on `StarknetConfig`. See the [Cartridge Controller recipe](/docs/recipes/AddControllerConnector) for an example.

![CustomConnectButton Example](/img/customConnectButton.png)

## Import

```tsx
import { CustomConnectButton } from "~~/components/scaffold-stark";
```

## Usage

```tsx
<CustomConnectButton />
```
