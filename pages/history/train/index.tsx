import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid } from '@mui/material';
import Footer from '@/components/Footer';
import TrainHistoryTable from '@/content/History/Train/TrainHistoryTable';
import { GetServerSidePropsContext } from 'next/types';
import { getSession } from 'next-auth/react';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>Transactions - Applications</title>
      </Head>
      <Grid
        style={{
          backgroundColor: 'white',
          height: '100%',
          width: '100%',
          padding: '8px'
        }}
      >
        <TrainHistoryTable />
      </Grid>
      <Footer />
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permananet: false
      }
    };
  }
  return {
    props: { session }
  };
}
