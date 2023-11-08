import { GetServerSidePropsContext } from 'next/types';
import { getSession } from 'next-auth/react';
import type { ReactElement } from 'react';
import BaseLayout from 'src/layouts/BaseLayout';

function Overview() {
  return <></>;
}

export default Overview;

Overview.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  console.log('********* login serverside ', session);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permananet: false
      }
    };
  } else {
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
}
