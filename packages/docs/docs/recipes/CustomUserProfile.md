---
sidebar_position: 7
title: Fetch user profile and display it on your application
description: Learn how to use `useScaffoldStarkProfile` hook to fetch user profile and StarknetID from their servers.
---

# Custom User Profile Components

## Overview

Learn how to use `useScaffoldStarkProfile` hook to fetch user profile and StarknetID from their servers.

<details open>
<summary>Here is the full code, which we will be implementing in the guide below:</summary>

```tsx title="components/UserProfile.tsx"
import { useScaffoldStarkProfile } from "~~/hooks/scaffold-stark/useScaffoldStarkProfile";
import { useAccount } from "~~/hooks/useAccount";
import Image from "next/image";

export const UserProfile = () => {
  const { address } = useAccount();
  const { data: profile } = useScaffoldStarkProfile(address);

  if (!profile) return null;

  return (
    <div>
      <Image src={profile?.profilePicture || "https://placehold.co/100x100"} alt="Profile" width={100} height={100} />
      <h1>{profile.name || address}</h1>
    </div>
  );
};
```

</details>

## Implementation guide

This guide will walk you through creating a component that displays a user's Starknet profile information via the StarknetID API through our helper hook `useScaffoldStarkProfile`. We will be creating a new component called `UserProfile` for our example.

### 1. Create a new Component

First, let's create a basic structure for our `UserProfile` component.

```tsx title="components/UserProfile.tsx"
export const UserProfile = () => {
  return <div>{/* Profile information will go here */}</div>;
};
```

### 2. Get the User's Address

To fetch the profile associated with the currently connected wallet, we need the user's address. We can get this using the `useAccount` hook provided by Scaffold-Stark 2 or starknet-react.

```tsx title="components/UserProfile.tsx"
import { useAccount } from "~~/hooks/useAccount";

export const UserProfile = () => {
  const { address } = useAccount();

  return <div>{/* Profile information will go here */}</div>;
};
```

Here, we import `useAccount` and call it within our component. The hook returns an object containing the `address` of the connected account.

### 3. Fetch the User Profile

Now, we'll use the `useScaffoldStarkProfile` hook to fetch the user's profile data based on their address.

:::info
The `useScaffoldStarkProfile` hook requires the user's `address` to fetch the corresponding Starknet ID and profile information (like name and profile picture) from Starknet ID servers.
:::

```tsx title="components/UserProfile.tsx"
import { useScaffoldStarkProfile } from "~~/hooks/scaffold-stark/useScaffoldStarkProfile";
import { useAccount } from "~~/hooks/useAccount";

export const UserProfile = () => {
  const { address } = useAccount();
  const { data: profile } = useScaffoldStarkProfile(address);

  return <div>{/* Profile information will go here */}</div>;
};
```

We import `useScaffoldStarkProfile` and call it, passing the `address` we obtained in the previous step. We use [destructuring assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) to extract the `data` field and rename it to `profile`.

### 4. Handle Loading/Empty State

The profile data might not be available immediately (e.g., while fetching) or the user might not have a profile. We should handle this case gracefully by rendering nothing if the `profile` data is not yet available.

```tsx title="components/UserProfile.tsx"
import { useScaffoldStarkProfile } from "~~/hooks/scaffold-stark/useScaffoldStarkProfile";
import { useAccount } from "~~/hooks/useAccount";

export const UserProfile = () => {
  const { address } = useAccount();
  const { data: profile } = useScaffoldStarkProfile(address);

  // If profile data is not loaded, don't render anything
  if (!profile) return null;

  return <div>{/* Profile information will go here */}</div>;
};
```

### 5. Display Profile Picture and Name

Finally, let's display the user's profile picture and name. We'll use the `Image` component from `next/image` for the picture and display the profile name.

:::tip Fallbacks
It's crucial to provide fallbacks in case the profile data is incomplete.

- For the profile picture, we use a placeholder image URL (`"https://placehold.co/100x100"`) if `profile.profilePicture` is missing.
- For the name, we display the user's `address` if `profile.name` is missing.

:::

```tsx title="components/UserProfile.tsx"
import { useScaffoldStarkProfile } from "~~/hooks/scaffold-stark/useScaffoldStarkProfile";
import { useAccount } from "~~/hooks/useAccount";
import Image from "next/image"; // Import the Image component

export const UserProfile = () => {
  const { address } = useAccount();
  const { data: profile } = useScaffoldStarkProfile(address);

  if (!profile) return null;

  return (
    <div>
      {/* Display profile picture with fallback */}
      <Image src={profile?.profilePicture || "https://placehold.co/100x100"} alt="Profile" width={100} height={100} />
      {/* Display profile name with fallback to address */}
      <h1>{profile?.name || address}</h1>
    </div>
  );
};
```

And that's it! You now have a component that fetches and displays a user's Starknet profile information with appropriate fallbacks.
