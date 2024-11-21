import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { useContext } from 'react';
import bigLogo from '../assets/images/big-logo.svg';
import loginBg from '../assets/images/login-bg.svg';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import { AuthContext } from '../contexts/AuthProvider';
import { useAlert } from '../hooks/useAlert';
import { userPasswordReset } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';

export default function ForgotPasswordContainer() {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const showSnackbar = useAlert();
  const nav = useNavigate();

  const handleReset = async (email: string) => {
    try {
      const res = await userPasswordReset(email);
      if (res) {
        showSnackbar('Şifre Sıfırlama İsteği Gönderildi', 'success');
        nav('/login');
      }
    } catch (e) {
      console.log(e)
      showSnackbar('Şifre Sıfırlama İsteği Gönderilemedi', 'error');
    }
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: isMdUp ? 'transparent' : 'background.default',
      }}
    >
      {isMdUp ? (
        <Grid container sx={{ height: '100%' }}>
          <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ForgotPasswordForm
              handleReset={handleReset}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              backgroundImage: `url(${loginBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img src={bigLogo} alt="Big Logo" style={{ maxWidth: '80%', maxHeight: '80%' }} />
          </Grid>
        </Grid>
      ) : (
        <Box sx={{ width: '100%' }}>
          <ForgotPasswordForm
            handleReset={handleReset}
          />
        </Box>
      )}
    </Box>
  );
}
