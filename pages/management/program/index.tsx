import React from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid } from '@mui/material';
import ProgramTable from '@/content/Management/Program/ProgramTable';

function ApplicationsTransactions() {
  return (
    <>
      <Head>
        <title>Data Management</title>
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
          <ProgramTable />
        </Grid>
      </Grid>
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
