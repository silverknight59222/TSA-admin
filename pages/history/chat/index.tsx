import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid } from '@mui/material';
import Footer from '@/components/Footer';
import ChatHistoryTable from '@/content/History/Chat/ChatHistoryTable';
import { GetServerSidePropsContext } from 'next/types';
import { getSession } from 'next-auth/react';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>Chat History Management</title>
      </Head>
      <Grid container direction="row" padding={1}>
        <Grid
          style={{
            backgroundColor: 'white',
            height: '100%',
            width: '100%',
            padding: '8px'
          }}
        >
          <ChatHistoryTable />
        </Grid>
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
