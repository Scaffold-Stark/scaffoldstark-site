export const EXTENSIONS: {
  title: string;
  shortDesc: string;
  longDesc: string;
  github: string;
  isActive: boolean;
  command: string;
  category: "scaffold" | "speedrun";
}[] = [
  {
    title: "AUCO INDEXER",
    shortDesc: "Uses Auco Indexer for powerful blockchain indexing",
    longDesc:
      'This Scaffold-Stark 2 extension comes pre-configured with Auco Indexer, providing an example to help you get started quickly with integrated indexer in your project.<br><br><a href="https://scaffoldstark.com/auco" target="_blank" rel="noopener noreferrer">Read Auco Indexer Documentation</a>',
    github: "https://github.com/Scaffold-Stark/create-starknet-extensions/tree/auco",
    isActive: true,
    command: "npx create-stark@latest -e auco",
    category: "scaffold",
  },
  {
    title: "ERC-20",
    shortDesc: "Start with a simple ERC-20 token implementation",
    longDesc:
      "This extension introduces an ERC-20 token contract and demonstrates how to interact with it, including getting a holder balance and transferring tokens.",
    github: "https://github.com/Scaffold-Stark/create-starknet-extensions",
    isActive: true,
    command: "npx create-stark@latest -e erc-20",
    category: "scaffold",
  },
  {
    title: "ERC-721",
    shortDesc: "Start with a simple ERC-721 token implementation",
    longDesc:
      "This extension introduces an ERC-721 token contract and demonstrates how to use it, including getting the total supply and holder balance and listing all NFTs from the collection.",
    github: "https://github.com/Scaffold-Stark/create-starknet-extensions/tree/erc721",
    isActive: true,
    command: "npx create-stark@latest -e erc-721",
    category: "scaffold",
  },
  {
    title: "ERC-1155",
    shortDesc: "Start with a simple ERC-1155 token implementation",
    longDesc:
      "This extension introduces an ERC-1155 token contract and demonstrates how to use it, including multi-token contract with game items including Gold, Silver, Thor's Hammer, Sword, and Shield. Each item has different properties and can be minted and transferred.",
    github: "https://github.com/Scaffold-Stark/create-starknet-extensions/tree/erc1155",
    isActive: true,
    command: "npx create-stark@latest -e erc-1155",
    category: "scaffold",
  },
  {
    title: "Challenge 0: Simple NFT",
    shortDesc: "Build and deploy your first NFT smart contract with a React app",
    longDesc:
      "This challenge introduces your first smart contract deployment with a template React app featuring essential Starknet components, creating an NFT marketplace for purchasing and transferring tokens.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-0-simple-nft",
    isActive: true,
    command: "npx create-stark@latest -e challenge-0-simple-nft",
    category: "speedrun",
  },
  {
    title: "Challenge 1: Decentralized Staking",
    shortDesc: "Create a decentralized group funding application with cooperation mechanics",
    longDesc:
      "This challenge introduces a decentralized staking application where users coordinate group funding efforts, with cooperation leading to pooled funds and defection resulting in refunds.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-1-decentralized-staking",
    isActive: true,
    command: "npx create-stark@latest -e challenge-1-decentralized-staking",
    category: "speedrun",
  },
  {
    title: "Challenge 2: Token Vendor",
    shortDesc: "Build a decentralized vending machine for buying and selling tokens",
    longDesc:
      "This challenge introduces an unstoppable vending machine smart contract for trading tokens, teaching ERC20 approve patterns and contract-to-contract interactions.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-2-token-vendor",
    isActive: true,
    command: "npx create-stark@latest -e challenge-2-token-vendor",
    category: "speedrun",
  },
  {
    title: "Challenge 3: Dice Game",
    shortDesc: "Explore randomness on blockchain with block hash and dice game mechanics",
    longDesc:
      "This challenge demonstrates randomness generation using block hash in a dice game contract, while exploring exploitable weaknesses and stronger alternatives like oracles and VRF.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-3-dice-game",
    isActive: true,
    command: "npx create-stark@latest -e challenge-3-dice-game",
    category: "speedrun",
  },
  {
    title: "Challenge 4: Build a DEX",
    shortDesc: "Build a decentralized exchange for BALLOONS and STRK token trading",
    longDesc:
      "This challenge guides you through building a minimum viable DEX with BALLOONS ($BAL) and STRK token pair, implementing core exchange functionality and trading mechanics.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-4-build-a-dex",
    isActive: true,
    command: "npx create-stark@latest -e challenge-4-build-a-dex",
    category: "speedrun",
  },
  {
    title: "Challenge 5: Multisig Wallet",
    shortDesc: "Build a secure multisig wallet requiring multiple signatures for transactions",
    longDesc:
      "This challenge creates a multisig wallet smart contract where multiple signers must confirm transactions before execution, enabling secure asset management and governance.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-5-multisig-wallet",
    isActive: true,
    command: "npx create-stark@latest -e challenge-5-multisig-wallet",
    category: "speedrun",
  },
  {
    title: "Challenge 6: Stable Coin",
    shortDesc: "Build a decentralized stablecoin backed by STRK collateral",
    longDesc:
      "This challenge guides you through building MyUSDEngine to interact with MyUSD, a crypto-backed stablecoin designed to maintain a peg to $1 USD. You'll implement core DeFi concepts including collateralization, minting, burning, interest rates, and liquidations to create a robust stablecoin system where users can deposit STRK collateral and mint stablecoins.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-6-stable-coin",
    isActive: true,
    command: "npx create-stark@latest -e challenge-6-stable-coin",
    category: "speedrun",
  },
];
