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
    isActive: false,
    command: "npx create-stark@latest -e erc20",
  },
  {
    title: "ERC-721",
    shortDesc: "Start with a simple ERC-721 token implementation",
    longDesc:
      "This extension introduces an ERC-721 token contract and demonstrates how to use it, including getting the total supply and holder balance and listing all NFTs from the collection.",
    github: "https://github.com/Scaffold-Stark/create-starknet-extensions",
    isActive: false,
    command: "npx create-stark@latest -e erc721",
  },
];
