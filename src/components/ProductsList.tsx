import { Box, Grid } from '@mui/material'
import kulce from '../assets/images/kulce.png';
import gram from '../assets/images/gram.png';
import React from 'react'
import ProductCardItem from './ProductCardItem';

export default function ProductsList() {

  const products = [
    {
      id: 1,
      description: '1 gr 24 Ayar',
      name: 'Külçe Altın',
      price: '0 TL',
      image: kulce
    },
    {
      id: 2,
      description: '2,5 gr 24 Ayar',
      name: 'Külçe Altın',
      price: '0 TL',
      image: kulce
    },
    {
      id: 3,
      description: '5 gr 24 Ayar',
      name: 'Külçe Altın',
      price: '0 TL',
      image: kulce
    },
    {
      id: 4,
      description: '10 gr 24 Ayar',
      name: 'Külçe Altın',
      price: '0 TL',
      image: kulce
    },
    {
      id: 5,
      description: '20 gr 24 Ayar',
      name: 'Külçe Altın',
      price: '0 TL',
      image: kulce
    },
    {
      id: 6,
      description: '50 gr 24 Ayar',
      name: 'Külçe Altın',
      price: '0 TL',
      image: kulce
    },
    {
      id: 7,
      description: '100 gr 24 Ayar',
      name: 'Külçe Altın',
      price: '0 TL',
      image: kulce
    },
    {
      id: 8,
      description: '1 gr 24 Ayar',
      name: 'Gram Altın',
      price: '0 TL',
      image: gram
    },
  ]

  return (
    <Box>
      <Grid container spacing={2}>
        {products.map(product => (
          <Grid key={product.id} item xs={6} sm={4} md={3}>
            <ProductCardItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
