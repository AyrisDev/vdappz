import React from 'react';
import type { NextPageWithLayout } from '@/types';
import { useRouter } from 'next/router';
import RootLayout from '@/layouts/_root-layout';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import { NextSeo } from 'next-seo';
import cn from 'classnames';
import routes from '@/config/routes';
import Link from 'next/link';
const ProposalsPage: NextPageWithLayout = ({ data }: any) => {
  const proposal = data.proposal as any;

  return (
    <>
      <NextSeo
        title="Proposal"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      <section className="mx-auto w-full max-w-[1160px] text-sm ">
        <Link href="/proposals" className="mb-4">
          <span>back to governance</span>
        </Link>
        <div className="mt-4 flex min-h-[600px] flex-col rounded-lg bg-[#209fa1] p-4 text-white">
          <div className="flex flex-row items-center space-x-4">
            <span className="flex h-8 w-16 items-center justify-center rounded-lg border bg-[#2060a1] text-lg font-bold">
              #{proposal.proposal_id}
            </span>
            <span className="flex text-xl font-bold">
              {proposal.content.title}
            </span>{' '}
          </div>
          <div className="mt-12 flex flex-col space-y-4">
            <div className="flex flex-row">
              <span className="w-[200px] items-center justify-start">
                TOTAL DEPOSIT
              </span>
              <span className="flex items-center justify-start">
                {' '}
                {proposal.total_deposit[0].amount} VCE
              </span>
            </div>
            <div className="flex flex-row">
              <span className="w-[200px] items-center justify-start">
                VOTING START
              </span>
              <span className="flex items-center justify-start">
                {proposal.voting_start_time}
              </span>
            </div>
            <div className="flex flex-row">
              <span className="w-[200px] items-center justify-start">
                VOTING END
              </span>
              <span className="flex items-center justify-start">
                {proposal.voting_end_time}
              </span>
            </div>
            <div className="flex flex-row">
              <span className="w-[200px] items-center justify-start">
                DESCRIPTION
              </span>
              <span className="flex items-center justify-start">
                {proposal.content.description}
              </span>
            </div>
            <div className="flex flex-row">
              <span className="w-[200px] items-center justify-start">
                SUBMIT TIME
              </span>
              <span className="flex items-center justify-start">
                {proposal.submit_time}
              </span>
            </div>
            <div className="flex flex-row">
              <span className="w-[200px] items-center justify-start">
                DEPOSIT END TIME
              </span>
              <span className="flex items-center justify-start">
                {proposal.deposit_end_time}
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

ProposalsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ProposalsPage;
export async function getServerSideProps(context: any) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const { id } = context.query.id;
  const res = await fetch(
    'http://154.53.47.14:1317/cosmos/gov/v1beta1/proposals/1'
  );
  const data = await res.json();

  // Pass post data to the page via props
  return { props: { data } };
}
