import { ArrowForwardIos, Phone } from '@mui/icons-material';
import { Box, CircularProgress, Dialog, DialogContent, Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { useAlert } from '../hooks/useAlert';
import { createPaymentLink } from '../services/seller/SellerServices';
import { formatMoney } from '../utils/global';
import CommonButton from './CommonButton';
import CreditCardNumberInput from './CreditCardNumberInput';
import ShareLinkDialog from './ShareLinkDialog';
import { useLocation } from 'react-router-dom';
import { BucketType } from '../utils/types';
import PhoneInputArea from './PhoneInput';

type PaymentFinishProps = {
  handleFinish(): void;
  handlePhysicalPos(): void;
  price: number;
  canFinish: boolean;
  comissionFee: number;
  totalPrice: number;
  physicalPosLoading: boolean;
  physicalPosMessage?: string;
  physicalPosStatus?: string;
  hasIdImages?: boolean;
}

export default function PaymentFinish({
  handleFinish,
  handlePhysicalPos,
  physicalPosLoading,
  physicalPosMessage = 'İşlem devam ediyor...',
  physicalPosStatus = '',
  price,
  canFinish,
  comissionFee,
  totalPrice,
  hasIdImages
}: PaymentFinishProps) {

  const { user } = useContext(AuthContext);

  const [shareLink, setShareLink] = useState(false);
  const [shareDialog, setShareDialog] = useState(false);
  const [url, setUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const showSnacbar = useAlert();
  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);

  const handleShareLink = async () => {
    try {
      // Eğer fiyat 185000 TL'den fazlaysa ve kimlik fotoğrafları yüklenmemişse işlemi engelle
      if (price > 185000 && !hasIdImages) {
        showSnacbar('185.000 TL üzeri ödemelerde kimlik fotoğrafı yüklemek zorunludur', 'error');
        return;
      }
      
      setLoading(true);

      let product = {};
      const type = searchParams.get('type');
      const bucketData = JSON.parse(searchParams.get('bucket') || '[]') as BucketType[];
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
      const res = await createPaymentLink({
        amount: `${price * 100}`,
        email: user?.email,
        phone: `${phoneNumber}`,
        product,
      }, (user?.jeweler?.pos.name || '').toLowerCase());
      const url = res.shortUrl;
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
          label="Fiziksel Pos'a yönlendir"
          color='white'
          onClick={handlePhysicalPos}
          icon={<ArrowForwardIos />}
          sx={{
            background: '#6366F1'
          }}
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
            {/* <CreditCardNumberInput
              label="Telefon Numarası"
              inputType='phone'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.replace(/[^0-9]/g, ''))}
              backgroundColor='#F2F4F7'
            /> */}

            <PhoneInputArea
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
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

      {/* Fiziksel POS İşlemi için Dialog */}
      <Dialog
        open={physicalPosLoading}
        onClose={() => { }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: '16px',
            padding: '16px'
          }
        }}
      >
        <DialogContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              py: 4
            }}
          >
            <CircularProgress size={80} sx={{ color: '#6366F1' }} />
            <Typography
              sx={{
                mt: 3,
                fontWeight: 600,
                fontSize: '22px',
                color: '#333',
                textAlign: 'center'
              }}
            >
              Fiziksel POS İşlemi Bekleniyor
            </Typography>
            <Typography
              sx={{
                mt: 2,
                fontSize: '16px',
                color: physicalPosStatus === 'FAILED' ? '#d32f2f' : '#666',
                textAlign: 'center',
                maxWidth: '400px',
                fontWeight: physicalPosStatus === 'FAILED' ? 500 : 400
              }}
            >
              {physicalPosMessage}
            </Typography>
            <Box
              sx={{
                mt: 4,
                p: 3,
                backgroundColor: '#F8F9FA',
                borderRadius: '12px',
                width: '100%'
              }}
            >
              <Typography
                sx={{
                  fontSize: '16px',
                  fontWeight: 500,
                  color: '#333',
                  mb: 1
                }}
              >
                Ödeme Tutarı:
              </Typography>
              <Typography
                sx={{
                  fontSize: '24px',
                  fontWeight: 600,
                  color: '#6366F1'
                }}
              >
                {formatMoney(totalPrice.toFixed(2))} TL
              </Typography>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  )
}
