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
  
  // Ödeme bilgilerini location state'inden al
  const paymentInfo = location.state || {};
  const { uniqueCode, paymentId } = paymentInfo;



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
            variant="contained" 
            color="error"
            size="large"
            fullWidth
            onClick={() => {
              navigate(-2); // Ödeme sayfasına geri dön
            }}
            sx={{ 
              borderRadius: 2,
              py: 1.5
            }}
          >
            Tekrar Dene
          </Button>
          
          <Button 
            variant="outlined" 
            color="primary"
            size="large"
            fullWidth
            onClick={() => {
              const userType = localStorage.getItem('userType');
              const homePath = userType === 'seller' ? '/seller/get-payment' : '/';
              navigate(homePath);
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