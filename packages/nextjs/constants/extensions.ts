export const EXTENSIONS: {
  title: string;
  shortDesc: string;
  longDesc: string;
  github: string;
  isActive: boolean;
  command: string;
}[] = [
  {
    title: "AUCO INDEXER",
    shortDesc: "Uses Auco Indexer for powerful blockchain indexing",
    longDesc:
      "This Scaffold-Stark 2 extension comes pre-configured with Auco Indexer, providing an example to help you get started quickly with integrated indexer in your project",
    github: "https://github.com/Scaffold-Stark/create-starknet-extensions/tree/auco",
    isActive: true,
    command: "npx create-stark@latest -e auco",
  },
  {
    title: "ERC-20",
    shortDesc: "Start with a simple ERC-20 token implementation",
    longDesc:
      "This extension introduces an ERC-20 token contract and demonstrates how to interact with it, including getting a holder balance and transferring tokens.",
    github: "https://github.com/Scaffold-Stark/create-starknet-extensions",
    isActive: true,
    command: "npx create-stark@latest -e erc20",
  },
  {
    title: "ERC-721",
    shortDesc: "Start with a simple ERC-721 token implementation",
    longDesc:
      "This extension introduces an ERC-721 token contract and demonstrates how to use it, including getting the total supply and holder balance and listing all NFTs from the collection.",
    github: "https://github.com/Scaffold-Stark/create-starknet-extensions/tree/erc721",
    isActive: true,
    command: "npx create-stark@latest -e erc721",
  },
  {
    title: "Challenge 0: Simple NFT",
    shortDesc: "Build and deploy your first NFT smart contract with a React app",
    longDesc: "This challenge introduces your first smart contract deployment with a template React app featuring essential Starknet components, creating an NFT marketplace for purchasing and transferring tokens.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-0-simple-nft",
    isActive: true,
    command: "npx create-stark@latest -e challenge-0-simple-nft",
  },
  {
    title: "Challenge 1: Decentralized Staking",
    shortDesc: "Create a decentralized group funding application with cooperation mechanics",
    longDesc: "This challenge introduces a decentralized staking application where users coordinate group funding efforts, with cooperation leading to pooled funds and defection resulting in refunds.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-1-decentralized-staking",
    isActive: true,
    command: "npx create-stark@latest -e challenge-1-decentralized-staking",
  },
  {
    title: "Challenge 2: Token Vendor",
    shortDesc: "Build a decentralized vending machine for buying and selling tokens",
    longDesc: "This challenge introduces an unstoppable vending machine smart contract for trading tokens, teaching ERC20 approve patterns and contract-to-contract interactions.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-2-token-vendor",
    isActive: true,
    command: "npx create-stark@latest -e challenge-2-token-vendor",
  },
  {
    title: "Challenge 3: Dice Game",
    shortDesc: "Explore randomness on blockchain with block hash and dice game mechanics",
    longDesc: "This challenge demonstrates randomness generation using block hash in a dice game contract, while exploring exploitable weaknesses and stronger alternatives like oracles and VRF.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-3-dice-game",
    isActive: true,
    command: "npx create-stark@latest -e challenge-3-dice-game",
  },
  {
    title: "Challenge 4: Build a DEX",
    shortDesc: "Build a decentralized exchange for BALLOONS and STRK token trading",
    longDesc: "This challenge guides you through building a minimum viable DEX with BALLOONS ($BAL) and STRK token pair, implementing core exchange functionality and trading mechanics.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-4-build-a-dex",
    isActive: true,
    command: "npx create-stark@latest -e challenge-4-build-a-dex",
  },
  {
    title: "Challenge 5: Multisig Wallet",
    shortDesc: "Build a secure multisig wallet requiring multiple signatures for transactions",
    longDesc: "This challenge creates a multisig wallet smart contract where multiple signers must confirm transactions before execution, enabling secure asset management and governance.",
    github: "https://github.com/Scaffold-Stark/speedrunstark/tree/challenge-5-multisig-wallet",
    isActive: true,
    command: "npx create-stark@latest -e challenge-5-multisig-wallet",
  }
];
