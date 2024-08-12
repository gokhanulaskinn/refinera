import { useSnackbar, SnackbarOrigin } from 'notistack';

export const useAlert = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = (
    message: string,
    variant?: 'default' | 'error' | 'success' | 'warning' | 'info',
    autoHideDuration?: number | null,
    anchorOrigin?: SnackbarOrigin
  ) => {
    enqueueSnackbar(
      message,
      {
        variant: variant,
        autoHideDuration: autoHideDuration || 1000,
        anchorOrigin: anchorOrigin
      },
    );
  }

  return showSnackbar;
};
