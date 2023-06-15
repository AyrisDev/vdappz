import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-put';
import TransactionInfo from '@/components/ui/transaction-info';
import { Plus } from '@/components/icons/plus';
import ActiveLink from '@/components/ui/links/active-link';
import Trade from '@/components/ui/trade';
import RootLayout from '@/layouts/_root-layout';
import cn from 'classnames';

const LiquidityPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo
        title="Liquidity"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <Trade>
        <CoinInput
          label={'From'}
          exchangeRate={0.0}
          defaultCoinIndex={0}
          getCoinValue={(data) => console.log('From coin value:', data)}
        />
      </Trade>
    </>
  );
};

LiquidityPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default LiquidityPage;
