import { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import CoinPut from '@/components/ui/coin-put';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import Trade from '@/components/ui/trade';
import RootLayout from '@/layouts/_root-layout';

const SwapPage: NextPageWithLayout = () => {
  let [toggleCoin, setToggleCoin] = useState(false);
  return (
    <>
      <NextSeo
        title="Farms"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />

      <Trade>
        <CoinInput
          label={'From'}
          exchangeRate={5.0}
          defaultCoinIndex={0}
          getCoinValue={(data) => console.log('From coin value:', data)}
        />

        <Button
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
        >
          SWAP
        </Button>
      </Trade>
    </>
  );
};

SwapPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default SwapPage;
