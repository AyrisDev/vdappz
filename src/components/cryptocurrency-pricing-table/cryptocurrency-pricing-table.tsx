import React from 'react';
import { Star } from '@/components/icons/star';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import CryptocurrencyAccordionTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-accordion-table';
import CryptocurrencyDrawerTable from '@/components/cryptocurrency-pricing-table/cryptocurrency-drawer-table';
import { CoinPriceData } from '@/data/static/coin-market-data';

const COLUMNS = [
  {
    Header: () => <div className="px-1"></div>,
    accessor: 'symbol',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="">
        <Star />
      </div>
    ),
    minWidth: 40,
    maxWidth: 20,
  },
  {
    Header: '#',
    accessor: 'market_cap_rank',
    // @ts-ignore
    Cell: ({ cell: { value } }) => <div>{value}</div>,
    minWidth: 40,
    maxWidth: 20,
  },
  {
    Header: () => <div className="">Coin Names</div>,
    accessor: 'name',
    // @ts-ignore
    Cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.image}
        <div className="ltr:text-left rtl:text-left">{row.original.name}</div>
      </div>
    ),
    minWidth: 100,
  },
  {
    Header: () => <div className="">Price/VCE</div>,
    accessor: 'current_pricevce',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-left rtl:text-left">${value}</div>
    ),
    minWidth: 80,
    maxWidth: 120,
  },
  {
    Header: () => <div className="">Price/BTC</div>,
    accessor: 'current_price',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-left rtl:text-left">${value}</div>
    ),
    minWidth: 80,
    maxWidth: 120,
  },

  {
    Header: () => <div className="">Total Balance</div>,
    accessor: 'balance',
    // @ts-ignore
    Cell: ({ cell: { value } }) => (
      <div className="ltr:text-left rtl:text-left">${value}</div>
    ),
    minWidth: 80,
    maxWidth: 120,
  },
];

export default function CryptocurrencyPricingTable() {
  // const { coins } = useCoins();
  // const data = React.useMemo(() => coins, [coins]);
  const data = React.useMemo(() => CoinPriceData, []);
  const columns = React.useMemo(() => COLUMNS, []);

  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();

  return isMounted &&
    ['xs', 'sm', 'md', 'lg', 'xl'].indexOf(breakpoint) !== -1 ? (
    <CryptocurrencyDrawerTable columns={columns} data={data} />
  ) : (
    <CryptocurrencyAccordionTable columns={columns} data={data} />
  );
}
