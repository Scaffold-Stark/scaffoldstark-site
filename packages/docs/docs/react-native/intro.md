---
sidebar_position: 1
title: Introduction
description: Overview of Scaffold Stark React Native for mobile dApp development on Starknet.
---

# Scaffold Stark React Native

:::info Documentation Notice
This documentation is currently hosted within the Scaffold Stark docs. In the future, it may be moved to a dedicated documentation site for Scaffold Stark React Native. Bookmark the [GitHub repository](https://github.com/Scaffold-Stark/scaffold-stark-rn) for the latest updates and announcements.
:::

Scaffold Stark React Native (scaffold-stark-rn) is a mobile development framework built on top of [Scaffold Stark 2](https://scaffoldstark.com), designed to help developers rapidly build and deploy mobile dApps on the Starknet blockchain.

## Overview

Scaffold Stark React Native combines the power of React Native with Expo to provide a seamless mobile development experience for Starknet. It shares the same smart contract infrastructure (`snfoundry` package) with the web version while providing mobile-optimized hooks and components.

| packages/rn (React Native App) | packages/snfoundry (Smart Contracts) |
|--------------------------------|--------------------------------------|
| Expo 54 | Cairo Contracts |
| React Native 0.81 | Deployment Scripts |
| NativeWind | Testing with snforge |
| Starknet-React | Shared with SS2 |

## Key Differences from Scaffold Stark 2 (Web)

| Feature | Scaffold Stark 2 (Web) | Scaffold Stark RN (Mobile) |
|---------|------------------------|----------------------------|
| **Framework** | Next.js | React Native + Expo |
| **Routing** | Next.js App Router | Expo Router (file-based) |
| **Styling** | Tailwind CSS | NativeWind (Tailwind for RN) |
| **Wallet Support** | Browser Extensions | Cavos Aegis (WaaS) |
| **Platform** | Web Browsers | iOS & Android |
| **State Management** | React Context | Zustand |
| **Smart Contracts** | `packages/snfoundry` | `packages/snfoundry` (identical) |

## Target Audience

Scaffold Stark React Native is designed for:

- **Mobile dApp Developers**: Build native iOS and Android applications that interact with Starknet smart contracts
- **Web3 Developers**: Extend your existing Scaffold Stark 2 projects to mobile platforms
- **Startups & Teams**: Rapidly prototype and ship mobile blockchain applications
- **Learning & Experimentation**: Explore mobile Web3 development with a complete, working template

## Use Cases

- **DeFi Mobile Apps**: Trading, lending, and portfolio management on the go
- **NFT Marketplaces**: Browse, mint, and trade NFTs from mobile devices
- **Gaming dApps**: Mobile-first blockchain games on Starknet
- **Social dApps**: Decentralized social platforms with mobile-native UX
- **DAO Tools**: Governance and voting apps for community participation

## Features

- **Pre-configured Expo Project**: Ready-to-run mobile app with Starknet integration
- **Scaffold Stark Hooks**: Familiar hooks adapted for React Native (`useScaffoldReadContract`, `useScaffoldWriteContract`, etc.)
- **Wallet-as-a-Service**: Built-in Cavos Aegis integration for seamless wallet management
- **Transaction Sponsorship**: AVNU integration for gasless transactions
- **Local Development**: Full local devnet support for rapid iteration
- **Type-Safe Contracts**: Auto-generated TypeScript types from Cairo contracts

## Status

:::note Experimental
Scaffold Stark React Native is currently marked as **experimental**. While fully functional, the API may change as the project evolves. Production usage should be approached with appropriate testing and caution.
:::

## Quick Links

- [GitHub Repository](https://github.com/Scaffold-Stark/scaffold-stark-rn)
- [Scaffold Stark 2 Documentation](/quick-start/installation)
- [Starknet Documentation](https://docs.starknet.io)
- [Expo Documentation](https://docs.expo.dev)

## Next Steps

Ready to build your first mobile dApp on Starknet? Head to the [Installation Guide](./installation) to get started.
