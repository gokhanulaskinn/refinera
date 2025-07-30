import { ArrowForwardIos } from '@mui/icons-material';
import { Box, Divider, Paper, Typography } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mutate } from 'swr';
import { AuthContext } from '../contexts/AuthProvider';
import { getCalculator } from '../services/seller/SellerServices';
import { baseUrl, formatMoney } from '../utils/global';
import { BucketType, CurrencyItem } from '../utils/types';
import CommonButton from './CommonButton';
import CommonSelect from './CommonSelect';
import CountDownProgress from './CountDownProgress';
import MoneyInput from './MoneyInput';
import PriceControl from './PriceControl';
import TextInput from './TextInput';

type PaymentSummaryProps = {
  bucket: BucketType[];
  items: CurrencyItem[];
  handleUpdateSummaryItems: () => void;
  milyenOn: boolean;
  milyenValues: any;
}

export default function PaymentSummary({ milyenOn, milyenValues, bucket, items, handleUpdateSummaryItems }: PaymentSummaryProps) {

  const [price, setPrice] = React.useState<number>(0);
  const [commissionType, setCommissionType] = React.useState<string>('');
  const [commission, setCommission] = React.useState<number>(0);
  const [sellerTotal, setSellerTotal] = React.useState<number>();
  const [serviceFee, setServiceFee] = React.useState<number>();
  const [productList, setProductList] = React.useState<string[]>([]);
  const [isCalculating, setIsCalculating] = React.useState<boolean>(false);
  const [calculationSource, setCalculationSource] = React.useState<'from_amount' | 'from_total_amount' | null>(null);

  const { user } = useContext(AuthContext);


  const hasAltin = items?.find((item) => item.parity === 'ALTIN');

  const nav = useNavigate();

  const [total, setTotal] = React.useState<number>(0);

  useEffect(() => {
    setProductList([]);
  },[milyenOn])

  useEffect(() => {
    let total = 0;
    let productListData: string[] = [];
    if (milyenOn) {
      if (milyenValues) {
        const { totalWeight, milyenValue, feeRate, totalFeeRate, ayarMilyen } = milyenValues;
        if (totalWeight && milyenValue && ayarMilyen) {
          let purePrice = totalWeight * (ayarMilyen / 1000) * (hasAltin?.sellerPrice || 0);
          purePrice += purePrice * totalFeeRate / 100;
          productListData.push(`Saf Altın: ${formatMoney((hasAltin?.sellerPrice || 0).toFixed(2))} TL`);
          productListData.push(`Ürün Saflık TL Karşılığı: ${formatMoney(purePrice.toFixed(2))} TL`);
          let workPrice = totalWeight * (milyenValue) * (hasAltin?.sellerPrice || 0);
          productListData.push(`İşçilik TL Karşılığı: ${formatMoney(workPrice.toFixed(2))} TL`);
          workPrice += workPrice * feeRate / 100;
          total += purePrice + workPrice;
          setPrice(total);
          setProductList(productListData);
        }
      }
    } else {
      bucket.forEach((item) => {
        const product = items?.find((product) => product.parity === item.itemId);
        if (product) {
          total += product.sellerPrice * item.quantity;
          productListData.push(`${item.quantity} x ${product.parity} = ${formatMoney((product.sellerPrice * item.quantity).toFixed(2))} TL`);
        }
      })
      setPrice(total);
      setProductList(productListData);
    }
  }, [bucket, items, milyenOn, milyenValues])

  useEffect(() => {
    const calculate = async () => {
      if (sellerTotal !== undefined && !isCalculating && calculationSource === 'from_amount') {
        setIsCalculating(true);
        try {
          const response = await getCalculator(sellerTotal, 'from_amount');
          
          setServiceFee(response.commissionAmount);
          setTotal(response.totalAmount);
        } catch (error) {
          console.error('Hesaplama hatası:', error);
        } finally {
          setIsCalculating(false);
          setCalculationSource(null);
        }
      }
    }
    calculate();
  }, [sellerTotal, isCalculating, calculationSource])

  useEffect(() => {
    const calculate = async () => {
      if (total !== undefined && !isCalculating && calculationSource === 'from_total_amount') {
        setIsCalculating(true);
        try {
          const response = await getCalculator(total, 'from_total_amount');
          
          setServiceFee(response.commissionAmount);
          setSellerTotal(response.amount);
        } catch (error) {
          console.error('Hesaplama hatası:', error);
        } finally {
          setIsCalculating(false);
          setCalculationSource(null);
        }
      }
    }
    calculate();
  }, [total, isCalculating, calculationSource])

  useEffect(() => {
    if (commissionType) {
      if (commissionType === 'percent') {
        setCalculationSource('from_amount');
        setSellerTotal(price + (price * commission / 100));
      } else {
        setCalculationSource('from_amount');
        setSellerTotal(price + commission);
      }
    } else {
      setCalculationSource('from_amount');
      setSellerTotal(price);
    }
    if (price === 0) {
      setCommission(0);
      setCommissionType('');
    }
  }, [commission, commissionType, price])

  const handlePay = () => {
    const type = milyenOn ? 'milyen' : 'normal';
    //url encoded bucket
    const bucketText = encodeURIComponent(JSON.stringify(bucket));

    nav(`/seller/get-payment?price=${sellerTotal}&type=${type}&bucket=${bucketText}`);
  }

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
        placeholder='Hizmet Bedeli Cinsi'
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
            label='İlave Hizmet Bedeli'
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
            label='İlave Hizmet Bedeli'
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
          setPrice={(value) => {
            setCalculationSource('from_amount');
            setSellerTotal(value);
          }}
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
          Toplam Tutar
        </Typography>
        <PriceControl
          price={total || 0}
          setPrice={(value) => {
            setCalculationSource('from_total_amount');
            setTotal(value);
          }}
        />
      </Box>
      <Box>
        <CountDownProgress
          timeLeft={60}
          onFinished={() => {
            mutate(`${baseUrl}/data?w=123`);
            mutate(`${baseUrl}/data`);
            handleUpdateSummaryItems();
          }}
          label='İşlemi tamamlamak için kalan süre'
          repeat
        />
      </Box>
      <CommonButton
        onClick={() => { handlePay() }}
        color='white'
        label='Alışverişi Tamamla'
        icon={<ArrowForwardIos />}
      />
    </Paper>
  )
}
