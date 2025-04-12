import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentCallbackPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const result = params.get('Result');
    const uniqueCode = params.get('UniqueCode');
    const paymentId = params.get('PaymentId');
    const bankErrorMessage = params.get('providerBankErrorMessage');
    const posErrorMessage = params.get('providerErrorMessage');

    setTimeout(() => {
      if (result?.toLowerCase() === 'success') {

        navigate('/seller/get-payment/payment-success', { 
          state: { 
            uniqueCode, 
            paymentId,
            callbackData: location.search 
          } 
        });
      } else {
        navigate('/seller/get-payment/payment-failed', { 
          state: { 
            uniqueCode, 
            paymentId,
            bankErrorMessage,
            posErrorMessage,
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

export default PaymentCallbackPage; 