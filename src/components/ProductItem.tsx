import { Box, ListItemButton, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import Counter from './Counter';
import { formatMoney } from '../utils/global';
import { CurrencyItem } from '../utils/types';

type ProductItemProps = {
  item: CurrencyItem;
  count: number;
  setCount: (count: number) => void;
};

export default function ProductItem({ item, count, setCount }: ProductItemProps) {
  const [bgColor, setBgColor] = useState<'transparent' | 'rgba(28, 186, 118, 0.2)' | 'rgba(212, 61, 40, 0.2)'>('transparent');
  const [oldItem, setOldItem] = useState<CurrencyItem | null>(null);

  useEffect(() => {
    if (oldItem !== null && oldItem.sellerPrice !== item.sellerPrice) {
      if (item.sellerPrice > oldItem.sellerPrice) {
        setBgColor('rgba(28, 186, 118, 0.2)');
      } else if (item.sellerPrice < oldItem.sellerPrice) {
        setBgColor('rgba(212, 61, 40, 0.2)');
      }
      setOldItem(item);
      const timer = setTimeout(() => {
        setBgColor('transparent');
      }, 500);

      return () => clearTimeout(timer);
    } else {
      setOldItem(item);
    }
  }, [item.sellerPrice]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        px: 2,
        backgroundColor: bgColor, // Arka plan rengini dinamik olarak ayarla
        transition: 'background-color 0.2s ease-in-out', // Daha hızlı ve yumuşak geçiş
      }}
    >
      <ListItemButton
        onClick={() => setCount(count + 1)}
      >
        <Box
          sx={{
            width: '50%',
            ml: 2,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Counter count={count} setCount={setCount} />
          <Typography
            sx={{
              fontSize: '16px',
              fontWeight: '700',
            }}
          >
            {item.currency}
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
            justifyContent: 'flex-end',
          }}
        >
          {formatMoney(item.buyPrice?.toFixed(2))}
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
              justifyContent: 'flex-end',
            }}
          >
            {formatMoney(item.sellerPrice?.toFixed(2))}
          </Typography>
        </Box>
      </ListItemButton>
    </Box>
  );
}
