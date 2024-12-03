import { AppBar, IconButton } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { Notifications } from '@mui/icons-material';

export default function Appbar() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { role, setRole, user } = React.useContext(AuthContext);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        background: 'transparent',
        borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
      }}
    >
      <Toolbar>
        <Typography
          sx={{
            flexGrow: 1,
            fontWeight: 400,
            fontSize: '18px',
          }}>
          Merhaba, {user?.firstName} {user?.lastName}
        </Typography>
        <IconButton>
          <Notifications />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}
