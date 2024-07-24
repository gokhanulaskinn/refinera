import { Box, Grid, Typography } from '@mui/material';
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import CustomPaper from '../components/CustomPaper';
import CardInfo from '../components/CardInfo';
import PaymentFinish from '../components/PaymentFinish';
import SubmitFormDialog from '../components/SubmitFormDialog';

export default function GetPaymentContainer() {

  const loc = useLocation();
  const searchParams = new URLSearchParams(loc.search);
  const [price, setPrice] = React.useState<number>(0);
  const [open, setOpen] = React.useState<boolean>(false);
  const nav = useNavigate();

  const handleFinish = () => {
    setOpen(true);
  }

  React.useEffect(() => {
    setPrice(parseFloat(searchParams.get('price') || '0'));
  }, [searchParams]);

  return (
    <Box>
      <Typography
        sx={{
          fontSize: 30,
          fontWeight: 400,
          mb: 4
        }}
      >
        Kart Bilgileri
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <CustomPaper>
            <CardInfo />
          </CustomPaper>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <CustomPaper>
            <PaymentFinish handleFinish={handleFinish} />
          </CustomPaper>
        </Grid>
      </Grid>
      <SubmitFormDialog
        open={open}
        title='İşlem Başarılı'
        content='İşleminiz başarıyla gerçekleşmiştir.'
        onClose={() => console.log('kapat')}
        type='add'
        isSuccessful={true}
        actionText1='Ana Sayfaya Dön'
        actionText2='Ürünler'
        onAction1={() => nav('/seller')}
        onAction2={() => nav('/seller/suppliers')}
      />
    </Box>
  )
}
