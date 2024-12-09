import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import CustomPaper from '../components/CustomPaper'
import SubmitFormDialog from '../components/SubmitFormDialog'
import { useNavigate } from 'react-router-dom'
import SupplierForm from '../components/SupplierForm'

export default function SupplierAddEditContainer() {

  const [open, setOpen] = React.useState(false);
  const nav = useNavigate();
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');

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
        Toptancı Ekle
      </Typography>
      <CustomPaper
        sx={{
          mt: 3
        }}
      >
        <SupplierForm
          onSubmit={handleSubmit}
        />
      </CustomPaper>
      <SubmitFormDialog
        open={open}
        title={title}
        content={content}
        onClose={() => setOpen(false)}
        type='add'
        isSuccessful={isSuccessful}
        actionText1={isSuccessful ? 'Ana Sayfaya Dön' : 'Tekrar Dene'}
        actionText2='Listeyi Görüntüle'
        onAction1={() => isSuccessful ? nav('/') : setOpen(false)}
        onAction2={() => nav('/admin/suppliers')}
      />
    </Box>
  )
}
