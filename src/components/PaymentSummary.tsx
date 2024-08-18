import { Box, Paper, TextField, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import CommonButton from './CommonButton'
import { Add, ArrowForward, ArrowForwardIos, ArrowRight, ArrowRightAltOutlined } from '@mui/icons-material'
import TextInput from './TextInput';
import { useNavigate } from 'react-router-dom';
import MoneyInput from './MoneyInput';
import { BucketType } from '../utils/types';
import { items } from './ItemList';
import { formatMoney } from '../utils/global';
import CommonSelect from './CommonSelect';
import PriceControl from './PriceControl';
import { AuthContext } from '../contexts/AuthProvider';
import CountDownProgress from './CountDownProgress';

type PaymentSummaryProps = {
  bucket: BucketType[];
}

export default function PaymentSummary({ bucket }: PaymentSummaryProps) {

  const [price, setPrice] = React.useState<number>();
  const [commissionType, setCommissionType] = React.useState<string>('');
  const [commission, setCommission] = React.useState<number>();
  const [sellerTotal, setSellerTotal] = React.useState<number>();
  const [serviceFee, setServiceFee] = React.useState<number>();
  const { user } = useContext(AuthContext);

  const nav = useNavigate();

  const [total, setTotal] = React.useState<number>(0);

  useEffect(() => {
    let total = 0;
    bucket.forEach((item) => {
      const product = items.find((product) => product.id === item.itemId);
      if (product) {
        total += product.sell * item.quantity;
      }
    })
    setPrice(total);
  }, [bucket])

  useEffect(() => {
    if (user?.jeweler?.comissionRate) {
      const fee = (sellerTotal || 0) * user.jeweler.comissionRate / 100;
      setServiceFee(fee);
      setTotal((sellerTotal || 0) + fee);
    }
  }, [sellerTotal])

  useEffect(() => {
    if (price && commission && commissionType) {
      if (commissionType === 'percent') {
        setSellerTotal(price + (price * commission / 100));
      } else {
        setSellerTotal(price + commission);
      }
    }
  }, [commission, commissionType, price])

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        px: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        borderRadius: '16px',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: '400',
          }}
        >
          Sepet Toplamı
        </Typography>
        <Typography
          sx={{
            fontSize: '26px',
            fontWeight: 500,
          }}
        >
          {formatMoney(price?.toFixed(2) || '0')} TL
        </Typography>
      </Box>
      <CommonSelect
        placeholder='Komisyon Cinsi'
        value={commissionType}
        onChange={(e) => setCommissionType(e.target.value)}
        items={[
          { value: 'percent', label: 'Yüzde' },
          { value: 'fixed', label: 'Sabit' }
        ]}
        backgroundColor='#F2F4F7'
      />
      {commissionType && (
        <TextInput
          label='Komisyon'
          value={commission}
          onChange={(e) => {
            if (e.target.value) {
              setCommission(parseFloat(e.target.value));
            } else {
              setCommission(undefined);
            }
          }}
          backgroundColor='#F2F4F7'
          endAdornment={commissionType === 'percent' ? '%' : 'TL'}
        />
      )}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 2
        }}
      >
        <Typography
          color="text.secondary"
          sx={{
            fontSize: '12px',
            fontWeight: 500
          }}
        >
          Fiyat Değiştir
        </Typography>
        <PriceControl
          price={sellerTotal || 0}
          setPrice={setSellerTotal}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 2
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#475467'
            }}
          >
            Kuyumcu Hakediş
          </Typography>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: '500',
            }}
          >
            {formatMoney(sellerTotal?.toFixed(2) || '0')} TL
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: '14px',
              fontWeight: '400',
              color: '#475467'
            }}
          >
            Hizmet Bedeli
          </Typography>
          <Typography
            sx={{
              fontSize: '24px',
              fontWeight: '500',
            }}
          >
            {formatMoney(serviceFee?.toFixed(2) || '0')} TL
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: '18px',
            fontWeight: '400',
            color: '#475467'
          }}
        >
          Toplam Tutar
        </Typography>
        <Typography
          sx={{
            fontSize: '42px',
            fontWeight: '500',
          }}
        >
          {formatMoney(total?.toFixed(2) || '0')} TL
        </Typography>
      </Box>
      <Box>
        <CountDownProgress
          timeLeft={60}
          onFinished={() => console.log('finished')}
          label='İşlemi tamamlamak için kalan süre'
          repeat
        />
      </Box>
      <CommonButton
        onClick={() => { nav(`/seller/get-payment?price=${sellerTotal}`) }}
        color='white'
        label='Alışverişi Tamamla'
        icon={<ArrowForwardIos />}
      />
    </Paper>
  )
}
