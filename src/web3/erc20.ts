import { BigNumber, Contract, ethers } from "ethers";

export const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address owner) view returns (uint256)",
  "function allowance(address owner, address spender) view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (bool)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "event Transfer(address indexed from, address indexed to, uint256 value)",
  "event Approval(address indexed owner, address indexed spender, uint256 value)",
] as const;

export type Erc20Metadata = {
  name: string;
  symbol: string;
  decimals: number;
};

export function isAddress(value: string): boolean {
  return ethers.utils.isAddress(value);
}

export function erc20(address: string, providerOrSigner: ethers.Signer | ethers.providers.Provider) {
  return new Contract(address, ERC20_ABI, providerOrSigner);
}

export async function readErc20Metadata(
  contract: Contract
): Promise<Erc20Metadata> {
  const [name, symbol, decimals] = await Promise.all([
    contract.name() as Promise<string>,
    contract.symbol() as Promise<string>,
    contract.decimals() as Promise<number>,
  ]);

  return { name, symbol, decimals: Number(decimals) };
}

export function formatUnitsSafe(value: BigNumber | undefined, decimals: number | undefined): string {
  if (!value || decimals === undefined) return "-";
  return ethers.utils.formatUnits(value, decimals);
}

export function parseUnitsSafe(value: string, decimals: number | undefined): BigNumber {
  if (decimals === undefined) {
    throw new Error("Token decimals 未知，请先读取 token 信息");
  }
  if (!value.trim()) {
    throw new Error("请输入数量");
  }
  return ethers.utils.parseUnits(value, decimals);
}
