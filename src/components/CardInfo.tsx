import { Box, Grid, Typography, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import TextInput from './TextInput'
import CreditCardNumberInput from './CreditCardNumberInput'
import { PaymentInput } from '../utils/types'
import uploadIcon from '../assets/icons/document-upload.svg'
import MaskedCreditCardNumberInput from './MaskedCreditCardNumberInput'

type CardInfoProps = {
  cardInfo: PaymentInput;
  setCardInfo: (cardInfo: PaymentInput) => void;
  price: number;
  hasIdImages?: boolean;
  setHasIdImages?: (hasImages: boolean) => void;
}

export default function CardInfo({ cardInfo, setCardInfo, price, hasIdImages, setHasIdImages }: CardInfoProps) {
  const [frontIdPreview, setFrontIdPreview] = useState<string | null>(null);
  const [backIdPreview, setBackIdPreview] = useState<string | null>(null);
  const [isDraggingFront, setIsDraggingFront] = useState(false);
  const [isDraggingBack, setIsDraggingBack] = useState(false);
  
  useEffect(() => {
    if (setHasIdImages) {
      setHasIdImages(Boolean(frontIdPreview && backIdPreview));
    }
  }, [frontIdPreview, backIdPreview, setHasIdImages]);

  const handleFrontIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFrontIdPreview(reader.result as string);
        setCardInfo({ ...cardInfo, idCardFrontImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackIdPreview(reader.result as string);
        setCardInfo({ ...cardInfo, idCardBackImage: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>, type: 'front' | 'back') => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'front') {
          setFrontIdPreview(reader.result as string);
          setCardInfo({ ...cardInfo, idCardFrontImage: file });
          setIsDraggingFront(false);
        } else {
          setBackIdPreview(reader.result as string);
          setCardInfo({ ...cardInfo, idCardBackImage: file });
          setIsDraggingBack(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>, type: 'front' | 'back') => {
    event.preventDefault();
    event.stopPropagation();
    if (type === 'front') {
      setIsDraggingFront(true);
    } else {
      setIsDraggingBack(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>, type: 'front' | 'back') => {
    event.preventDefault();
    event.stopPropagation();

    // Eğer olay doğrudan bu öğeye aitse (alt öğelerden geldiğinde değil)
    if (event.currentTarget === event.target) {
      if (type === 'front') {
        setIsDraggingFront(false);
      } else {
        setIsDraggingBack(false);
      }
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  console.log(cardInfo)

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextInput
            label='İsim Soyisim'
            value={cardInfo.customerName}
            onChange={(e) => setCardInfo({ ...cardInfo, customerName: e.target.value })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12}>
          <TextInput
            label='Cep Numarası'
            value={cardInfo.customerPhone}
            onChange={(e) => setCardInfo({ ...cardInfo, customerPhone: e.target.value })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label='Kart Sahibi İsim Soyisim'
            value={cardInfo.cardAccountHolderName}
            onChange={(e) => setCardInfo({ ...cardInfo, cardAccountHolderName: e.target.value })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextInput
            label='Kart Sahibi TCKN / Pasaport Numarası'
            value={cardInfo.customerIdentity}
            onChange={(e) => setCardInfo({ ...cardInfo, customerIdentity: e.target.value })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12}>
          <MaskedCreditCardNumberInput  
            inputType='number'
            label="Kart Numarası"
            value={cardInfo.cardNumber}
            onChange={(e) => setCardInfo({ ...cardInfo, cardNumber: e.replaceAll(' ', '') })}
            backgroundColor='#F2F4F7'
          />

        </Grid>
        <Grid item xs={12} sm={6}>
          <MaskedCreditCardNumberInput
            label="Son Geçerlilik Tarihi"
            inputType='exp'
            value={cardInfo.cardExpiry}
            onChange={(e) => setCardInfo({ ...cardInfo, cardExpiry: e })}
            backgroundColor='#F2F4F7'
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <MaskedCreditCardNumberInput
            label="CVC / CVV"
            inputType='cvc'
            value={cardInfo.cardCvv}
            onChange={(e) => setCardInfo({ ...cardInfo, cardCvv: e })}
            backgroundColor='#F2F4F7'
          />
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ mt: 1, mb: 1, fontWeight: 500 }}>
            Kimlik Fotoğrafı ({price > 185000 ? 'Gerekli' : 'İsteğe Bağlı'})
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: isDraggingFront ? '2px solid #2E90FA' : '2px dashed #E4E7EC',
              borderRadius: 2,
              height: '180px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: isDraggingFront ? '#EFF8FF' : '#F2F4F7',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.2s ease-in-out'
            }}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, 'front')}
            onDragLeave={(e) => handleDragLeave(e, 'front')}
            onDrop={(e) => handleDrop(e, 'front')}
            onClick={() => document.getElementById('frontIdUpload')?.click()}
          >
            {frontIdPreview ? (
              <Box
                component="img"
                src={frontIdPreview}
                alt="Kimlik Ön Yüz"
                sx={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <Box sx={{ pointerEvents: 'none', textAlign: 'center' }}>
                <Box component="img" src={uploadIcon} alt="Upload" sx={{ width: 40, height: 40 }} />
                <Typography sx={{ color: '#667085', mt: 2 }}>Kimliğinizin ön yüzünü ekleyin</Typography>
                <Typography sx={{ color: '#667085', fontSize: '12px' }}>Sürükle bırak veya dosya seç</Typography>
              </Box>
            )}
            <input
              type="file"
              id="frontIdUpload"
              accept="image/*"
              onChange={handleFrontIdUpload}
              style={{ display: 'none' }}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box
            sx={{
              border: isDraggingBack ? '2px solid #2E90FA' : '2px dashed #E4E7EC',
              borderRadius: 2,
              height: '180px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              backgroundColor: isDraggingBack ? '#EFF8FF' : '#F2F4F7',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.2s ease-in-out'
            }}
            onDragOver={handleDragOver}
            onDragEnter={(e) => handleDragEnter(e, 'back')}
            onDragLeave={(e) => handleDragLeave(e, 'back')}
            onDrop={(e) => handleDrop(e, 'back')}
            onClick={() => document.getElementById('backIdUpload')?.click()}
          >
            {backIdPreview ? (
              <Box
                component="img"
                src={backIdPreview}
                alt="Kimlik Arka Yüz"
                sx={{
                  maxHeight: '100%',
                  maxWidth: '100%',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <Box sx={{ pointerEvents: 'none', textAlign: 'center' }}>
                <Box component="img" src={uploadIcon} alt="Upload" sx={{ width: 40, height: 40 }} />
                <Typography sx={{ color: '#667085', mt: 2 }}>Kimliğinizin arka yüzünü ekleyin</Typography>
                <Typography sx={{ color: '#667085', fontSize: '12px' }}>Sürükle bırak veya dosya seç</Typography>
              </Box>
            )}
            <input
              type="file"
              id="backIdUpload"
              accept="image/*"
              onChange={handleBackIdUpload}
              style={{ display: 'none' }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}
