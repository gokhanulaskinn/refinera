import { Box, Fab, List, useTheme } from '@mui/material'
import bigLogo from '../assets/images/big-logo.svg'
import React from 'react'
import SidebarAddButton from './SidebarAddButton';
import SidebarListItem from './SidebarListItem';
import { ReactComponent as Home } from '../assets/icons/home.svg';
import { ReactComponent as Users } from '../assets/icons/profile-2user.svg';
import { ReactComponent as Sellers } from '../assets/icons/shop.svg';
import { ReactComponent as Suppliers } from '../assets/icons/weight.svg';
import { ReactComponent as Contracts } from '../assets/icons/task-square.svg';
import { ReactComponent as Banks } from '../assets/icons/bank.svg';
import { ReactComponent as Pos } from '../assets/icons/receipt-discount.svg';
import { ReactComponent as Reports } from '../assets/icons/document-copy.svg';
import { ReactComponent as LastUsers } from '../assets/icons/profile-tick.svg';
import { ReactComponent as Setting } from '../assets/icons/setting.svg';
import { useLocation } from 'react-router-dom';

export default function Sidebar() {

  const theme = useTheme();
  const loc = useLocation();

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
        //hide scrollbar
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
          onClick={() => console.log('yeni proje')}
        />
        <SidebarAddButton
          label='Toptancı Ekle'
          onClick={() => console.log('yeni proje')}
        />
      </Box>
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
        <Fab
          color='primary'
          size='small'
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
