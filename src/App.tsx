// src/App.tsx

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/tr';
import { SnackbarProvider } from 'notistack';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Guard from './components/Guard';
import Layout from './components/Layout';
import AuthProvider from './contexts/AuthProvider';
import { lightTheme } from './theme';
import Login from './views/Login';
import ComissionRates from './views/admin/ComissionRates';
import LastUsers from './views/admin/LastUsers';
import SellerAddEdit from './views/admin/SellerAddEdit';
import Sellers from './views/admin/Sellers';
import SupplierAddEdit from './views/admin/SupplierAddEdit';
import Suppliers from './views/admin/Suppliers';
import BankAddEdit from './views/common/BankAddEdit';
import Banks from './views/common/Banks';
import CloseIframePage from './views/common/CloseIframePage';
import Root from './views/common/Root';
import UserAddEdit from './views/common/UserAddEdit';
import UserProfile from './views/common/UserProfile';
import Users from './views/common/Users';
import GetPayment from './views/seller/GetPayment';
import SellerProducts from './views/seller/SellerProducts';
import SellerReport from './views/seller/SellerReport';
import SellerSuppliers from './views/seller/SellerSuppliers';
import AdminReport from './views/admin/AdminReport';
import SellerBranches from './views/seller/SellerBranches';
import ExternalPayment from './views/ExternalPayment';

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
                <Route path="/pay/:code" element={<ExternalPayment />} />
                <Route path="/seller/get-payment/finish" element={<CloseIframePage />} />
              </Routes>
              <Guard>
                <Layout>
                  <Routes>
                    <Route path="/" element={<Root />} />
                    <Route path="/admin/jewelers" element={<Sellers />} />
                    <Route path="/admin/profile" element={<UserProfile />} />
                    <Route path="/admin/jewelers/new" element={<SellerAddEdit />} />
                    <Route path="/admin/jewelers/:id/edit" element={<SellerAddEdit />} />
                    <Route path="/admin/suppliers" element={<Suppliers />} />
                    <Route path="/admin/suppliers/new" element={<SupplierAddEdit />} />
                    <Route path="/admin/suppliers/:id/edit" element={<SupplierAddEdit />} />
                    <Route path="/admin/users" element={<Users />} />
                    <Route path="/admin/reports" element={<AdminReport />} />
                    <Route path="/admin/users/new" element={<UserAddEdit />} />
                    <Route path="/admin/users/:id/edit" element={<UserAddEdit />} />
                    <Route path="/admin/banks" element={<Banks />} />
                    <Route path="/admin/banks/new" element={<BankAddEdit />} />
                    <Route path="/admin/banks/:id/edit" element={<BankAddEdit />} />
                    <Route path="/admin/last-users" element={<LastUsers />} />
                    <Route path="/admin/pos-rates" element={<ComissionRates />} />

                    <Route path="/seller" element={<SellerProducts />} />
                    <Route path="/seller/banks" element={<Banks />} />
                    <Route path="/seller/banks/new" element={<BankAddEdit />} />
                    <Route path="/seller/banks/:id/edit" element={<BankAddEdit />} />
                    <Route path="/seller/users" element={<Users />} />
                    <Route path="/seller/users/new" element={<UserAddEdit />} />
                    <Route path="/seller/users/:id/edit" element={<UserAddEdit />} />
                    <Route path="/seller/suppliers" element={<SellerSuppliers />} />
                    <Route path="/seller/branches" element={<SellerBranches />} />
                    {/* <Route path="/seller/products" element={<SellerProducts />} /> */}
                    <Route path="/seller/get-payment" element={<GetPayment />} />
                    <Route path="/seller/profile" element={<UserProfile />} />
                    <Route path="/seller/reports" element={<SellerReport />} />

                    <Route path="/supplier/banks" element={<Banks />} />
                    <Route path="/supplier/banks/new" element={<BankAddEdit />} />
                    <Route path="/supplier/banks/:id/edit" element={<BankAddEdit />} />
                    <Route path="/supplier/users" element={<Users />} />
                    <Route path="/supplier/users/new" element={<UserAddEdit />} />
                    <Route path="/supplier/users/:id/edit" element={<UserAddEdit />} />
                    <Route path="/supplier/suppliers" element={<SellerSuppliers />} />

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
