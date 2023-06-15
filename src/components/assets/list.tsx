import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CurrencySwapIcons from '@/components/ui/asset-icons';
import { CoinList } from '@/components/ui/currency-swap-icons';
import TransactionInfo from '@/components/ui/transaction-info';
import Button from '@/components/ui/button';

interface FarmListTypes {
  asset: string;

  priceBTC: string;
  priceVCE: string;
}

export default function FarmList({
  asset,

  priceBTC,
  priceVCE,
  children,
}: React.PropsWithChildren<FarmListTypes>) {
  let [isExpand, setIsExpand] = useState(false);
  const setFrom = asset as CoinList;

  return (
    <div className="relative mb-3 overflow-hidden rounded-lg bg-white shadow-card transition-all last:mb-0 hover:shadow-large dark:bg-light-dark">
      <div
        className="relative grid h-auto cursor-pointer grid-cols-2 items-center gap-3 py-4 sm:h-20 sm:grid-cols-3 sm:gap-6 sm:py-0 lg:grid-cols-4"
        onClick={() => setIsExpand(!isExpand)}
      >
        <div className="col-span-2 px-4 sm:col-auto sm:px-8 xl:px-4">
          <CurrencySwapIcons from={asset} />
        </div>
        <div className="px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm">
          0
        </div>

        <div className="hidden px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm lg:block">
          {priceBTC}
        </div>
        <div className="hidden px-4 text-xs font-medium uppercase tracking-wider text-black dark:text-white sm:px-8 sm:text-sm lg:block">
          {priceVCE}
        </div>
      </div>
      <AnimatePresence initial={false}>
        {isExpand && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto' },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="border-t border-dashed border-gray-200 px-4 py-4 dark:border-gray-700 sm:px-8 sm:py-6">
              <div className="mb-6 flex items-center justify-center rounded-lg bg-gray-100 p-3 text-center text-xs font-medium uppercase tracking-wider text-gray-900 dark:bg-gray-900 dark:text-white sm:h-13 sm:text-sm">
                your {asset} balance{' '}
              </div>
              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
                <div className="flex flex-col gap-3 sm:gap-4"></div>
              </div>
              <div className="mb-4 grid grid-cols-2 gap-4 sm:mb-6 sm:gap-6">
                <div className="mb-4 grid grid-rows-2 gap-4 sm:mb-6 sm:gap-6">
                  <div className="mb-4 grid grid-cols-2 gap-4 sm:mb-6 sm:gap-6">
                    <CurrencySwapIcons from={asset} />
                    <div> 0</div>
                  </div>
                </div>
                <div className="mb-4 grid grid-rows-2 gap-4 sm:mb-6 sm:gap-6">
                  <div className="mb-4 grid grid-cols-2 gap-4 sm:mb-6 sm:gap-6">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="spin-button-hidden h-11 appearance-none rounded-lg border-solid border-gray-200 bg-body px-4 text-sm tracking-tighter text-gray-900 placeholder:text-gray-600 focus:border-gray-900 focus:shadow-none focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-600 sm:h-13"
                    />
                    <Button shape="rounded" fullWidth size="large">
                      SEND
                    </Button>
                  </div>
                  <div className="mb-4 grid grid-cols-2 gap-4 sm:mb-6 sm:gap-6">
                    <input
                      type="number"
                      placeholder="0.0"
                      className="spin-button-hidden h-11 appearance-none rounded-lg border-solid border-gray-200 bg-body px-4 text-sm tracking-tighter text-gray-900 placeholder:text-gray-600 focus:border-gray-900 focus:shadow-none focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-gray-500 dark:focus:border-gray-600 sm:h-13"
                    />
                    <Button shape="rounded" fullWidth size="large">
                      RECEIVE
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
