import { Box, Typography } from '@mui/material'
import React from 'react'

type ProductCardItemProps = {
  product: any;
};

export default function ProductCardItem({ product }: ProductCardItemProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        p: 2,
        border: '1px solid #EAECF0',
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <img src={product.image} alt={product.name} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >

        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 600,
            color: 'text.secondary'
          }}
        >
          {product.description}
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '12px',
            fontWeight: 600,
            color: 'text.secondary'
          }}
        >
          {product.name}
        </Typography>
        <Typography
          sx={{
            textAlign: 'center',
            fontSize: '18px',
            fontWeight: 600,
            color: 'text.primary'
          }}
        >
          {product.price}
        </Typography>
      </Box>
    </Box>
  )
}
