import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import GetPaymentContainer from '../containers/GetPaymentContainer'
import CustomPaper from '../components/CustomPaper'
import CardInfo from '../components/CardInfo'
import { EleksePaymentRes, OzanPaymentRes, PaymentInput, PaywallPaymentRes } from '../utils/types'
import { Box, Typography } from '@mui/material'
import CommonButton from '../components/CommonButton'
import smalLogo from '../assets/images/small-logo.svg';
import { checkPaymentStatus, paymentCreate } from '../services/seller/SellerServices'
import { useAlert } from '../hooks/useAlert'
import IframeModal from '../components/IframeModal'
import { getLongUrl } from '../services/commonServices'
import { jwtDecode } from 'jwt-decode'

export default function ExternalPayment() {
  const { code } = useParams<{ code: string }>();
  const [price, setPrice] = useState(0);
  const showSnacbar = useAlert();
  const [ozanPaymentRes, setOzanPaymentRes] = useState<OzanPaymentRes>();
  const [eleksePaymentRes, setEleksePaymentRes] = useState<EleksePaymentRes>();
  const [paywallPaymentRes, setPaywallPaymentRes] = useState<PaywallPaymentRes>();
  const [iframe, setIframe] = useState<string>('');
  const [iframeOpen, setIframeOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [pos, setPos] = useState<string>('');
  const [token, setToken] = useState('');
  const [tokenData, setTokenData] = useState<any>();
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [product, setProduct] = useState<any>();

  const [cardInfo, setCardInfo] = useState<PaymentInput>({
    customerName: '',
    customerPhone: '',
    customerIdentity: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: '',
    cardAccountHolderName: '',
    isLink: true,
  });

  // const [cardInfo, setCardInfo] = useState<PaymentInput>({
  //   customerName: 'Mehmet Fatih BUÇAK',
  //   customerPhone: '5345649909',
  //   customerIdentity: '23635962680',
  //   cardNumber: '5269110246368999',
  //   cardExpiry: '08/2028',
  //   cardCvv: '987',
  //   cardAccountHolderName: 'Mehmet BUÇAK',
  //   isLink: true,
  // });

  useEffect(() => {
    const fetchData = async () => {
      if (!code) return;
      try {
        setLoading(true);
        const res = await getLongUrl(code);
        const paymentUrl = res.payment_url
        const token = paymentUrl.split('token=')[1];
        setToken(token);
        const decodedToken: any = jwtDecode(token);
        const price = decodedToken.amount / 100;
        const totalCost = price + (price * decodedToken.comission / 100);
        const productData = decodedToken.product;
        setProduct(productData);
        const pos = decodedToken.pos;
        setPos(pos);
        setPrice(price);
        setTotalPrice(totalCost);
        setTokenData(decodedToken);
      } catch (error) {
        showSnacbar('Ödeme oluşturulamadı', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [code])

  const startPolling = () => {
    const interval = setInterval(async () => {
      try {
        let body = {};
        if (pos === 'Ozan') {
          body = {
            referenceNo: ozanPaymentRes?.referenceNo,
            transactionId: ozanPaymentRes?.transactionId,
          }
        } else if (pos === 'Elekse') {
          body = {
            order_ref_number: eleksePaymentRes?.ORDER_REF_NUMBER,
          }
        } else if (pos === 'Paywall') {
          body = {
            merchantuniquecode: paywallPaymentRes?.merchantuniquecode,
          }
        }
        const res = await checkPaymentStatus(body, pos.toLowerCase(), token);
        if (pos === 'Ozan') {
          if (res.status !== 'WAITING') {
            clearInterval(interval);
            showSnacbar(`Ödeme ${res.message}`, res.status);
            if (res.status === 'APPROVED') {
              setIsSuccessful(true);
              showSnacbar('Ödeme başarı ile gerçeklwşti', 'success')
            } else {
              showSnacbar('Ödeme esnasında bir sorun oluştu', 'error')
            }
            setIframeOpen(false);
          }
        } else if (pos === 'Elekse') {
          if (res.STATUS !== 'PAYMENT_WAITING') {
            clearInterval(interval);
            showSnacbar(`Ödeme ${res.RETURN_MESSAGE}`, res.STATUS);
            if (res.STATUS === 'SUCCESS') {
              setIsSuccessful(true);
              showSnacbar('Ödeme başarı ile gerçekleşti', 'success')
            } else {
              showSnacbar('Ödeme esnasında bir sorun oluştu', 'error')
            }
            setIframeOpen(false);
          }
        } else if (pos === 'Paywall') {
          if (res.STATUS !== 'PAYMENT_WAITING') {
            clearInterval(interval);
            showSnacbar(`Ödeme ${res.RETURN_MESSAGE}`, res.STATUS);
            if (res.STATUS === 'SUCCESS') {
              setIsSuccessful(true);
              showSnacbar('Ödeme başarı ile gerçekleşti', 'success')
            } else {
              showSnacbar('Ödeme esnasında bir sorun oluştu', 'error')
            }
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

  const handleFinish = async () => {
    try {
      const res = await paymentCreate({
        ...cardInfo,
        product,
        amount: price * 100,
      },
        pos.toLowerCase(),
        token
      );
      if (pos === 'Ozan') {
        if (res.form3d) {
          setIframe(res.form3d);
          setOzanPaymentRes(res);
          setIframeOpen(true);
        }
      } else if (pos === 'Elekse') {
        if (res.URL_3DS) {
          setIframe(res.URL_3DS);
          setEleksePaymentRes(res);
          setIframeOpen(true);
        }
      } else if (pos === 'Paywall') {
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


  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 500
          }}
        >
          Yükleniyor...
        </Typography>
      </Box>
    )
  }

  if (isSuccessful) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <img
          src={smalLogo}
          alt="Big Logo"
          style={{
            width: 200,
            margin: '0px auto'
          }}
        />
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 500
          }}
        >
          Ödeme Başarılı
        </Typography>
      </Box>
    )
  }

  return (
    <Box
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <img
        src={smalLogo}
        alt="Big Logo"
        style={{
          width: 200,
          margin: '0px auto'
        }}
      />
      <Typography
        sx={{
          fontSize: 50,
          fontWeight: 600,
          textAlign: 'center',
          mt: 4
        }}
      >
        {totalPrice.toFixed(2)} TL Ödeme
      </Typography>
      <CustomPaper
        sx={{
          maxWidth: 700,
          mx: 'auto',
        }}
      >
        <CardInfo cardInfo={cardInfo} setCardInfo={setCardInfo} />
      </CustomPaper>
      <Box>
        <CommonButton
          label='Öde'
          onClick={() => { handleFinish() }}
          sx={{
            maxWidth: 200,
            mx: 'auto',
            mt: 2
          }}
        />
      </Box>
      <IframeModal open={iframeOpen} iframeUrl={iframe} onClose={() => setIframeOpen(false)} />
    </Box>
  )
}
