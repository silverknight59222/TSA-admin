import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid } from '@mui/material';
import Footer from '@/components/Footer';
import ChatHistoryTable from '@/content/History/Chat/ChatHistoryTable';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>Transactions - Applications</title>
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
