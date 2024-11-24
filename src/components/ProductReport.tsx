import React from 'react'
import CustomPaper from './CustomPaper'
import { Box, Typography } from '@mui/material'

type ProductReportProps = {
  products: any
}

export default function ProductReport({ products }: ProductReportProps) {

  return (
    <CustomPaper>
      <Typography
        sx={{
          fontSize: '18px',
          fontWeight: '400'
        }}
      >
        Satışı Yapılan Ürün Cinsi
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          mt: 2
        }}
      >
        {products && Object.keys(products).map((product, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 0',
              background: '#F2F4F7',
              borderRadius: '8px',
              py: 1.5,
              px: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: '16px',
                fontWeight: '400',
                color: '#475467'
              }}
            >
              {product}
            </Typography>
            <Typography
              sx={{
                fontSize: '30px',
                fontWeight: '700',
                color: '#344054',
                ml: 'auto'
              }}
            >
              {products[product]} Adet
            </Typography>
          </Box>
        ))}
      </Box>
    </CustomPaper>
  )
}
