import { Add, Remove } from '@mui/icons-material';
import { Box, IconButton, TextField } from '@mui/material';
import React from 'react';
import MoneyInput from './MoneyInput';

type PriceControlProps = {
  price: number;
  setPrice: (price: number) => void;
};

export default function PriceControl({ price, setPrice }: PriceControlProps) {

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        borderRadius: '4px',
        background: '#F2F4F7',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '8px',
        p: 1,
      }}
    >
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          if (price > 0) {
            setPrice(price - 1);
          }
        }}
      >
        <Remove sx={{ width: '12px', height: '12px' }} />
      </IconButton>

      <MoneyInput
        value={price.toString()}
        onChange={(value) => setPrice(parseFloat(value))}
      />

      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setPrice(price + 1);
        }}
      >
        <Add sx={{ width: '12px', height: '12px' }} />
      </IconButton>
    </Box>
  );
}
