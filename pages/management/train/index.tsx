import React from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import RecentOrders from '@/content/Management/Train/RecentOrders';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
function ApplicationsTransactions() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Head>
        <title>Data Management</title>
      </Head>
      <Grid direction="row" padding={1}>
        <Grid
          style={{ backgroundColor: 'white', height: '100%', padding: '8px' }}
        >
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="INCUATOR" value="1" />
                <Tab label="FF BRONZE" value="2" />
                <Tab label="GROWTH SYSTEMS" value="3" />
                <Tab icon={<AddCircleOutlineIcon />} value="4"></Tab>
              </TabList>
            </Box>
            <RecentOrders />
          </TabContext>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
