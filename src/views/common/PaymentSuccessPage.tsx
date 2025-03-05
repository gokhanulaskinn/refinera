import { CheckCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Paper,
  Typography
} from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccessPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  
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
          <CheckCircle 
            sx={{ 
              fontSize: 80, 
              color: green[500],
              mb: 2
            }} 
          />
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Ödeme Başarılı!
          </Typography>
        </Box>
        
        <Typography variant="body1" align="center" sx={{ mb: 3 }}>
          Ödemeniz başarıyla gerçekleştirildi. Teşekkür ederiz.
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
            value={(countdown / 10) * 100}
            size={24} 
            sx={{ mr: 1, color: green[500] }} 
          />
          <Typography variant="body2" color="text.secondary">
            {countdown} saniye içinde ana sayfaya yönlendirileceksiniz.
          </Typography>
        </Box>
        
        <Button 
          variant="contained" 
          color="primary"
          size="large"
          fullWidth
          onClick={() => {
            const userType = localStorage.getItem('userType');
            const homePath = userType === 'seller' ? '/seller' : '/';
            navigate(homePath);
          }}
          sx={{ 
            borderRadius: 2,
            py: 1.5
          }}
        >
          Ana Sayfaya Dön
        </Button>
      </Paper>
    </Container>
  );
};

export default PaymentSuccessPage; 