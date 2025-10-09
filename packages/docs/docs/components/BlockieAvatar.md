---
sidebar_position: 8
---

# BlockieAvatar

Show a blockie (bar code profile icon) component for a given public address.

If a Starknet ID profile picture is available, prefer rendering that image in the parent and fallback to `BlockieAvatar` otherwise. `BlockieAvatar` itself always renders a blo-generated identicon for the provided address.

![BlockieAvatar Example](/img/BlockieAvatar.png)

If you want more control over styling the blockie, you can directly use [blo](https://github.com/bpierre/blo) (pre-installed in Scaffold-Stark 2) and internally used by `BlockieAvatar` component to get the image URL.

## Import

```tsx
import { BlockieAvatar } from "~~/components/scaffold-stark";
```

## Usage

```tsx
<BlockieAvatar address="0x34aA3F359A9D614239015126635CE7732c18fDF3" size={24} />
```

## Props

| Prop      | Type     | Default Value | Description                                                                               |
| --------- | -------- | ------------- | ----------------------------------------------------------------------------------------- |
| `address` | `string` | `undefined`   | The address for which you want to display its blockie. Ensure it's in the `0x___` format. |
| `size`    | `number` | `undefined`   | Width and Height in pixels (square).                                                      |
