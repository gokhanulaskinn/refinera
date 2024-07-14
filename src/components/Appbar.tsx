import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';

export default function Appbar() {

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { role, setRole } = React.useContext(AuthContext);
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
          Merhaba, Can Hitay
        </Typography>
        <Box>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            sx={{
              textTransform: 'none',
              color: 'black',
            }}
          >
            {
              role === 'admin' ? 'Admin' :
                role === 'seller' ? 'Kuyumcu' :
                  role === 'supplier' ? 'Toptancı' :
                    'Rol Seç'
            }
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => { setRole('admin'); handleClose() }}>Admin</MenuItem>
            <MenuItem onClick={() => { setRole('seller'); handleClose() }}>Kuyumcu</MenuItem>
            <MenuItem onClick={() => { setRole('supplier'); handleClose() }}>Toptancı</MenuItem>
          </Menu>

        </Box>
      </Toolbar>
    </AppBar>
  )
}
