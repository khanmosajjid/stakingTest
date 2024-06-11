import { http, createConfig } from 'wagmi'
import {avalancheFuji } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

export const config = createConfig({
  chains: [ avalancheFuji],
  connectors: [
    injected(),
    coinbaseWallet({ appName: 'Create Wagmi' }),
    walletConnect({ projectId: "1ade470e0a2103b5f8113ed21f634435" }),
  ],
  ssr: true,
  transports: {
    [avalancheFuji.id]: http(),
    
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
