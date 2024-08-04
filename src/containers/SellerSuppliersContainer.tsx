import { Box, Grid } from '@mui/material'
import React from 'react'
import TablePageHeader from '../components/TablePageHeader'
import BasicTabs from '../components/CustomTabs'
import Exchange from '../components/Exchange'
import Balance from '../components/Balance'
import BuySummary from '../components/BuySummary'

export default function SellerSuppliersContainer() {

  const suppliers = [
    'Harem Altın',
    'AHL',
    'Nadir',
    'Atasay'
  ]

  const [supplier, setSupplier] = React.useState(0);

  const handleChangeSupplier = (event: React.SyntheticEvent, newValue: number) => {
    setSupplier(newValue);
  };

  return (
    <Box>
      <TablePageHeader 
      title="Has Altın Al"
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
                gap: 2,
              }}
            >
              <Exchange />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Balance />
              <BuySummary />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
