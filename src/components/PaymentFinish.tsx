import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import CommonButton from './CommonButton'
import { formatMoney } from '../utils/global';
import { useContext, useState } from 'react';
import { set } from 'lodash';
import TextInput from './TextInput';
import { useAlert } from '../hooks/useAlert';
import { createPaymentLink } from '../services/seller/SellerServices';
import { AuthContext } from '../contexts/AuthProvider';
import ShareLinkDialog from './ShareLinkDialog';
import CreditCardNumberInput from './CreditCardNumberInput';

type PaymentFinishProps = {
  handleFinish(): void;
  price: number;
  canFinish: boolean
  comissionFee: number;
  totalPrice: number;
}

export default function PaymentFinish({ handleFinish, price, canFinish, comissionFee, totalPrice }: PaymentFinishProps) {

  const comissionRate = 0.025;

  const { user } = useContext(AuthContext);

  const [shareLink, setShareLink] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [url, setUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const showSnacbar = useAlert();

  const handleShareLink = async () => {
    try {
      setLoading(true);
      const res = await createPaymentLink({
        amount: `${price * 100}`,
        email: user?.email,
        phone: `90${phoneNumber}`,
      }, user?.jeweler?.pos.name === 'Ozan' ? 'ozan' : 'elekse');
      const url = res.shortUrl;
      // const url = "https://refinera.com.tr/pay/DtJFjad1Ru";
      setUrl(url);
      setShareDialog(true);
    } catch (e) {
      showSnacbar('Bişeyler hata oluştu', 'error');
    } finally {
      setLoading(false);
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    showSnacbar('Link kopyalandı', 'success');
  }

  const handleShareWithWhatsapp = () => {

    //Aşağıdaki linki kullanarak ödemenizi tamamlayabilirsiniz. urlencoded olacak
    const text = `Aşağıdaki linki kullanarak ödemenizi tamamlayabilirsiniz. ${url}`;

    window.open(`https://wa.me/90${phoneNumber}?text=${encodeURI(text)}`, '_blank');
  }

  console.log(phoneNumber)

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: 'text.secondary'
          }}
        >
          Ücret
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 500
          }}
        >
          {formatMoney(price.toFixed(2))} TL
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: 'text.secondary'
          }}
        >
          Hizmet Bedeli
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 500
          }}
        >
          {formatMoney(comissionFee.toFixed(2))} TL
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            color: 'text.secondary',
            mt: 4
          }}
        >
          Toplam Ücret
        </Typography>
        <Typography
          sx={{
            fontSize: 42,
            fontWeight: 500
          }}
        >
          {formatMoney(totalPrice.toFixed(2))} TL
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mt: 4
        }}
      >
        <CommonButton
          label="Siparişi Tamamla"
          color='white'
          disabled={!canFinish}
          onClick={() => handleFinish()}
          icon={<ArrowForwardIos />}
        />
        <CommonButton
          label="Ödeme Linki Paylaş"
          color='white'
          onClick={() => { setShareLink(!shareLink) }}
          icon={<ArrowForwardIos />}
          sx={{
            background: '#9AA6A7'
          }}
        />
        {shareLink && (
          <Box>
            <CreditCardNumberInput
              label="Telefon Numarası"
              inputType='phone'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.replace(/[^0-9]/g, ''))}
              backgroundColor='#F2F4F7'
            />
            <CommonButton
              label="Paylaş"
              color='white'
              onClick={() => { handleShareLink() }}
              icon={<ArrowForwardIos />}
              sx={{
                background: '#9AA6A7',
                mt: 2
              }}
              loading={loading}
            />
          </Box>
        )}
      </Box>
      <ShareLinkDialog
        open={shareDialog}
        onClose={() => setShareDialog(false)}
        handleCopy={handleCopy}
        handleShareWithWhatsapp={handleShareWithWhatsapp}
      />
    </Box>
  )
}
