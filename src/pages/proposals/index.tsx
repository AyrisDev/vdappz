import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import routes from '@/config/routes';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import VoteList from '@/components/vote/vote-list';
import { ExportIcon } from '@/components/icons/export-icon';
// static data
import { getVotesByStatus } from '@/data/static/vote-data';
import votePool from '@/assets/images/vote-pool.svg';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';

const ProposalsPage: NextPageWithLayout = ({ data }) => {
  const proposal = data.proposals;

  const router = useRouter();
  const { layout } = useLayout();
  const { totalVote: totalActiveVote } = getVotesByStatus('active');
  const { totalVote: totalOffChainVote } = getVotesByStatus('off-chain');
  const { totalVote: totalExecutableVote } = getVotesByStatus('executable');
  const { totalVote: totalPastVote } = getVotesByStatus('past');
  function goToCreateProposalPage() {
    setTimeout(() => {
      router.push(routes.createProposal);
    }, 800);
  }
  const tabMenuItems = [
    {
      title: (
        <>
          Active{' '}
          {totalActiveVote > 0 && (
            <span className="ltr:ml-0.5 rtl:mr-0.5 ltr:md:ml-1.5 rtl:md:mr-1.5 ltr:lg:ml-2 rtl:lg:mr-2">
              {totalActiveVote}
            </span>
          )}
        </>
      ),
      path: 'active',
    },
    {
      title: (
        <>
          Off-Chain{' '}
          {totalOffChainVote > 0 && (
            <span className="ltr:ml-0.5 rtl:mr-0.5 ltr:md:ml-1.5 rtl:md:mr-1.5 ltr:lg:ml-2 rtl:lg:mr-2">
              {totalOffChainVote}
            </span>
          )}
        </>
      ),
      path: 'off-chain',
    },
    {
      title: (
        <>
          Executable{' '}
          {totalExecutableVote > 0 && (
            <span className="ltr:ml-0.5 rtl:mr-0.5 ltr:md:ml-1.5 rtl:md:mr-1.5 ltr:lg:ml-2 rtl:lg:mr-2">
              {totalExecutableVote}
            </span>
          )}
        </>
      ),
      path: 'executable',
    },
    {
      title: (
        <>
          Past{' '}
          {totalPastVote > 0 && (
            <span className="ltr:ml-0.5 rtl:mr-0.5 ltr:md:ml-1.5 rtl:md:mr-1.5 ltr:lg:ml-2 rtl:lg:mr-2">
              {totalPastVote}
            </span>
          )}
        </>
      ),
      path: 'past',
    },
  ];
  return (
    <>
      <NextSeo
        title="Proposal"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <section className="mx-auto w-full max-w-[1160px] text-sm ">
        <header
          className={cn(
            'mb-8 flex flex-col gap-4 rounded-lg bg-white p-5 py-6 shadow-card dark:bg-light-dark xs:p-6 ',
            {
              'sm:flex-row sm:items-center sm:justify-between':
                layout !== LAYOUT_OPTIONS.RETRO,
              'lg:flex-row lg:items-center lg:justify-between':
                layout === LAYOUT_OPTIONS.RETRO,
            }
          )}
        ></header>

        <VoteList voteStatus={'active'} proposal={proposal} />
      </section>
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProposalsPage;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `http://154.53.47.14:1317/cosmos/gov/v1beta1/proposals`
  );
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
