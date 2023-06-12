import cn from 'classnames';
import { useModal } from '@/components/modal-views/context';

import { vinceTestnet } from '@/hooks/useVince';
import {
  useSuggestChainAndConnect,
  useAccount,
  useDisconnect,
  useBalance,
} from 'graz';
import Image from 'next/image';
import Avatar from '@/assets/avatar.png';
import { useEffect, useState } from 'react';

export default function WalletConnect({
  btnClassName,
}: {
  btnClassName?: string;
}) {
  const { suggestAndConnect } = useSuggestChainAndConnect();

  const { disconnect } = useDisconnect();
  const { data: account, isConnected } = useAccount();
  function handleSuggestAndConnect() {
    suggestAndConnect({
      chainInfo: vinceTestnet,
    });
  }

  const { data: vceBalance, isLoading, refetch } = useBalance('avce');

  return (
    <>
      {isConnected ? (
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <div className="relative flex-shrink-0">
            <div className="group flex h-[50px] cursor-pointer flex-row items-center rounded-xl border p-2 text-[12px]">
              <div>
                <Image src={Avatar} width={40} height={40} alt="test" />
              </div>
              <div className="ml-4 flex flex-col items-end justify-end">
                <div>
                  {account.bech32Address.slice(0, 6)}
                  ...
                  {account.bech32Address.slice(
                    account.bech32Address.length - 6
                  )}
                </div>
                <div>
                  {' '}
                  {isLoading ? (
                    'Fetching balances...'
                  ) : (
                    <span>
                      {vceBalance.amount / 1000000000000000000}{' '}
                      {vceBalance.denom.slice(1, 6)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
          {isConnected && (
            <button onClick={() => disconnect(true)}>Disconnect</button>
          )}
        </div>
      ) : (
        <button
          onClick={() => handleSuggestAndConnect()}
          className={cn('shadow-main hover:shadow-large', btnClassName)}
        >
          CONNECT
        </button>
      )}
    </>
  );
}
