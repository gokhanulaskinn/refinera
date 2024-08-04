import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CustomPaper from '../components/CustomPaper'
import SellerForm from '../components/SellerForm'
import SubmitFormDialog from '../components/SubmitFormDialog'
import { useNavigate } from 'react-router-dom'
import { JewelerInput } from '../utils/types'
import { useAlert } from '../hooks/useAlert'
import { createJeweler } from '../services/admin/AdminServices'

export default function SellerAddEditContainer() {

  const [open, setOpen] = React.useState(false);
  const nav = useNavigate();
  const showSnackbar = useAlert();

  const handleSubmit = async (values: JewelerInput) => {
    try {
      const res = await createJeweler(values);
      showSnackbar('Kuyumcu başarıyla eklendi!', 'success');
    } catch (e) {
      showSnackbar('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
      console.log(e);
    }
  }

  return (
    <Box>
      <Typography
        sx={{
          fontSize: '30px',
          fontWeight: 400,
        }}
      >
        Kuyumcu Ekle
      </Typography>
      <CustomPaper
        sx={{
          mt: 3
        }}
      >
        <SellerForm
          onSubmit={handleSubmit}
        />
      </CustomPaper>
      <SubmitFormDialog
        open={open}
        title='Kuyumcu Başarıyla Eklendi!'
        content='Kuyumcu ekleme işleminiz başarılı olmuştur. Kullanıcıyı liste sayfasından kontrol edebilirsiniz.'
        onClose={() => console.log('kapat')}
        type='add'
        isSuccessful={true}
        actionText1='Ana Sayfaya Dön'
        actionText2='Listeyi Görüntüle'
        onAction1={() => nav('/')}
        onAction2={() => nav('/admin/jewelers')}
      />
    </Box>
  )
}
