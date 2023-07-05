import type { NextPageWithLayout } from '@/types';
import { NextSeo } from 'next-seo';
import RootLayout from '@/layouts/_root-layout';
import Validators from '@/components/validators/validators';
import { getAllValidators } from '@/hooks/useCosmos';
import { ValidatorResponse } from '@/hooks/cosmosTypes';

const ValidatorsPage: NextPageWithLayout = ({ data }: any) => {
  return (
    <>
      <NextSeo title="Validators" description="Vince Chain" />
      <Validators validators={data.validators as ValidatorResponse} />
    </>
  );
};

ValidatorsPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

export default ValidatorsPage;

export async function getServerSideProps() {
  // Fetch data from external API
  const data = await getAllValidators();

  // Pass data to the page via props
  return { props: { data } };
}
