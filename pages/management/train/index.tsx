import React, { useEffect } from 'react';
import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Grid, Box, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import ProgramTable from '@/content/Management/Train/ProgramTable';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import axios from 'axios';
function ApplicationsTransactions() {
  const [value, setValue] = React.useState('new');
  const [data, setData] = React.useState([]);
  const [programList, setProgramList] = React.useState([]);
  useEffect(() => {
    axios
      .get('/api/train/program')
      .then(async (res) => {
        if (res.data.length) {
          setProgramList(res.data);
          setValue(res.data[0].id.toString());
        }
      })
      .catch((error) => console.log('*******err', error.data));
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <>
      <Head>
        <title>Data Management</title>
      </Head>
      {/* <Container maxWidth="lg"> */}
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
                <Tab label="FF BRONZE" value="2" />
                <Tab label="GROWTH SYSTEMS" value="3" />
                <Tab icon={<AddCircleOutlineIcon />} value="new"></Tab>
              </TabList>
            </Box>
            <ProgramTable id={value} />
          </TabContext>
        </Grid>
      </Grid>
      {/* </Container> */}
      {/* <Footer /> */}
    </>
  );
}

ApplicationsTransactions.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ApplicationsTransactions;
