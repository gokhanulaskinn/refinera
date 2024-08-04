import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CustomPaper from '../components/CustomPaper';
import CardInfo from '../components/CardInfo';
import PaymentFinish from '../components/PaymentFinish';
import SubmitFormDialog from '../components/SubmitFormDialog';
import { PaymentInput } from '../utils/types';
import { paymentCreate } from '../services/seller/SellerServices';
import { useAlert } from '../hooks/useAlert';

export default function GetPaymentContainer() {

  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const [price, setPrice] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const [comissionFee, setComissionFee] = React.useState<number>(0);
  const [totalPrice, setTotalPrice] = React.useState<number>(0);
  const [canFinish, setCanFinish] = useState(false);
  const showSnacbar = useAlert();

  const [cardInfo, setCardInfo] = useState<PaymentInput>({
    customerName: '',
    customerPhone: '',
    customerIdentity: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardAccountHolderName: ''
  });
  const nav = useNavigate();

  const handleFinish = async () => {
    try {
      const res = await paymentCreate({
        ...cardInfo,
        amount: totalPrice * 100
      });
    } catch (error) {
      showSnacbar('Ödeme Başarısız', 'error');
    }
    // setOpen(true);
  }

  React.useEffect(() => {
    const price = parseFloat(searchParams.get('price') || '0');
    setPrice(price);
    //comissionfee have to be 2.5% of price and 2 digit after comma
    const comissionFee = parseFloat((price * 0.025).toFixed(2));
    setComissionFee(comissionFee);
    //total price have to be price + comission fee
    const totalPrice = price + comissionFee;
    setTotalPrice(totalPrice);
  }, [searchParams]);

  useEffect(() => {
    //check all field and if any field empty setcanfinisj false else true
    if (cardInfo.customerName && cardInfo.customerPhone && cardInfo.customerIdentity && cardInfo.cardNumber && cardInfo.cardExpiry && cardInfo.cardCvv && cardInfo.cardAccountHolderName) {
      setCanFinish(true);
    } else {
      setCanFinish(false);
    }
  }, [cardInfo])

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 400,
          mb: 4
        }}
      >
        Kart Bilgileri
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <CustomPaper>
            <CardInfo
              cardInfo={cardInfo}
              setCardInfo={setCardInfo}
            />
          </CustomPaper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CustomPaper>
            <PaymentFinish
              price={price}
              canFinish={canFinish}
              totalPrice={totalPrice}
              comissionFee={comissionFee}
              handleFinish={handleFinish}
            />
          </CustomPaper>
        </Grid>
      </Grid>
      <SubmitFormDialog
        open={open}
        title='İşlem Başarılı'
        content='İşleminiz başarıyla gerçekleşmiştir.'
        onClose={() => console.log('kapat')}
        type='add'
        isSuccessful={true}
        actionText1='Ana Sayfaya Dön'
        actionText2='Ürünler'
        onAction1={() => nav('/seller')}
        onAction2={() => nav('/seller/suppliers')}
      />
    </Box>
  )
}
