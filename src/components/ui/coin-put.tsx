import type { CoinTypes } from '@/types';
import { useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import cn from 'classnames';
import { ChevronDown } from '@/components/icons/chevron-down';
import { useClickAway } from '@/lib/hooks/use-click-away';
import { useLockBodyScroll } from '@/lib/hooks/use-lock-body-scroll';
import { coinList } from '@/data/static/coin-list';
import Button from '@/components/ui/button';
import { SwapIcon } from '@/components/icons/swap-icon';
import ActiveLink from '@/components/ui/links/active-link';
import TransactionInfo from '@/components/ui/transaction-info';
// dynamic import
const CoinSelectView = dynamic(
  () => import('@/components/ui/coin-select-view')
);

interface CoinInputTypes extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  exchangeRate?: number;
  defaultCoinIndex?: number;
  className?: string;
  getCoinValue: (param: { coin: string; value: string }) => void;
}

const decimalPattern = /^[0-9]*[.,]?[0-9]*$/;

export default function CoinInput({
  label,
  getCoinValue,
  defaultCoinIndex = 0,
  exchangeRate,
  className,
  ...rest
}: CoinInputTypes) {
  let [value, setValue] = useState('');
  let [selectedCoin, setSelectedCoin] = useState(coinList[0]);
  let [selectedCoinn, setSelectedCoinn] = useState(coinList[1]);
  let [visibleCoinList, setVisibleCoinList] = useState(false);
  const modalContainerRef = useRef<HTMLDivElement>(null);
  useClickAway(modalContainerRef, () => {
    setVisibleCoinList(false);
  });
  useLockBodyScroll(visibleCoinList);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.match(decimalPattern)) {
      setValue(event.target.value);
      let param = { coin: selectedCoin.code, value: event.target.value };
      getCoinValue && getCoinValue(param);
    }
  };
  function handleSelectedCoin(coin: CoinTypes) {
    setSelectedCoin(coin);

    setVisibleCoinList(false);
  }
  function handleSelectedCoinn(coin: CoinTypes) {
    setSelectedCoinn(coin);
    setVisibleCoinList(false);
  }

  let [toggleCoin, setToggleCoin] = useState(false);
  return (
    <>
      <div className="border-b border-dashed border-gray-200 pb-5 dark:border-gray-800 xs:mb-7 xs:pb-6">
        <div
          className={cn(
            'relative flex gap-3',
            toggleCoin ? 'flex-col-reverse' : 'flex-col'
          )}
        >
          <div
            className={cn(
              'group flex min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600',
              className
            )}
          >
            <div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
              <span className="mb-1.5 block text-xs uppercase text-gray-600 dark:text-gray-400">
                50%
              </span>
              <button
                onClick={() => setVisibleCoinList(true)}
                className="flex items-center font-medium outline-none dark:text-gray-100"
              >
                {selectedCoin?.icon}
                <span className="ltr:ml-2 rtl:mr-2">{selectedCoin?.code} </span>
                <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col text-right">
              <input
                type="text"
                value={value}
                placeholder="0.0"
                inputMode="decimal"
                onChange={handleOnChange}
                className="w-full rounded-br-lg rounded-tr-lg border-0 pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
                {...rest}
              />
              <span className="font-xs px-3 text-gray-400">
                = $ {selectedCoin?.price * value}
              </span>
            </div>
          </div>
          <div className="absolute left-1/2 top-1/2 z-[1] -ml-4 -mt-4 rounded-full bg-white shadow-large dark:bg-gray-600">
            {/*  <Button
                size="mini"
                color="gray"
                shape="circle"
                variant="transparent"
                onClick={() => setToggleCoin(!toggleCoin)}
              >
                <SwapIcon className="h-auto w-3" />
              </Button> */}
          </div>
          <div
            className={cn(
              'group flex min-h-[70px] rounded-lg border border-gray-200 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600',
              className
            )}
          >
            <div className="min-w-[80px] border-r border-gray-200 p-3 transition-colors duration-200 group-hover:border-gray-900 dark:border-gray-700 dark:group-hover:border-gray-600">
              <span className="mb-1.5 block text-xs uppercase text-gray-600 dark:text-gray-400">
                50%
              </span>

              <button
                onClick={() => setVisibleCoinList(true)}
                className="flex items-center font-medium outline-none dark:text-gray-100"
              >
                {selectedCoinn?.icon}
                <span className="ltr:ml-2 rtl:mr-2">
                  {selectedCoinn?.code}{' '}
                </span>
                <ChevronDown className="ltr:ml-1.5 rtl:mr-1.5" />
              </button>
            </div>
            <div className="flex flex-1 flex-col text-right">
              <input
                type="text"
                value={(selectedCoin?.price * value) / selectedCoinn?.price}
                placeholder="0.0"
                inputMode="decimal"
                onChange={handleOnChange}
                disabled
                className="w-full rounded-br-lg rounded-tr-lg border-0 pb-0.5 text-right text-lg outline-none focus:ring-0 dark:bg-light-dark"
                {...rest}
              />
              <span className="font-xs px-3 text-gray-400">
                = $ {selectedCoin?.price * value}
              </span>
            </div>
          </div>

          <AnimatePresence>
            {visibleCoinList && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-700 bg-opacity-60 p-4 text-center backdrop-blur xs:p-5"
              >
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-full align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  ref={modalContainerRef}
                  className="inline-block text-left align-middle"
                >
                  <CoinSelectView
                    onSelect={(selectedCoin) =>
                      handleSelectedCoin(selectedCoin)
                    }
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {visibleCoinList && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden bg-gray-700 bg-opacity-60 p-4 text-center backdrop-blur xs:p-5"
              >
                {/* This element is to trick the browser into centering the modal contents. */}
                <span
                  className="inline-block h-full align-middle"
                  aria-hidden="true"
                >
                  &#8203;
                </span>
                <motion.div
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  ref={modalContainerRef}
                  className="inline-block text-left align-middle"
                >
                  <CoinSelectView
                    onSelect={(selectedCoinn) =>
                      handleSelectedCoinn(selectedCoinn)
                    }
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        className={cn(
          'group flex min-h-[40px] items-center justify-center rounded-lg border border-gray-200 p-4 transition-colors duration-200 hover:border-gray-900 dark:border-gray-700 dark:hover:border-gray-600',
          className
        )}
      >
        <span className="font-xs px-3 text-gray-400">
          1 {selectedCoin?.code} ≈ {selectedCoin?.price / selectedCoinn?.price}{' '}
          {selectedCoinn?.code}
        </span>
      </div>

      <div className="flex flex-col gap-4 xs:gap-[18px]">
        <div
          className={cn(
            'flex items-center justify-between dark:text-gray-300',
            className
          )}
        >
          <span className="font-medium"></span>
          <div className="flex flex-col"></div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-2.5 xs:mt-8">
        <ActiveLink href="/liquidity-position">
          <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="uppercase"
          >
            Approve {selectedCoin?.code}
          </Button>
        </ActiveLink>
        <ActiveLink href="/liquidity-position">
          <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="uppercase"
          >
            Approve {selectedCoinn?.code}
          </Button>
        </ActiveLink>
      </div>
    </>
  );
}

CoinInput.displayName = 'CoinInput';
