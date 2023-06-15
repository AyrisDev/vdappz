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
        className="relative grid h-auto cursor-pointer grid-cols-2 items-center gap-3 py-4 sm:h-20 sm:grid-cols-3 sm:gap-6 sm:py-0 lg:grid-cols-2"
        onClick={() => setIsExpand(!isExpand)}
      >
        <div>
          <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
            Ayris.Dev
          </span>
        </div>
        <div className="text-right">
          <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
            21,531,906.8376 vce 8.44%
          </span>
          <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
            100%
          </span>
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
                Commission 100% | APR 0.00%
              </div>
              <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:hidden">
                <div className="flex flex-col gap-3 sm:gap-4"></div>
              </div>
              <div className="grid grid-cols-2 ">
                <div className="grid grid-cols-2 ">
                  <span className="flex items-center ">Your Delegation </span>

                  <div className="grid grid-cols-2 items-center justify-center">
                    <span className="flex items-center ">0 VCE </span>
                    <CurrencySwapIcons from={asset} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button shape="rounded" fullWidth size="large">
                    Redelegate
                  </Button>

                  <Button shape="rounded" fullWidth size="large">
                    Delegate
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
