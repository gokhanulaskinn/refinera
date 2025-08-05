import { Box, Grid, Typography, Button, Stack, IconButton } from '@mui/material'
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import TextInput from './TextInput'
import { PaymentInput } from '../utils/types'
import uploadIcon from '../assets/icons/document-upload.svg'
import MaskedCreditCardNumberInput from './MaskedCreditCardNumberInput'
import CameraCapture from './CameraCapture'
import CameraAltIcon from '@mui/icons-material/CameraAlt'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

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
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cameraType, setCameraType] = useState<'front' | 'back'>('front');
  const [isHoveringFront, setIsHoveringFront] = useState(false);
  const [isHoveringBack, setIsHoveringBack] = useState(false);
  
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
        setCardInfo({ ...cardInfo, identityFront: file });
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
        setCardInfo({ ...cardInfo, identityBack: file });
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
          setCardInfo({ ...cardInfo, identityFront: file });
          setIsDraggingFront(false);
        } else {
          setBackIdPreview(reader.result as string);
          setCardInfo({ ...cardInfo, identityBack: file });
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

  // Kamera ile fotoğraf çekme fonksiyonları
  const handleCameraCapture = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (cameraType === 'front') {
        setFrontIdPreview(reader.result as string);
        setCardInfo({ ...cardInfo, identityFront: file });
      } else {
        setBackIdPreview(reader.result as string);
        setCardInfo({ ...cardInfo, identityBack: file });
      }
    };
    reader.readAsDataURL(file);
  };

  const openCamera = (type: 'front' | 'back') => {
    setCameraType(type);
    setCameraOpen(true);
  };

  // Fotoğraf kaldırma fonksiyonları
  const removeFrontPhoto = () => {
    setFrontIdPreview(null);
    setCardInfo({ ...cardInfo, identityFront: undefined });
  };

  const removeBackPhoto = () => {
    setBackIdPreview(null);
    setCardInfo({ ...cardInfo, identityBack: undefined });
  };

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
            onClick={() => !frontIdPreview && document.getElementById('frontIdUpload')?.click()}
            onMouseEnter={() => setIsHoveringFront(true)}
            onMouseLeave={() => setIsHoveringFront(false)}
          >
            {frontIdPreview ? (
              <>
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
                {/* Hover Overlay */}
                {isHoveringFront && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('frontIdUpload')?.click();
                      }}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#2E90FA',
                        '&:hover': {
                          backgroundColor: 'white'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFrontPhoto();
                      }}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#F04438',
                        '&:hover': {
                          backgroundColor: 'white'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ pointerEvents: 'none', textAlign: 'center' }}>
                <Box component="img" src={uploadIcon} alt="Upload" sx={{ width: 40, height: 40 }} />
                <Typography sx={{ color: '#667085', mt: 2 }}>Kimliğinizin ön yüzünü ekleyin</Typography>
                <Typography sx={{ color: '#667085', fontSize: '12px' }}>Sürükle bırak veya dosya seç</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2, pointerEvents: 'auto' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CameraAltIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      openCamera('front');
                    }}
                    sx={{
                      fontSize: '10px',
                      py: 0.5,
                      px: 1,
                      minWidth: 'auto',
                      borderColor: '#667085',
                      color: '#667085',
                      '&:hover': {
                        borderColor: '#2E90FA',
                        color: '#2E90FA'
                      }
                    }}
                  >
                    Kamera
                  </Button>
                </Stack>
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
            onClick={() => !backIdPreview && document.getElementById('backIdUpload')?.click()}
            onMouseEnter={() => setIsHoveringBack(true)}
            onMouseLeave={() => setIsHoveringBack(false)}
          >
            {backIdPreview ? (
              <>
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
                {/* Hover Overlay */}
                {isHoveringBack && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      gap: 1
                    }}
                  >
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        document.getElementById('backIdUpload')?.click();
                      }}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#2E90FA',
                        '&:hover': {
                          backgroundColor: 'white'
                        }
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        removeBackPhoto();
                      }}
                      sx={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: '#F04438',
                        '&:hover': {
                          backgroundColor: 'white'
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )}
              </>
            ) : (
              <Box sx={{ pointerEvents: 'none', textAlign: 'center' }}>
                <Box component="img" src={uploadIcon} alt="Upload" sx={{ width: 40, height: 40 }} />
                <Typography sx={{ color: '#667085', mt: 2 }}>Kimliğinizin arka yüzünü ekleyin</Typography>
                <Typography sx={{ color: '#667085', fontSize: '12px' }}>Sürükle bırak veya dosya seç</Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 2, pointerEvents: 'auto' }}>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<CameraAltIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      openCamera('back');
                    }}
                    sx={{
                      fontSize: '10px',
                      py: 0.5,
                      px: 1,
                      minWidth: 'auto',
                      borderColor: '#667085',
                      color: '#667085',
                      '&:hover': {
                        borderColor: '#2E90FA',
                        color: '#2E90FA'
                      }
                    }}
                  >
                    Kamera
                  </Button>
                </Stack>
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

      {/* Kamera Modal */}
      <CameraCapture
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCameraCapture}
        title={cameraType === 'front' ? 'Kimliğin Ön Yüzü' : 'Kimliğin Arka Yüzü'}
      />
    </Box>
  )
}
