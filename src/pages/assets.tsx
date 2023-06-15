import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Assets from '@/components/assets/assets';

const AssetsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Assets" description="Vince Chain" />
      <Assets />
    </>
  );
};

AssetsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default AssetsPage;
