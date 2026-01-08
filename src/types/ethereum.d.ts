export {};

declare global {
  interface Window {
    ethereum?: Eip1193Provider;
  }
}

type Eip1193RequestArgs = {
  method: string;
  params?: unknown[] | object;
};

type Eip1193Listener = (...args: any[]) => void;

interface Eip1193Provider {
  isMetaMask?: boolean;
  request<T = unknown>(args: Eip1193RequestArgs): Promise<T>;
  on?(event: string, listener: Eip1193Listener): void;
  removeListener?(event: string, listener: Eip1193Listener): void;
}
