import { TextField, useTheme } from '@mui/material';
import { ReactComponent as SearchIcon } from '../assets/icons/search-normal.svg';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';

type SearchFieldProps = {
  handleSearch: (searchText: string) => void;
};

export default function SearchField({ handleSearch }: SearchFieldProps) {
  const theme = useTheme();

  const [searchText, setSearchText] = useState('');

  // useCallback with debounce to handle search
  const debouncedHandleSearch = useCallback(
    debounce((text) => {
      handleSearch(text);
    }, 300),
    []
  );

  useEffect(() => {
    debouncedHandleSearch(searchText);
    // Cleanup debounce on unmount
    return () => {
      debouncedHandleSearch.cancel();
    };
  }, [searchText, debouncedHandleSearch]);

  return (
    <TextField
      id="search"
      placeholder="Ara..."
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
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
