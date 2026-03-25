---
sidebar_position: 5
title: Publishing Your App
description: Guide to building, submitting, and updating your Scaffold Stark React Native app on the App Store and Google Play.
---

# Publishing Your App

This guide covers everything you need to build, submit, and update your app using [Expo Application Services (EAS)](https://expo.dev/eas).

## One-Time Setup

Before your first build, link the project to your Expo account:

```sh
cd packages/rn
eas init
```

This adds a `projectId` to `app.json`. **Commit this change** — it ties your project to your Expo account and is required for all EAS commands.

### Prerequisites

- An [Expo account](https://expo.dev/signup)
- EAS CLI installed globally:

```sh
npm install -g eas-cli
```

## Required Tokens and Credentials

| Credential | Used For | Where to Get It |
|------------|----------|-----------------|
| **Expo Access Token** | All EAS commands (build, submit, update) | [expo.dev](https://expo.dev) → Account Settings → Access Tokens. Create a robot token for CI or a personal token for local use. |
| **Apple ID** | iOS App Store submissions | Your Apple Developer account email. Must be enrolled in the [Apple Developer Program](https://developer.apple.com/programs/) ($99/year). |
| **App-Specific Password** | iOS submissions via CI | [appleid.apple.com](https://appleid.apple.com) → Sign-In and Security → App-Specific Passwords. Required because EAS Submit can't do 2FA interactively. |
| **Google Play Service Account JSON** | Android Play Store submissions | Google Cloud Console → Create a service account with "Service Account User" role → Download JSON key → Grant it access in Google Play Console under API Access. See [EAS Submit Android docs](https://docs.expo.dev/submit/android/). |
| **App Store Connect App ID (`ascAppId`)** | iOS submissions | App Store Connect → Your App → General → App Information. It's the numeric Apple ID. |
| **Apple Team ID** | iOS builds | [developer.apple.com](https://developer.apple.com) → Account → Membership → Team ID. |

## GitHub Actions Secrets

If using the included CI workflows, add these as repository secrets (Settings → Secrets and variables → Actions):

- `EXPO_TOKEN` — required by all three workflows
- `EXPO_APPLE_ID` — required by EAS Submit (iOS)
- `EXPO_APPLE_APP_SPECIFIC_PASSWORD` — required by EAS Submit (iOS)

The Google Play service account JSON key should be placed at `packages/rn/google-service-account.json` (this path is gitignored).

## CI Workflows

The repo includes three GitHub Actions workflows, all **manual-only** (`workflow_dispatch`) — there are no automatic builds on push.

### EAS Build (`eas-build.yml`)

Runs lint and tests, then submits a cloud build to Expo. You choose the build profile (`development`, `preview`, or `production`) and platform (`ios`, `android`, or `all`). The `--no-wait` flag means CI exits after submitting the build job — check build status on [expo.dev](https://expo.dev).

### EAS Submit (`eas-submit.yml`)

Takes the latest successful EAS build and submits it to the App Store or Google Play Store.

### EAS Update (`eas-update.yml`)

Publishes an OTA (over-the-air) JavaScript bundle update. Users who already have the app installed receive the new JS code without downloading a new binary from the store.

## Local Build and Submit

You can build and submit directly from your machine:

```sh
cd packages/rn

# Login to Expo
eas login

# Build for both platforms
eas build --profile production --platform all

# Submit to iOS
eas submit --platform ios --profile production --latest

# Submit to Android
eas submit --platform android --profile production --latest

# OTA update (JS-only changes, no new binary needed)
eas update --branch production --message "your update message"
```

## Build Profiles

Three profiles are defined in `eas.json`:

| Profile | Purpose | Details |
|---------|---------|---------|
| **development** | Local development | Debug build with dev client. iOS uses the simulator. |
| **preview** | Internal testing | Internal distribution build for testing on real devices before store submission. |
| **production** | Store release | Store-ready build. Auto-increments version numbers. |

## Further Reading

See [`SUBMIT.md`](https://github.com/Scaffold-Stark/scaffold-stark-rn/blob/main/SUBMIT.md) in the repo for the full step-by-step App Store Connect and Google Play Console setup walkthrough.
