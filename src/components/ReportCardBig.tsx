import { Box, Typography } from '@mui/material';
import React from 'react';
import { formatMoney } from '../utils/global';

type ReportCardBigProps = {
  label: string;
  badgeColor: string;
  price: string;
};

export default function ReportCardBig({ label, badgeColor, price }: ReportCardBigProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: '#FDFDFD',
        borderRadius: '16px',
        width: 'fit-content',
        px: 4,
        py: 3,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 30,
          height: 30,
          backgroundColor: badgeColor,
          borderRadius: '0 16px 0 30px',
          clipPath: 'polygon(100% 0, 100% 100%, 40% 100%, 0 50%, 0 0)',
        }}
      />
      <Typography
        sx={{
          fontSize: 18,
          fontWeight: 400,
          color: 'text.secondary',
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 500,
        }}
      >
        {formatMoney(price)} TL
      </Typography>
    </Box>
  );
}
