import { Error } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography
} from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentFailedPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Geri sayım başlat ve bitince ana sayfaya yönlendir
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    if (countdown === 0) {
      navigate('/seller');
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }
    , [countdown, navigate]);

  // Ödeme bilgilerini location state'inden al
  const paymentInfo = location.state || {};
  const { uniqueCode, paymentId, bankErrorMessage, posErrorMessage } = paymentInfo;

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: 2
        }}
      >
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Error
            sx={{
              fontSize: 80,
              color: red[500],
              mb: 2
            }}
          />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Ödeme Başarısız!
          </Typography>
          {bankErrorMessage && (
            <Typography variant="body2" color="error">
              <strong> {bankErrorMessage}</strong>
            </Typography>
          )}
          
        </Box>

        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Ödeme işleminiz sırasında bir sorun oluştu. Lütfen daha sonra tekrar deneyiniz veya farklı bir ödeme yöntemi kullanınız.
        </Typography>

        <Divider sx={{ width: '100%', mb: 3 }} />

        {uniqueCode && (
          <Box sx={{ width: '100%', mb: 1 }}>
            <Typography variant="body2">
              <strong>İşlem Kodu:</strong> {uniqueCode}
            </Typography>
          </Box>
        )}

        {paymentId && (
          <Box sx={{ width: '100%', mb: 3 }}>
            <Typography variant="body2">
              <strong>Ödeme ID:</strong> {paymentId}
            </Typography>
          </Box>
        )}

        {bankErrorMessage && (
          <Box sx={{ width: '100%', mb: 3 }}>
            <Typography variant="body2">
              <strong>Banka Hata:</strong> {bankErrorMessage}
            </Typography>
          </Box>
        )}

        {posErrorMessage && (
          <Box sx={{ width: '100%', mb: 3 }}>
            <Typography variant="body2">
              <strong>Pos Hata:</strong> {posErrorMessage}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <CircularProgress
            variant="determinate"
            value={(countdown / 5) * 100}
            size={24}
            sx={{ mr: 1, color: red[500] }}
          />
          <Typography variant="body2" color="text.secondary">
            {countdown} saniye içinde ana sayfaya yönlendirileceksiniz.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Button
            variant="outlined"
            color="primary"
            size="large"
            fullWidth
            onClick={() => {
              navigate('/seller');
            }}
            sx={{
              borderRadius: 2,
              py: 1.5
            }}
          >
            Ana Sayfaya Dön
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default PaymentFailedPage; 