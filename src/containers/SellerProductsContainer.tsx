import { Box, FormControlLabel, Grid, Switch } from '@mui/material'
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
import MilyenCalculator from '../components/MilyenCalculator';


export default function SellerProductsContainer() {

  const suppliers = [
    'Harem Altın',
  ]

  const [variant, setVariant] = React.useState(0);
  const [supplier, setSupplier] = React.useState(0);
  const [summaryItems, setSummaryItems] = React.useState<CurrencyItem[]>([]);
  const [milyenOn, setMilyenOn] = React.useState<boolean>(false);
  const [milyenValues, setMilyenValues] = React.useState<any>({
    totalWeight: 0,
    milyenValue: 0,
    feeRate: 0,
    totalFeeRate: 0,
    ayarMilyen: 0
  });

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

  useEffect(() => {
    if (milyenOn) {
      setBucket([]);
    } else {
      setMilyenValues({
        totalWeight: 0,
        milyenValue: 0,
        feeRate: 0,
        totalFeeRate: 0,
        ayarMilyen: 0
      })
    }
  },[milyenOn])

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
              <FormControlLabel
                control={
                  <Switch
                    checked={milyenOn}
                    onChange={() => setMilyenOn(!milyenOn)}
                    name="checkedB"
                    color="primary"
                  />
                }
                label="Milyen"
              />
              {!milyenOn ? (
                <ItemList
                  bucket={bucket}
                  setBucket={setBucket}
                  items={items}
                />
              ) : (
                <MilyenCalculator
                  milyenValues={milyenValues}
                  setMilyenValues={setMilyenValues}
                />
              )
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <PaymentSummary
              bucket={bucket}
              items={summaryItems}
              handleUpdateSummaryItems={handleUpdateSummaryItems}
              milyenOn={milyenOn}
              milyenValues={milyenValues}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
