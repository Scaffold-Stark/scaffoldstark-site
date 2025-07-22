export const EXTENSIONS: {
  title: string;
  description: string;
  command: string;
}[] = [
  {
    title: "AUCO INDEXER",
    description: "Uses Auco Indexer for powerful blockchain indexing",
    command: "npx create-stark@latest -e auco",
  },
  {
    title: "ERC-20",
    description: "Start with a simple ERC-20 token implementation",
    command: "npx create-stark@latest -e erc20",
  },
  {
    title: "ERC-721",
    description: "Start with a simple ERC-721 token implementation",
    command: "npx create-stark@latest -e erc721",
  },
];
