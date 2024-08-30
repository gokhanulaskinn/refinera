import { Box, Grid } from '@mui/material'
import React from 'react'
import TablePageHeader from '../components/TablePageHeader'
import BasicTabs from '../components/CustomTabs'
import ProductsList from '../components/ProductsList';
import CustomTablePagination from '../components/CustomTablePagination';
import PaymentSummary from '../components/PaymentSummary';
import ItemList from '../components/ItemList';
import { BucketType } from '../utils/types';


export default function SellerProductsContainer() {
  const variants = [
    'Gram Altın',
    'Çeyrek Altın',
    'Yarım Altın',
    'Tam Altın',
    'Ata',
    'Külçe Altın',
    'Ziynet'
  ];

  const suppliers = [
    'Harem Altın',
  ]

  const [variant, setVariant] = React.useState(0);
  const [supplier, setSupplier] = React.useState(0);

  const handleChangeVariant = (event: React.SyntheticEvent, newValue: number) => {
    setVariant(newValue);
  };

  const handleChangeSupplier = (event: React.SyntheticEvent, newValue: number) => {
    setSupplier(newValue);
  };

  const [bucket, setBucket] = React.useState<BucketType[]>([]);

  return (
    <Box>
      <TablePageHeader
        title="Ürünler"
        handleSearch={(searchText) => console.log(searchText)}
      />
      <BasicTabs
        value={supplier}
        handleChange={handleChangeSupplier}
        tabs={suppliers}
      />
      <Box
        sx={{
          mt: 6
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <ItemList
                bucket={bucket}
                setBucket={setBucket}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PaymentSummary
              bucket={bucket}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
