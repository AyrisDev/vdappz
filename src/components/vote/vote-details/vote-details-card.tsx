import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dayjs from 'dayjs';
import cn from 'classnames';
import Button from '@/components/ui/button';
import RevealContent from '@/components/ui/reveal-content';
import AuctionCountdown from '@/components/nft/auction-countdown';
import { Switch } from '@/components/ui/switch';
import { ExportIcon } from '@/components/icons/export-icon';
import VotePoll from '@/components/vote/vote-details/vote-poll';
import VoteActions from '@/components/vote/vote-details/vote-actions';
import VoterTable from '@/components/vote/vote-details/voter-table';
import { fadeInBottom } from '@/lib/framer-motion/fade-in-bottom';
import { useLayout } from '@/lib/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/lib/constants';
import Link from 'next/link';
function VoteActionButton() {
  return (
    <div className="mt-4 flex items-center gap-3 xs:mt-6 xs:inline-flex md:mt-10">
      <Button shape="rounded" color="success" className="flex-1 xs:flex-auto">
        Accept
      </Button>
      <Button shape="rounded" color="danger" className="flex-1 xs:flex-auto">
        Reject
      </Button>
    </div>
  );
}

// FIXME: need to add vote type
export default function VoteDetailsCard({ vote }: any) {
  const [isExpand, setIsExpand] = useState(false);
  const { layout } = useLayout();

  return (
    <motion.div
      layout
      initial={{ borderRadius: 8 }}
      className={cn(
        'mb-3 rounded-lg bg-white p-5 shadow-card transition-shadow duration-200 hover:shadow-large dark:bg-light-dark xs:p-6 xl:p-4'
      )}
    >
      <motion.div layout className={cn('flex w-full')}>
        <div className="flex w-full flex-col">
          <Link href={`proposals/${vote.proposal_id}`}>
            <div className="flex w-full justify-between">
              <span className="flex w-[40px] items-center justify-center rounded-lg border bg-white p-2 text-black">
                #{vote.proposal_id}
              </span>

              <span className="flex h-[40px] items-center justify-center rounded-lg border bg-white p-2 text-black">
                {vote.status}
              </span>
            </div>
            <div className="my-4 w-full">
              <span className="text-xl font-bold"> {vote.content.title}</span>
            </div>
            <div className="my-4 flex w-full space-x-4">
              <div className="flex w-full flex-col">
                <span> {vote.voting_start_time}</span>
                <span> Voting Start </span>
              </div>
              <div className="flex w-full flex-col">
                <span> {vote.voting_end_time}</span>
                <span> Voting End </span>
              </div>
            </div>
            <div className="my-4 flex w-full justify-between">
              <div className="flex flex-row items-center justify-center space-x-2">
                <span className="flex h-[20px] w-[20px]  rounded-full  bg-[#4fb00e] p-2 text-black"></span>
                <div className="flex flex-col items-center justify-center">
                  <span>Yes</span>
                  <span className="flex   text-white">
                    {vote.final_tally_result.yes} %
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <span className="flex h-[20px] w-[20px]  rounded-full  bg-[#870505] p-2 text-white"></span>
                <div className="flex flex-col items-center justify-center">
                  <span>No</span>
                  <span className="flex   text-white">
                    {vote.final_tally_result.no} %
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <span className="flex h-[20px] w-[20px]  rounded-full  bg-[#bdb5b5] p-2 text-white"></span>
                <div className="flex flex-col items-center justify-center">
                  <span>Abstain</span>
                  <span className="flex   text-white">
                    {vote.final_tally_result.abstain} %
                  </span>
                </div>
              </div>
              <div className="flex flex-row items-center justify-center space-x-2">
                <span className="flex h-[20px] w-[20px]  rounded-full  bg-[#b07b12] p-2 text-white"></span>
                <div className="flex flex-col items-center justify-center">
                  <span>No With Veto</span>
                  <span className="flex   text-white">
                    {vote.final_tally_result.no_with_veto} %
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
