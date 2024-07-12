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
import SellerAddEdit from './views/admin/SellerAddEdit';
import Suppliers from './views/admin/Suppliers';
import SupplierAddEdit from './views/admin/SupplierAddEdit';
import Users from './views/common/Users';
import AddEditUser from './views/common/UserAddEdit';
import UserAddEdit from './views/common/UserAddEdit';
import Banks from './views/common/Banks';
import BankAddEdit from './views/common/BankAddEdit';

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
                    <Route path="/admin/jewelers/new" element={<SellerAddEdit />} />
                    <Route path="/admin/jewelers/:id/edit" element={<SellerAddEdit />} />
                    <Route path="/admin/suppliers" element={<Suppliers />} />
                    <Route path="/admin/suppliers/new" element={<SupplierAddEdit />} />
                    <Route path="/admin/suppliers/:id/edit" element={<SupplierAddEdit />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/users/new" element={<UserAddEdit />} />
                    <Route path="/admin/users/:id/edit" element={<UserAddEdit />} />
                    <Route path="/admin/banks" element={<Banks />} />
                    <Route path="/admin/banks/new" element={<BankAddEdit />} />
                    <Route path="/admin/banks/:id/edit" element={<BankAddEdit />} />
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
