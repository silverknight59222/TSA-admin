import { GetServerSidePropsContext } from 'next/types';
import { getSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

function Overview() {
  return <></>;
}

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/dashboards',
        permananet: false
      }
    };
  }

  return {
    props: { session }
  };
};

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};
