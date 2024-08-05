import { Box, Fab, IconButton, List, useTheme } from '@mui/material'
import bigLogo from '../assets/images/big-logo.svg'
import React, { useContext } from 'react'
import SidebarAddButton from './SidebarAddButton';
import SidebarListItem from './SidebarListItem';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Users } from '../assets/icons/profile-2user.svg';
import { ReactComponent as Sellers } from '../assets/icons/shop.svg';
import { ReactComponent as Suppliers } from '../assets/icons/weight.svg';
import { ReactComponent as Branch } from '../assets/icons/shop.svg';
import { ReactComponent as Banks } from '../assets/icons/bank.svg';
import { ReactComponent as Pos } from '../assets/icons/receipt-discount.svg';
import { ReactComponent as Reports } from '../assets/icons/document-copy.svg';
import { ReactComponent as LastUsers } from '../assets/icons/profile-tick.svg';
import { ReactComponent as Setting } from '../assets/icons/setting.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { Logout } from '@mui/icons-material';

export default function Sidebar() {

  const theme = useTheme();
  const loc = useLocation();
  const nav = useNavigate();
  const { role, logout } = useContext(AuthContext);

  return (
    <Box
      sx={{
        width: 270,
        background: theme.palette.secondary.main,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1,
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          display: 'none'
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mt: 3
        }}
      >
        <img
          src={bigLogo}
          alt="logo"
          style={{
            width: 200,
          }}
        />
      </Box>

      {role === 'admin' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 7,
            px: 2
          }}
        >
          <SidebarAddButton
            label='Kuyumcu Ekle'
            onClick={() => nav('/admin/jewelers/new')}
          />
          <SidebarAddButton
            label='Toptancı Ekle'
            onClick={() => nav('/admin/suppliers/new')}
          />
        </Box>
      )}
      {role === 'seller' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 7,
            px: 2
          }}
        >
          <SidebarAddButton
            label='Altın Sat'
            onClick={() => nav('/seller/products')}
          />
          <SidebarAddButton
            label='Has Altın Al'
            onClick={() => nav('/')}
          />
        </Box>
      )}

      {role === 'supplier' && (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            mt: 7,
            px: 2
          }}
        >
          <SidebarAddButton
            label='Sipariş Takip'
            onClick={() => nav('/')}
          />
        </Box>
      )}

      {role === 'admin' && (
        <Box
          sx={{
            mt: 5
          }}
        >
          <List>
            <SidebarListItem
              label='Anaysayfa'
              Icon={Home}
              to='/admin'
              selected={loc.pathname === '/admin'}
            />
            <SidebarListItem
              label='Kullanıcılar'
              Icon={Users}
              to='/admin/users'
              selected={loc.pathname === '/admin/users'}
            />
            <SidebarListItem
              label='Kuyumcular'
              Icon={Sellers}
              to='/admin/jewelers'
              selected={loc.pathname === '/admin/jewelers'}
            />
            <SidebarListItem
              label='Toptancılar'
              Icon={Suppliers}
              to='/admin/suppliers'
              selected={loc.pathname === '/admin/suppliers'}
            />
            {/* <SidebarListItem
            label='Sözleşmeler'
            Icon={Contracts}
            to='/admin/contracts'
            selected={loc.pathname === '/admin/contracts'}
          /> */}
            <SidebarListItem
              label='Banka Hesapları'
              Icon={Banks}
              to='/admin/banks'
              selected={loc.pathname === '/admin/banks'}
            />
            <SidebarListItem
              label='POS Komisyon Oranları'
              Icon={Pos}
              to='/admin/pos-rates'
              selected={loc.pathname === '/admin/pos-rates'}
            />
            <SidebarListItem
              label='Raporlar'
              Icon={Reports}
              to='/admin/reports'
              selected={loc.pathname === '/admin/reports'}
            />
            <SidebarListItem
              label='Son Kullanıcılar'
              Icon={LastUsers}
              to='/admin/last-users'
              selected={loc.pathname === '/admin/last-users'}
            />
          </List>
        </Box>
      )}

      {role === 'seller' && (
        <Box
          sx={{
            mt: 5
          }}
        >
          <List>
            <SidebarListItem
              label='Anaysayfa'
              Icon={Home}
              to='/seller'
              selected={loc.pathname === '/seller'}
            />
            {/* <SidebarListItem
              label='Ürünler'
              Icon={Suppliers}
              to='/seller/products'
              selected={loc.pathname === '/seller/products'}
            /> */}
            <SidebarListItem
              label='Toptancılar'
              Icon={Suppliers}
              to='/seller/suppliers'
              selected={loc.pathname === '/seller/suppliers'}
            />
            <SidebarListItem
              label='Banka Hesapları'
              Icon={Banks}
              to='/seller/banks'
              selected={loc.pathname === '/seller/banks'}
            />
            <SidebarListItem
              label='Raporlar'
              Icon={Reports}
              to='/seller/reports'
              selected={loc.pathname === '/seller/reports'}
            />
            <SidebarListItem
              label='Mağazalar'
              Icon={Branch}
              to='/seller/branches'
              selected={loc.pathname === '/seller/branches'}
            />
            <SidebarListItem
              label='Kullanıcılar'
              Icon={Users}
              to='/seller/users'
              selected={loc.pathname === '/seller/users'}
            />

            {/* <SidebarListItem
           label='Sözleşmeler'
           Icon={Contracts}
           to='/admin/contracts'
           selected={loc.pathname === '/admin/contracts'}
         /> */}



          </List>
        </Box>
      )}

      {role === 'supplier' && (
        <Box
          sx={{
            mt: 5
          }}
        >
          <List>
            <SidebarListItem
              label='Anaysayfa'
              Icon={Home}
              to='/supplier'
              selected={loc.pathname === '/supplier'}
            />
            <SidebarListItem
              label='Banka Hesapları'
              Icon={Banks}
              to='/supplier/banks'
              selected={loc.pathname === '/supplier/banks'}
            />
            <SidebarListItem
              label='Raporlar'
              Icon={Reports}
              to='/supplier/reports'
              selected={loc.pathname === '/supplier/reports'}
            />

            <SidebarListItem
              label='Kullanıcılar'
              Icon={Users}
              to='/supplier/users'
              selected={loc.pathname === '/supplier/users'}
            />

            {/* <SidebarListItem
           label='Sözleşmeler'
           Icon={Contracts}
           to='/admin/contracts'
           selected={loc.pathname === '/admin/contracts'}
         /> */}



          </List>
        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
        }}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mb: 3
        }}
      >
        <IconButton onClick={() => { logout() }}>
          <Logout sx={{ color: 'white' }} />
        </IconButton>
        <Fab
          color='primary'
          size='small'
          onClick={() => nav(`${role}/profile`)}
        >
          <Setting
            style={{
              stroke: '#F1F1F1'
            }}
          />
        </Fab>
      </Box>
    </Box>
  )
}
