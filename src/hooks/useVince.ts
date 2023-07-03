import { Bech32Address } from '@keplr-wallet/cosmos';

const VCE = {
  coinDenom: 'VCE',
  coinMinimalDenom: 'avce',
  coinDecimals: 18,
  coinGeckoId: 'vince',
  coinImageUrl: 'https://github.com/AyrisDev/vinceChainAssets/blob/main/icon.png',
};

export const vinceTestnet = {
  rpc: process.env.NEXT_PUBLIC_RPC_URL,
  rest: process.env.NEXT_PUBLIC_REST_URL,
  chainId: 'vince_1903',
  chainName: 'VinceChain ',
  stakeCurrency: VCE,
  bip44: {
    coinType: 60,
  },
  bech32Config: Bech32Address.defaultBech32Config('vce'),
  currencies: [VCE],
  feeCurrencies: [VCE],
  coinType: 60,
};
