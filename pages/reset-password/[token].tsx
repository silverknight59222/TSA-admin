// ** React Imports
import { ChangeEvent, MouseEvent, ReactNode, useState } from 'react';

// ** MUI Components
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';

// ** Icons Imports
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';
import FooterIllustrationsV1 from '@/components/FooterIllustration';
import BlankLayout from '@/layouts/BlankLayout';

import { getSession, useSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next/types';
import { useRouter } from 'next/router';
import { errorNotification, successNotification } from '@/utils/notification';
import LoadingButton from '@mui/lab/LoadingButton';

interface State {
  password: string;
  showPassword: boolean;
}

const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LoginPage = () => {
  // ** State
  const { data } = useSession();
  const user = data?.user;
  console.log('**** user', user);
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  });
  const [confirmValues, setConfirmValues] = useState<State>({
    password: '',
    showPassword: false
  });
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const authenticate = async () => {
    setLoading(true);

    if (values.password !== confirmValues.password) {
      errorNotification('Please confirm your password.');
      return;
    }

    const newPassword = {
      tokenId: router.query.token,
      password: values.password
    };

    await fetch('/api/reset-password', {
      method: 'PUT',
      body: JSON.stringify(newPassword),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      }
    })
      .then((res) => {
        console.log('*** res', res);
        if (res.status === 200) {
          successNotification('Password is reset');
          router.replace('/');
        } else if (res.status === 404) {
          errorNotification('Invalid or expired password reset token');
        } else {
          errorNotification('Please try again!');
        }
      })
      .catch((error) => {
        console.log('Error: ', error);
        errorNotification('Please try again');
      })
      .finally(() => {
        setLoading(false);
      });

    // router.replace('/');
  };

  // ** Hook
  // const theme = useTheme()

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  const handleChangeConfirm =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setConfirmValues({ ...confirmValues, [prop]: event.target.value });
    };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleClickShowComfirmPassword = () => {
    setConfirmValues({
      ...confirmValues,
      showPassword: !confirmValues.showPassword
    });
  };

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleMouseDownConfirmPassword = (
    event: MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

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
            <Typography variant="body2">Please reset your password</Typography>
          </Box>
          <form noValidate autoComplete="off" onSubmit={() => authenticate()}>
            {/* <TextField autoFocus fullWidth id='email' label='Email' sx={{ marginBottom: 2 }} onChange={handleEmailChange} value={email} type='email' /> */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="auth-login-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                autoFocus
                value={values.password}
                id="auth-login-password"
                onChange={handleChange('password')}
                type={values.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="auth-login-password">
                Confirm Password
              </InputLabel>
              <OutlinedInput
                label="Comfirm Password"
                value={confirmValues.password}
                id="auth-login-password-confirm"
                onChange={handleChangeConfirm('password')}
                type={confirmValues.showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      onClick={handleClickShowComfirmPassword}
                      onMouseDown={handleMouseDownConfirmPassword}
                      aria-label="toggle password visibility"
                    >
                      {values.showPassword ? <EyeOutline /> : <EyeOffOutline />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <LoadingButton
              fullWidth
              onClick={authenticate}
              loading={loading}
              loadingPosition="start"
              variant="contained"
              sx={{ marginBottom: 3 }}
            >
              <span>Set Password</span>
            </LoadingButton>
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

  if (!!(session?.user as any)?.accessToken) {
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
