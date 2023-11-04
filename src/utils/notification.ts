import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { colors } from '@/theme/schemes/GreyGooseTheme';
// import { useTheme } from '@mui/material';

// const theme = useTheme();

toast.configure();

export const successNotification = (message: string) => {
  toast(message, {
    type: 'default',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
    className: 'toast-background',
    bodyClassName: 'toast-body',
    toastId: `success${message}`,
    style: {
      backgroundColor: colors.success.main,
      color: 'white',
      textAlign: 'center',
      fontSize: 16
    }
  });
  return false;
};
export const infoNotification = (message: string) => {
  toast(message, {
    type: 'default',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    closeButton: false,
    className: 'toast-background',
    bodyClassName: 'toast-body',
    toastId: `info${message}`,
    style: {
      backgroundColor: colors.primary.main,
      color: 'white',
      textAlign: 'center',
      fontSize: 16
    }
  });
  return false;
};
export const errorNotification = (message: string) => {
  toast(message, {
    type: 'default',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    closeButton: false,
    className: 'toast-background',
    bodyClassName: 'toast-body',
    toastId: `error${message}`,
    style: {
      backgroundColor: colors.error.main,
      color: 'white',
      textAlign: 'center',
      fontSize: 16
    }
  });
  return false;
};
export const warningNotification = (message: string) => {
  toast(message, {
    type: 'default',
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    progress: undefined,
    closeButton: false,
    className: 'toast-background',
    bodyClassName: 'toast-body',
    toastId: `warning${message}`,
    style: {
      backgroundColor: colors.warning.main,
      color: 'white',
      textAlign: 'center',
      fontSize: 16
    }
  });
  return false;
};
