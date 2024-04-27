import React, { useEffect } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import ProgramTable from '@/content/Management/Train/ProgramTable';
import axios from 'axios';
import { GetServerSidePropsContext } from 'next/types';
import { getSession } from 'next-auth/react';

function ApplicationsTransactions() {
  const [value, setValue] = React.useState('0');
  const [programList, setProgramList] = React.useState([]);
  useEffect(() => {
    axios
      .get('/api/program', { params: { search: '' } })
      .then(async (res) => {
        if (res.data.length) {
          setProgramList(res.data);
          setValue(res.data[0].id.toString());
        }
      })
      .catch((error) => console.log('*******err', error.data));
  }, []);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Head>
        <title>Train Management</title>
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
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                {programList.map((item) => {
                  return (
                    <Tab
                      key={item.id}
                      label={item.name}
                      value={item.id.toString()}
                    />
                  );
                })}
              </TabList>
            </Box>
            <ProgramTable id={value} />
          </TabContext>
        </Grid>
      </Grid>
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
