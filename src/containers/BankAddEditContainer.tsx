import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CustomPaper from '../components/CustomPaper'
import SubmitFormDialog from '../components/SubmitFormDialog'
import { useNavigate } from 'react-router-dom'
import BankForm from '../components/BankForm'

export default function BankAddEditContainer() {

  const [open, setOpen] = React.useState(false);
  const nav = useNavigate();

  const handleSubmit = () => {
    setOpen(true);
  }

  return (
    <Box>
      <Typography
        sx={{
          fontSize: '30px',
          fontWeight: 400,
        }}
      >
        Banka Ekle
      </Typography>
      <CustomPaper
        sx={{
          mt: 3
        }}
      >
        <BankForm
          onSubmit={handleSubmit}
        />
      </CustomPaper>
      <SubmitFormDialog
        open={open}
        title='Banka Başarıyla Eklendi!'
        content='Banka ekleme işleminiz başarılı olmuştur. Bankayı liste sayfasından kontrol edebilirsiniz.'
        onClose={() => console.log('kapat')}
        type='add'
        isSuccessful={true}
        actionText1='Ana Sayfaya Dön'
        actionText2='Listeyi Görüntüle'
        onAction1={() => nav('/')}
        onAction2={() => nav('/admin/banks')}
      />
    </Box>
  )
}
