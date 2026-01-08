export function toHexChainId(chainId: number): string {
  return `0x${chainId.toString(16)}`;
}

export function chainName(chainId?: number): string {
  switch (chainId) {
    case 1:
      return "Ethereum Mainnet";
    case 5:
      return "Goerli";
    case 11155111:
      return "Sepolia";
    case 137:
      return "Polygon";
    case 10:
      return "Optimism";
    case 42161:
      return "Arbitrum One";
    case 8453:
      return "Base";
    default:
      return chainId ? `Chain ${chainId}` : "Unknown";
  }
}

export function explorerTxUrl(chainId: number | undefined, txHash: string): string | undefined {
  if (!chainId) return undefined;

  const prefix =
    chainId === 1
      ? "https://etherscan.io"
      : chainId === 5
        ? "https://goerli.etherscan.io"
        : chainId === 11155111
          ? "https://sepolia.etherscan.io"
          : chainId === 137
            ? "https://polygonscan.com"
            : chainId === 10
              ? "https://optimistic.etherscan.io"
              : chainId === 42161
                ? "https://arbiscan.io"
                : chainId === 8453
                  ? "https://basescan.org"
                  : undefined;

  return prefix ? `${prefix}/tx/${txHash}` : undefined;
}
