import { Box, FormControl, InputAdornment, TextField, Typography, useTheme } from '@mui/material';
import React from 'react';
import { formatMoney } from '../utils/global';

interface MoneyInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  sx?: any;
  backgroundColor?: string;
  borderEnabled?: boolean;
}

const MoneyInput: React.FC<MoneyInputProps> = ({ label, value, onChange, sx, backgroundColor, borderEnabled }) => {

  const [displayValue, setDisplayValue] = React.useState<string>('');
  const theme = useTheme();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numericValue = e.target.value.replace(/\D/g, '');

    if (numericValue.length > 0) {
      const formattedValue = formatMoney(numericValue);
      setDisplayValue(formattedValue);
      onChange(numericValue);
    } else {
      setDisplayValue('');
      onChange('');
    }
  };

  return (

    <Box>
      <FormControl
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            borderRadius: '60px',
            backgroundColor: backgroundColor,

            '& fieldset': {
              borderColor: '#9AA6A7',
              borderWidth: borderEnabled ? 1 : 0,
            },
            '&:hover fieldset': {
              borderWidth: borderEnabled ? 1 : 0,
              borderColor: '#9AA6A7',
            },
            '&.Mui-focused fieldset': {
              borderWidth: borderEnabled ? 1 : 0,
              borderColor: '#9AA6A7',
            },
            '& input:-webkit-autofill': {
              WebkitBoxShadow: `0 0 0 1000px ${theme.palette.background.default} inset`,
              WebkitTextFillColor: 'inherit',
            },
          },
          ...sx
        }}
      >
        <Typography
          sx={{
            fontSize: 16,
            fontWeight: 500,
            color: '#9AA6A7',
          }}
        >
          {label}
        </Typography>
        <TextField
          label={label}
          value={displayValue}
          onChange={handleChange}
          variant="outlined"
          fullWidth
        />
      </FormControl>
    </Box>




  );
};

export default MoneyInput;