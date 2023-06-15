import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Validators from '@/components/validators/validators';

const ValidatorsPage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="Validators" description="Vince Chain" />
      <Validators />
    </>
  );
};

ValidatorsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ValidatorsPage;
