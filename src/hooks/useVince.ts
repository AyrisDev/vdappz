import { Bech32Address } from '@keplr-wallet/cosmos';

const VCE = {
  coinDenom: 'VCE',
  coinMinimalDenom: 'avce',
  coinDecimals: 18,
  coinGeckoId: 'vince',
  coinImageUrl: 'https://dhj8dql1kzq2v.cloudfront.net/white/osmo.png',
};

export const vinceTestnet = {
  rpc: 'http://testnet.vincescan.com/',
  rest: 'http://154.53.47.14:1317',
  chainId: 'vince_1903-1',
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
