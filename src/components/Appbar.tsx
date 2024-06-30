import { AppBar } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Appbar() {
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
            fontWeight:400,
            fontSize: '18px',
          }}>
          Merhaba, Can Hitay
        </Typography>
        <Box>
          Admin
        </Box>
      </Toolbar>
    </AppBar>
  )
}
