import { useSnackbar } from 'notistack';

// eslint-disable-next-line react-hooks/rules-of-hooks
const { enqueueSnackbar } = useSnackbar();

export const SnackbarUtilities = {
  success(msg: string) {
    enqueueSnackbar(msg, { variant: 'success' });
  },
  warning(msg: string) {
    enqueueSnackbar(msg, { variant: 'warning' });
  },
  info(msg: string) {
    enqueueSnackbar(msg, { variant: 'info' });
  },
  error(msg: string) {
    enqueueSnackbar(msg, { variant: 'error' });
  },
  toast(msg: string, variant: any = 'default') {
    enqueueSnackbar(msg, { variant });
  }
};
