import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentLinkCallbackPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const result = params.get('Result');
    const uniqueCode = params.get('UniqueCode');
    const paymentId = params.get('PaymentId');
    

    setTimeout(() => {
      if (result?.toLowerCase() === 'success') {

        navigate('/payment/link/success', { 
          state: { 
            uniqueCode, 
            paymentId,
            callbackData: location.search 
          } 
        });
      } else {
        navigate('/payment/link/failed', { 
          state: { 
            uniqueCode, 
            paymentId,
            callbackData: location.search 
          } 
        });
      }
    }, 1000);
  }, [location, navigate]);

  return (
    <div className="payment-callback-container">
      <div className="payment-callback-message">
      Ödeme işlemi sonuçlandırılıyor...
      </div>
    </div>
  );
};

export default PaymentLinkCallbackPage; 