---
sidebar_position: 9
---

# Avatar

Reusable avatar component that renders a Starknet ID profile picture when provided; otherwise falls back to a blo-generated blockie for the given address.

## Import

```tsx
import { Avatar } from "~~/components/scaffold-stark";
```

## Usage

```tsx
<Avatar address="0x034aA3F359A9D614239015126635CE7732c18fDF3" size={30} profilePicture={profile?.profilePicture} />
```

## Props

| Prop               | Type     | Default Value | Description                                                                                                  |
| ------------------ | -------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| `address`          | `string` | `undefined`   | The address used to render a fallback blockie if no profile picture is available. Must be in `0x___` format. |
| `size`             | `number` | `undefined`   | Width and Height in pixels (square).                                                                         |
| `profilePicture`   | `string` | `undefined`   | Starknet ID profile picture URL. If present, it will be rendered.                                            |
| `className` (opt.) | `string` | `undefined`   | Extra class names applied to the rendered image.                                                             |
