// ** React Imports
import { useState, ChangeEvent, MouseEvent, ReactNode, useEffect } from 'react';

// ** Next Imports
import Link from 'next/link';

// ** MUI Components
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import CardContent from '@mui/material/CardContent';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import MuiCard, { CardProps } from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';

// ** Icons Imports
// import Google from 'mdi-material-ui/Google';
// import Github from 'mdi-material-ui/Github';
// import Twitter from 'mdi-material-ui/Twitter';
// import Facebook from 'mdi-material-ui/Facebook';
import EyeOutline from 'mdi-material-ui/EyeOutline';
import EyeOffOutline from 'mdi-material-ui/EyeOffOutline';

// ** Layout Import
import BlankLayout from '@/layouts/BlankLayout';
import axios from 'axios';
import { useRouter } from 'next/router';
import { errorNotification } from '@/utils/notification';
import LoadingButton from '@mui/lab/LoadingButton';

interface State {
  password: string;
  showPassword: boolean;
}

// ** Styled Components
const Card = styled(MuiCard)<CardProps>(({ theme }) => ({
  [theme.breakpoints.up('sm')]: { width: '28rem' }
}));

const LinkStyled = styled('a')(({ theme }) => ({
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: theme.palette.primary.main
}));

const RegisterPage = () => {
  // ** States
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [values, setValues] = useState<State>({
    password: '',
    showPassword: false
  });

  // ** Hook
  // const theme = useTheme();
  const router = useRouter();

  const handleChange =
    (prop: keyof State) => (event: ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
    };
  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };
  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSignUp = () => {
    if (email && name && values.password) {
      setLoading(true);
      axios
        .post('/api/auth/signup', { email, name, password: values.password })
        .then(async () => {
          router.push('/auth/signin');
        })
        .catch((error) => {
          errorNotification(error.response.data.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    setName('');
    setEmail('');
  }, []);

  return (
    <Box className="content-center">
      <Card sx={{ zIndex: 1 }}>
        <CardContent sx={{ padding: '48px 36px 28px' }}>
          <Box
            sx={{
              mb: 3,
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
              TSA AI BOT
            </Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 600, marginBottom: 0.5 }}
            >
              Adventure starts here 🚀
            </Typography>
            <Typography variant="body2">
              Make your app management easy and fun!
            </Typography>
          </Box>
          <form autoComplete="off" onSubmit={onSignUp}>
            <TextField
              autoFocus
              fullWidth
              id="username"
              label="Username"
              required
              sx={{ marginBottom: 1 }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              fullWidth
              type="email"
              label="Email"
              sx={{ marginBottom: 1 }}
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControl fullWidth sx={{ marginBottom: 1 }}>
              <InputLabel htmlFor="auth-register-password">Password</InputLabel>
              <OutlinedInput
                label="Password"
                value={values.password}
                required
                id="auth-register-password"
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
                      {values.showPassword ? (
                        <EyeOutline fontSize="small" />
                      ) : (
                        <EyeOffOutline fontSize="small" />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <LoadingButton
              fullWidth
              loading={loading}
              size="large"
              type="submit"
              variant="contained"
              sx={{ marginBottom: 2 }}
              onClick={onSignUp}
            >
              Sign up
            </LoadingButton>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}
            >
              <Typography variant="body2" sx={{ marginRight: 1 }}>
                Already have an account?
              </Typography>
              <Typography variant="body2">
                <Link passHref href="/auth/signin">
                  <LinkStyled>Sign in instead</LinkStyled>
                </Link>
              </Typography>
            </Box>
            <Divider sx={{ my: 5 }}>or</Divider>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Link href="/" passHref>
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  {/* <Facebook sx={{ color: '#497ce2' }} /> */}
                </IconButton>
              </Link>
              <Link href="/" passHref>
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  {/* <Twitter sx={{ color: '#1da1f2' }} /> */}
                </IconButton>
              </Link>
              <Link href="/" passHref>
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  {/* <Github
                    sx={{
                      color: (theme) =>
                        theme.palette.mode === 'light'
                          ? '#272727'
                          : theme.palette.grey[300]
                    }}
                  /> */}
                </IconButton>
              </Link>
              <Link href="/" passHref>
                <IconButton
                  component="a"
                  onClick={(e: MouseEvent<HTMLElement>) => e.preventDefault()}
                >
                  {/* <Google sx={{ color: '#db4437' }} /> */}
                </IconButton>
              </Link>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default RegisterPage;
