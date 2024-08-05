import { Box, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomPaper from '../components/CustomPaper';
import CardInfo from '../components/CardInfo';
import PaymentFinish from '../components/PaymentFinish';
import SubmitFormDialog from '../components/SubmitFormDialog';
import { ConstantsType, PaymentInput, PaymentRes } from '../utils/types';
import { paymentCreate, checkPaymentStatus } from '../services/seller/SellerServices'; // checkPaymentStatus eklenmiş
import { useAlert } from '../hooks/useAlert';
import IframeModal from '../components/IframeModal';
import useSWR from 'swr';
import { baseUrl, fetcher } from '../utils/global';
import { AuthContext } from '../contexts/AuthProvider';

export default function GetPaymentContainer() {
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const [price, setPrice] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [iframeOpen, setIframeOpen] = useState<boolean>(false);
  const [comissionFee, setComissionFee] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [canFinish, setCanFinish] = useState(false);
  const [paymentRes, setPaymentRes] = useState<PaymentRes>();
  const [iframe, setIframe] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
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

  // const [cardInfo, setCardInfo] = useState<PaymentInput>({
  //   customerName: 'Mehmet Fatih BUÇAK',
  //   customerPhone: '5345649909',
  //   customerIdentity: '23635962680',
  //   cardNumber: '5269110246368999',
  //   cardExpiry: '08/2028',
  //   cardCvv: '987',
  //   cardAccountHolderName: 'Mehmet BUÇAK'
  // });

  const nav = useNavigate();

  const handleFinish = async () => {
    try {
      const res = await paymentCreate({
        ...cardInfo,
        amount: totalPrice * 100,
      });
      if (res.form3d) {
        setIframe(res.form3d);
        setPaymentRes(res);
        setIframeOpen(true);
      }
    } catch (error) {
      showSnacbar('Ödeme Başarısız', 'error');
    }
  };

  useEffect(() => {
    const price = parseFloat(searchParams.get('price') || '0');
    setPrice(price);
    const comissionFee = parseFloat((price * (user?.jeweler?.comissionRate || 0) / 100).toFixed(2));
    setComissionFee(comissionFee);
    const totalPrice = price + comissionFee;
    setTotalPrice(totalPrice);
  }, [searchParams]);

  useEffect(() => {
    if (
      cardInfo?.customerName &&
      cardInfo?.customerPhone &&
      cardInfo?.customerIdentity &&
      cardInfo?.cardNumber &&
      cardInfo?.cardExpiry &&
      cardInfo?.cardCvv &&
      cardInfo?.cardAccountHolderName
    ) {
      setCanFinish(true);
    } else {
      setCanFinish(false);
    }
  }, [cardInfo]);

  const startPolling = () => {
    const interval = setInterval(async () => {
      try {
        const res = await checkPaymentStatus({
          referenceNo: paymentRes?.referenceNo,
          transactionId: paymentRes?.transactionId,
        });
        if (res.status !== 'WAITING') {
          clearInterval(interval);
          showSnacbar(`Ödeme ${res.message}`, res.status);
          if (res.status === 'APPROVED') {
            setIsSuccessful(true);
            setTitle('Ödeme Başarılı');
            setContent('Ödemeniz başarıyla gerçekleşmiştir.');
          } else {
            setIsSuccessful(false);
            setTitle('Ödeme Başarısız');
            setContent(res.message);
          }
          setOpen(true);
          setIframeOpen(false);
        }
      } catch (error) {
        clearInterval(interval);
        showSnacbar('Durum sorgulamada hata', 'error');
      }
    }, 1000); // 1 saniyede bir durum sorgulama
  };

  useEffect(() => {
    if (iframe) {
      startPolling();
    }
  }, [iframe]);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 400,
          mb: 4,
        }}
      >
        Kart Bilgileri
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <CustomPaper>
            <CardInfo cardInfo={cardInfo} setCardInfo={setCardInfo} />
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
        title={title}
        content={content}
        onClose={() => console.log('kapat')}
        type="add"
        isSuccessful={isSuccessful}
        actionText1={isSuccessful ? 'Anasayfaya Dön' : 'Tekrar Dene'}
        actionText2="Ürünler"
        onAction1={() => isSuccessful ? nav('/seller') : setOpen(false)}
        onAction2={() => nav('/seller/products')}
      />
      <IframeModal open={iframeOpen} iframeUrl={iframe} onClose={() => setIframeOpen(false)} />
    </Box>
  );
}
