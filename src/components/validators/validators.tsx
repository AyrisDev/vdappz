import Button from '@/components/ui/button';
import FarmList from '@/components/validators/list';
import ActiveLink from '@/components/ui/links/active-link';
import { AssetsData } from '@/data/static/assets-data';
import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import cn from 'classnames';
import { Transition } from '@/components/ui/transition';
import { RadioGroup } from '@/components/ui/radio-group';
import { Listbox } from '@/components/ui/listbox';
import { Switch } from '@/components/ui/switch';
import { ChevronDown } from '@/components/icons/chevron-down';
import { SearchIcon } from '@/components/icons/search';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import HorizontalThreeDots from '@/components/icons/horizontal-three-dots';
import routes from '@/config/routes';

export default function Farms() {
  const { layout } = useLayout();
  return (
    <div className="mx-auto w-full">
      <div
        className={cn(
          'mb-6 flex flex-col justify-between gap-4',
          layout === LAYOUT_OPTIONS.RETRO
            ? 'lg:flex-row lg:items-center lg:gap-6'
            : 'md:flex-row md:items-center md:gap-6'
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <div
            className={cn(
              layout === LAYOUT_OPTIONS.RETRO ? 'lg:hidden' : 'md:hidden'
            )}
          ></div>
        </div>

        <div className="flex items-center justify-between gap-4 lg:gap-8">
          <div
            className={cn(
              'hidden shrink-0 ',
              layout === LAYOUT_OPTIONS.RETRO ? 'lg:block' : 'md:block'
            )}
          ></div>
        </div>
      </div>

      <div className="mb-3 hidden min-h-[70px] grid-cols-3 items-center gap-6 rounded-lg bg-white shadow-card dark:bg-light-dark/80 sm:grid lg:grid-cols-2">
        <div>
          <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
            Validator123
          </span>
        </div>
        <div className="text-right">
          <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
            Voting Power
          </span>
          <span className="px-6 py-6 text-sm tracking-wider text-gray-500 dark:text-gray-300">
            Commission
          </span>
        </div>
      </div>

      {AssetsData.map((farm) => (
        <FarmList
          key={farm.id}
          asset={farm.asset}
          priceBTC={farm.priceBTC}
          priceVCE={farm.priceVCE}
        ></FarmList>
      ))}
    </div>
  );
}
