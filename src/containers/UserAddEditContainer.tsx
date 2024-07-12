import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CustomPaper from '../components/CustomPaper'
import SubmitFormDialog from '../components/SubmitFormDialog'
import { useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'

export default function UserAddEditContainer() {

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
        Kullanıcı Ekle
      </Typography>
      <CustomPaper
        sx={{
          mt: 3
        }}
      >
        <UserForm
          onSubmit={handleSubmit}
        />
      </CustomPaper>
      <SubmitFormDialog
        open={open}
        title='Kullanıcı Başarıyla Eklendi!'
        content='Kullanıcı ekleme işleminiz başarılı olmuştur. Kullanıcıyı liste sayfasından kontrol edebilirsiniz.'
        onClose={() => console.log('kapat')}
        type='add'
        isSuccessful={true}
        actionText1='Ana Sayfaya Dön'
        actionText2='Listeyi Görüntüle'
        onAction1={() => nav('/')}
        onAction2={() => nav('/admin/users')}
      />
    </Box>
  )
}
