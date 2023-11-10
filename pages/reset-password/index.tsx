// ** React Imports
import { ReactNode, useEffect, useState } from 'react';

// ** Next Imports

// ** MUI Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';

// ** Icons Imports
import FooterIllustrationsV1 from '@/components/FooterIllustration';
import BlankLayout from '@/layouts/BlankLayout';

import { getSession, useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next/types';
import { errorNotification, successNotification } from '@/utils/notification';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LoginPage = () => {
  // ** State
  const { data } = useSession();
  const user = data?.user;
  console.log('**** user', user);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const authenticate = async () => {
    setLoading(true);
    console.log('**** email reset', JSON.stringify(email));

    await fetch('/api/reset-password', {
      method: 'POST',
      body: JSON.stringify(email),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((res) => {
        if (res.status === 200) {
          successNotification('Message Sent');
          setSent(true);
        } else if (res.status === 404) {
          errorNotification('Please use the email provided to TSA AI');
        } else {
          errorNotification('Please try again!');
        }
        console.log('** reset pass', res);
      })
      .catch((error) => console.log('Error: ', error))
      .finally(() => {
        setLoading(false);
      });
  };

  // ** Hook
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  useEffect(() => {
    setEmail('');
  }, []);

  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1, background: '#f1f7fe' }}>
        <CardContent sx={{ padding: 5 }}>
          <Box
            sx={{
              mb: 4,
              px: 5,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <img alt="Maintenance" src="/static/images/icon.png" />
            <Typography
              variant="h6"
              sx={{
                ml: 3,
                lineHeight: 1,
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: '1.5rem !important'
              }}
            >
              TSA AI
            </Typography>
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2">
              Enter the email address associated with your account, and we will
              send you a link to reset your password
            </Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={() => authenticate()}>
            <TextField
              autoFocus
              fullWidth
              id="email"
              label="Email"
              sx={{ marginBottom: 2 }}
              onChange={handleEmailChange}
              value={email}
              type="email"
            />
            {
              sent ? (
                <Box
                  display={'flex'}
                  flexDirection={'row'}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <CheckCircleRoundedIcon fontSize="small" color="primary" />
                  <Typography>Please check your email.</Typography>
                </Box>
              ) : (
                <LoadingButton
                  fullWidth
                  onClick={authenticate}
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<SendIcon />}
                  variant="contained"
                  sx={{ marginBottom: 3 }}
                >
                  <span>Send Email</span>
                </LoadingButton>
              )
              // <Button
              //   fullWidth
              //   size='large'
              //   variant='contained'
              //   sx={{ marginBottom: 3 }}
              //   onClick={() => authenticate()}
              // >
              //   Send Email
              // </Button>
            }
          </form>
        </CardContent>
      </Card>
      <FooterIllustrationsV1 />
    </Box>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default LoginPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  console.log('********* generation serverside');

  if (!!(session?.user as any)) {
    let route = '';
    // if (session?.user.roles[0] === 'admin')
    //   route = '/management/editsetting';
    // else if (session?.user.roles[0] === 'user')
    //   route = '/management/generation';

    return {
      redirect: {
        permanent: false,
        destination: route
      }
    };
  }

  // const accessToken = (session?.user as any)?.accessToken;
  try {
    // const [user, tips] = await Promise.all([
    //   ApiService.getMe(accessToken),
    //   ApiService.getUserTips((session!.user as any).id, accessToken, "sent", {
    //     offset: 0,
    //     limit: 5,
    //   }),
    // ]);
    return {
      props: {
        status: 'login'
        // tips: tips,
      }
    };
  } catch (e) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    };
  }
}
