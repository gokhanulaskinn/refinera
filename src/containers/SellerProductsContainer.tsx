import { Box, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import TablePageHeader from '../components/TablePageHeader'
import BasicTabs from '../components/CustomTabs'
import ProductsList from '../components/ProductsList';
import CustomTablePagination from '../components/CustomTablePagination';
import PaymentSummary from '../components/PaymentSummary';
import ItemList from '../components/ItemList';
import { BucketType, CurrencyItem } from '../utils/types';
import useSWR from 'swr';
import { allCurrency, baseUrl, fetcher } from '../utils/global';


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
  const [summaryItems, setSummaryItems] = React.useState<CurrencyItem[]>([]);

  const handleChangeVariant = (event: React.SyntheticEvent, newValue: number) => {
    setVariant(newValue);
  };

  const handleChangeSupplier = (event: React.SyntheticEvent, newValue: number) => {
    setSupplier(newValue);
  };

  const { data: datas, isLoading, error } = useSWR<any>(
    `${baseUrl}/data`,
    (url: string) => fetcher(url),
    { refreshInterval: 2000 } // 10 saniye
  );

  const [items, setItems] = React.useState<CurrencyItem[]>([])

  useEffect(() => {
    if (datas) {
      let defaultItems = allCurrency;
      const loc = localStorage.getItem('items');
      if (loc && loc.length > 40) {
        defaultItems = JSON.parse(localStorage.getItem('items') || '');
      }
      const values = Object.values(datas.data);
      const valuesData = values.map((item: any) => {
        return {
          currency: item.code,
          parity: item.code,
          buyPrice: parseFloat(item.alis),
          sellerPrice: parseFloat(item.satis),
          diff: 0,
          timestamp: datas.meta.time
        }
      })
      const newValues = defaultItems.map((item: CurrencyItem) => {
        const newValue = valuesData.find((value) => value.parity === item.parity);
        if (newValue) {
          return {
            ...item,
            buyPrice: newValue.buyPrice,
            sellerPrice: newValue.sellerPrice,
            diff: 0,
            timestamp: newValue.timestamp
          }
        }
        return item;
      })
      setItems(newValues);
      if (summaryItems.length === 0) {
        setSummaryItems(newValues);
      }
      localStorage.setItem('items', JSON.stringify(newValues));
    }
  }, [datas])

  const handleUpdateSummaryItems = () => {
    setSummaryItems(items);
  }

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
                items={items}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PaymentSummary
              bucket={bucket}
              items={summaryItems}
              handleUpdateSummaryItems={handleUpdateSummaryItems}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
