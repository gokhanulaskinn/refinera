import { Box, ListItemButton, Typography } from '@mui/material';
import React from 'react'
import Counter from './Counter';
import { formatMoney } from '../utils/global';
import { ArrowUpward } from '@mui/icons-material';

type ProductItemProps = {
  item: {
    label: string;
    buy: number;
    sell: number;
    diff: number;
  },
  count: number;
  setCount: (count: number) => void;
}

export default function ProductItem({ item, count, setCount }: ProductItemProps) {

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        px: 2
      }}
    >
      <ListItemButton
        disableRipple
        onClick={() => setCount(count + 1)}
      >
        <Box
          sx={{
            width: '50%',
            ml: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Counter
            count={count}
            setCount={setCount}
          />
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '700',
            }}
          >
            {item.label}
          </Typography>
        </Box>
        <Typography
          sx={{
            width: '25%',
            fontSize: '20px',
            fontWeight: '700',
            textAlign: 'end',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}
        >
          {formatMoney(item.buy.toFixed(2))}
          {item.diff >= 0 && (
            <ArrowUpward sx={{ color: '#1CBA76' }} />
          )}
          {item.diff < 0 && (
            <ArrowUpward sx={{ color: '#D43D28' }} />
          )}
        </Typography>
        <Box
          sx={{
            width: '25%',

          }}
        >
          <Typography
            sx={{
              fontSize: '20px',
              fontWeight: '700',
              textAlign: 'end',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}
          >
            {formatMoney(item.sell.toFixed(2))}
            {item.diff >= 0 && (
              <ArrowUpward sx={{ color: '#1CBA76' }} />
            )}
            {item.diff < 0 && (
              <ArrowUpward sx={{ color: '#D43D28' }} />
            )}
          </Typography>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '500',
              textAlign: 'end',
              color: item.diff >= 0 ? '#1CBA76' : '#D43D28'
            }}
          >
            %{item.diff.toFixed(2)}
          </Typography>
        </Box>

      </ListItemButton>
    </Box>
  )
}
