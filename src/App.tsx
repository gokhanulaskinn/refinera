// src/App.tsx

import { CssBaseline, ThemeProvider } from '@mui/material';
import 'dayjs/locale/tr';
import { SnackbarProvider } from 'notistack';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { lightTheme } from './theme';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Login from './views/Login';
import Home from './views/Home';
import AuthProvider from './contexts/AuthProvider';
import Guard from './components/Guard';
import Layout from './components/Layout';
import Sellers from './views/admin/Sellers';

const App = () => {

  return (
    <SnackbarProvider>
      <AuthProvider>
        <ThemeProvider theme={lightTheme}>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='tr'>
            <CssBaseline />
            <Router>
              <Routes>
                <Route path="/login" element={<Login />} />
              </Routes>
              <Guard>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/admin/jewelers" element={<Sellers />} />
                  </Routes>
                </Layout>
              </Guard>
            </Router>
          </LocalizationProvider>
        </ThemeProvider>
      </AuthProvider>
    </SnackbarProvider>
  );
};

export default App;
