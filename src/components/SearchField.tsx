import { TextField, useTheme } from '@mui/material';
import { ReactComponent as SearchIcon } from '../assets/icons/search-normal.svg';

export default function SearchField() {
  const theme = useTheme();

  return (
    <TextField
      id="search"
      placeholder="Ara..."
      sx={{
        borderRadius: '55px',
        background: theme.palette.background.paper,
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            border: 'none',
          },
          '&:hover fieldset': {
            border: 'none',
          },
          '&.Mui-focused fieldset': {
            border: 'none',
          },
        },
      }}
      InputProps={{
        endAdornment: <SearchIcon style={{ stroke: '#344054' }} />,
        sx: {
          borderRadius: '55px',
          border: 'none',
          height: '40px',
          width: '300px',
          padding: '0px 10px',
          '& input::placeholder': {
            color: '#667085',
            opacity: 1,
          },
        },
      }}
    />
  );
}
