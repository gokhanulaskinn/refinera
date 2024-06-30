import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import LoginForm from '../components/LoginForm';
import loginBg from '../assets/images/login-bg.svg';
import bigLogo from '../assets/images/big-logo.svg';
import { useAlert } from '../hooks/useAlert';
import { loginUser } from '../services/AuthService';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

export default function LoginContainer() {

  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const showSnackbar = useAlert();
  const { login } = useContext(AuthContext);

  const handleLogin = async (email: string, password: string) => {
    try {
      const res = await loginUser(email, password);

      if (res) {
        showSnackbar('Giriş Başarılı', 'success');
        login(res.access_token);
        localStorage.setItem('token', res.access_token);
      }
    } catch (e) {
      console.log(e)
      showSnackbar('Giriş Başarısız', 'error');
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
            <LoginForm
              handleLogin={handleLogin}
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
          <LoginForm
            handleLogin={handleLogin}
          />
        </Box>
      )}
    </Box>
  );
}
