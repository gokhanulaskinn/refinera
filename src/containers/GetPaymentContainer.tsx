import { Box, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CardInfo from '../components/CardInfo';
import CustomPaper from '../components/CustomPaper';
import IframeModal from '../components/IframeModal';
import PaymentFinish from '../components/PaymentFinish';
import SubmitFormDialog from '../components/SubmitFormDialog';
import { AuthContext } from '../contexts/AuthProvider';
import { useAlert } from '../hooks/useAlert';
import { checkPaymentStatus, paymentCreate } from '../services/seller/SellerServices'; // checkPaymentStatus eklenmiş
import { BucketType, EleksePaymentRes, OzanPaymentRes, PaymentInput, PaywallPaymentRes } from '../utils/types';

export default function GetPaymentContainer() {
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const [price, setPrice] = useState<number>(0);
  const [type, setType] = useState<string>('');
  const [bucketData, setBucketData] = useState<BucketType[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [iframeOpen, setIframeOpen] = useState<boolean>(false);
  const [comissionFee, setComissionFee] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [canFinish, setCanFinish] = useState(false);
  const [ozanPaymentRes, setOzanPaymentRes] = useState<OzanPaymentRes>();
  const [eleksePaymentRes, setEleksePaymentRes] = useState<EleksePaymentRes>();
  const [paywallPaymentRes, setPaywallPaymentRes] = useState<PaywallPaymentRes>();
  const [iframe, setIframe] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const { user } = useContext(AuthContext);
  const posProvider = user?.jeweler?.pos?.name;
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
  //   cardNumber: '5528790000000008',
  //   cardExpiry: '12/2030',
  //   cardCvv: '123',
  //   cardAccountHolderName: 'Mehmet BUÇAK'
  // });

  const nav = useNavigate();

  const handleFinish = async () => {
    try {
      let product = {};
      const type = searchParams.get('type');
      const bucketData = JSON.parse(searchParams.get('bucket') || '[]') as BucketType[];
      console.log(type)
      if (type === 'normal') {
        product = bucketData.map((item: any) => ({
          name: item.itemId,
          quantity: item.quantity
        }));
      } else {
        product = {
          name: type,
          quantity: 1
        }
      }
      const res = await paymentCreate({
        ...cardInfo,
        product,
        amount: price * 100,
      },
        (posProvider || '').toLowerCase()
      );
      if (user?.jeweler?.pos.name === 'Ozan') {
        if (res.form3d) {
          setIframe(res.form3d);
          setOzanPaymentRes(res);
          setIframeOpen(true);
        }
      } else if (user?.jeweler?.pos.name === 'Elekse') {
        if (res.URL_3DS) {
          setIframe(res.URL_3DS);
          setEleksePaymentRes(res);
          setIframeOpen(true);
        }
      } else if (user?.jeweler?.pos.name === 'Paywall') {
        if (res?.Body?.RedirectUrl) {
          let redirectUrl = res?.Body?.RedirectUrl;
          
          window.location.href = redirectUrl;
          
          setPaywallPaymentRes({
            redirectUrl: res?.Body?.RedirectUrl,
            merchantuniquecode: res?.Body?.Payment?.MerchantUniqueKey,
          });
        }
      }
    } catch (error) {
      showSnacbar('Ödeme Başarısız', 'error');
    }
  };

  useEffect(() => {
    const price = parseFloat(searchParams.get('price') || '0');
    setPrice(price);
    const comissionFee = parseFloat((price * (user?.jeweler?.pos?.rate || 0) / 100).toFixed(2));
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
        let body = {};
        if (user?.jeweler?.pos.name === 'Ozan') {
          body = {
            referenceNo: ozanPaymentRes?.referenceNo,
            transactionId: ozanPaymentRes?.transactionId,
          }
        } else if (user?.jeweler?.pos.name === 'Elekse') {
          body = {
            order_ref_number: eleksePaymentRes?.ORDER_REF_NUMBER,
          }
        } else if (user?.jeweler?.pos.name === 'Paywall') {
          body = {
            merchantuniquecode: paywallPaymentRes?.merchantuniquecode,
          }
        }
        const res = await checkPaymentStatus(
          body,
          (posProvider || '').toLowerCase());
        if (posProvider === 'Ozan') {
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
        } else if (posProvider === 'Elekse') {
          if (res.STATUS !== 'PAYMENT_WAITING') {
            clearInterval(interval);
            showSnacbar(`Ödeme ${res.RETURN_MESSAGE}`, res.STATUS);
            if (res.STATUS === 'SUCCESS') {
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
        } else if (posProvider === 'Paywall') {
          if (res.STATUS !== 'PAYMENT_WAITING') {
            clearInterval(interval);
            showSnacbar(`Ödeme ${res.RETURN_MESSAGE}`, res.STATUS);
            if (res.STATUS === 'SUCCESS') {
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
        }
      } catch (error) {
        clearInterval(interval);
        showSnacbar('Durum sorgulamada hata', 'error');
      }
    }, 3000); // 1 saniyede bir durum sorgulama
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
        onAction2={() => nav('/seller')}
      />
      <IframeModal open={iframeOpen} iframeUrl={iframe} onClose={() => setIframeOpen(false)} />
    </Box>
  );
}
