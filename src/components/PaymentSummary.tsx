import { Box, Divider, Paper, TextField, Typography } from '@mui/material'
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

  const [price, setPrice] = React.useState<number>(0);
  const [commissionType, setCommissionType] = React.useState<string>('');
  const [commission, setCommission] = React.useState<number>(0);
  const [sellerTotal, setSellerTotal] = React.useState<number>();
  const [serviceFee, setServiceFee] = React.useState<number>();
  const [productList, setProductList] = React.useState<string[]>([]);
  const { user } = useContext(AuthContext);

  const nav = useNavigate();

  const [total, setTotal] = React.useState<number>(0);

  useEffect(() => {
    let total = 0;
    let productListData: string[] = [];
    bucket.forEach((item) => {
      const product = items.find((product) => product.id === item.itemId);
      if (product) {
        total += product.sell * item.quantity;
        productListData.push(`${item.quantity} x ${product.label} = ${formatMoney((product.sell * item.quantity).toFixed(2))} TL`);
      }
    })
    setPrice(total);
    setProductList(productListData);
  }, [bucket])

  useEffect(() => {
    if (user?.jeweler?.comissionRate) {
      const fee = (sellerTotal || 0) * user.jeweler.comissionRate / 100;
      setServiceFee(fee);
      setTotal((sellerTotal || 0) + fee);
    }
  }, [sellerTotal])

  useEffect(() => {
    if (commissionType) {
      if (commissionType === 'percent') {
        setSellerTotal(price + (price * commission / 100));
      } else {
        setSellerTotal(price + commission);
      }
    } else {
      setSellerTotal(price);
    }
    if (price === 0) {
      setCommission(0);
      setCommissionType('');
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
        {productList.length > 0 && (
          <Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                my: 1
              }}
            >
              {productList.map((product, index) => (
                <Typography
                  key={index}
                  sx={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#475467'
                  }}
                >
                  {product}
                </Typography>
              ))}
            </Box>
            <Divider />
          </Box>
        )}
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
          { value: 'fixed', label: 'TL' }
        ]}
        backgroundColor='#F2F4F7'
      />
      {commissionType && (
        commissionType === 'percent' ? (
          <TextInput
            label='Komisyon'
            value={commission || ''}
            onChange={(e) => {
              if (e.target.value) {
                setCommission(parseFloat(e.target.value));
              } else {
                setCommission(0);
              }
            }}
            type='money'
            backgroundColor='#F2F4F7'
            endAdornment={commissionType === 'percent' ? '%' : 'TL'}
          />
        ) : (
          <MoneyInput
            label='Komisyon'
            value={commission.toString()}
            onChange={(value) => { setCommission(parseFloat(value)) }}
            backgroundColor='#F2F4F7'
            height={36}
            align='left'
            endAdornment='TL'
          />
        )
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
