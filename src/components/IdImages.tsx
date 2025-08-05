import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  IconButton,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface IdImagesProps {
  open: boolean;
  onClose: () => void;
  identityPhoto?: string;
  identityPhotoBack?: string;
  customerName?: string;
}

export default function IdImages({ 
  open, 
  onClose, 
  identityPhoto, 
  identityPhotoBack, 
  customerName 
}: IdImagesProps) {
  
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.style.display = 'none';
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          minHeight: 400
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: 1,
          borderColor: 'divider',
          pb: 2
        }}
      >
        <Typography variant="h6" component="div" fontWeight={600}>
          Kimlik Belgeleri
          {customerName && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              {customerName}
            </Typography>
          )}
        </Typography>
        <IconButton
          onClick={onClose}
          sx={{
            color: 'grey.500',
            '&:hover': {
              backgroundColor: 'grey.100'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <DialogContent sx={{ pt: 3 }}>
        <Grid container spacing={3}>
          {/* Ön Yüz */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                minHeight: 300,
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                '&:hover': {
                  boxShadow: 3
                },
                transition: 'box-shadow 0.2s ease-in-out'
              }}
            >
              <CardContent sx={{ p: 2, pb: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600}
                  color="primary.main"
                  sx={{ mb: 2 }}
                >
                  Ön Yüz
                </Typography>
              </CardContent>
              
              {identityPhoto ? (
                <CardMedia
                  component="img"
                  image={identityPhoto}
                  alt="Kimlik Ön Yüz"
                  onError={handleImageError}
                  sx={{
                    width: '100%',
                    height: 250,
                    objectFit: 'contain',
                    backgroundColor: 'grey.50',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.9
                    }
                  }}
                  onClick={() => window.open(identityPhoto, '_blank')}
                />
              ) : (
                <Box
                  sx={{
                    height: 250,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey.100',
                    color: 'grey.500',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  <Typography variant="body2">
                    Ön yüz fotoğrafı bulunamadı
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>

          {/* Arka Yüz */}
          <Grid item xs={12} md={6}>
            <Card 
              sx={{ 
                height: '100%',
                minHeight: 300,
                border: 1,
                borderColor: 'divider',
                borderRadius: 2,
                '&:hover': {
                  boxShadow: 3
                },
                transition: 'box-shadow 0.2s ease-in-out'
              }}
            >
              <CardContent sx={{ p: 2, pb: 1 }}>
                <Typography 
                  variant="subtitle1" 
                  fontWeight={600}
                  color="primary.main"
                  sx={{ mb: 2 }}
                >
                  Arka Yüz
                </Typography>
              </CardContent>
              
              {identityPhotoBack ? (
                <CardMedia
                  component="img"
                  image={identityPhotoBack}
                  alt="Kimlik Arka Yüz"
                  onError={handleImageError}
                  sx={{
                    width: '100%',
                    height: 250,
                    objectFit: 'contain',
                    backgroundColor: 'grey.50',
                    cursor: 'pointer',
                    '&:hover': {
                      opacity: 0.9
                    }
                  }}
                  onClick={() => window.open(identityPhotoBack, '_blank')}
                />
              ) : (
                <Box
                  sx={{
                    height: 250,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'grey.100',
                    color: 'grey.500',
                    flexDirection: 'column',
                    gap: 1
                  }}
                >
                  <Typography variant="body2">
                    Arka yüz fotoğrafı bulunamadı
                  </Typography>
                </Box>
              )}
            </Card>
          </Grid>
        </Grid>

        {(!identityPhoto && !identityPhotoBack) && (
          <Box
            sx={{
              mt: 3,
              p: 3,
              backgroundColor: 'warning.50',
              border: 1,
              borderColor: 'warning.200',
              borderRadius: 2,
              textAlign: 'center'
            }}
          >
            <Typography variant="body1" color="warning.600">
              Bu işlem için kimlik belgesi yüklenmemiş
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
}