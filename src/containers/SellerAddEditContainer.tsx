import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CustomPaper from '../components/CustomPaper'
import SellerForm from '../components/SellerForm'
import SubmitFormDialog from '../components/SubmitFormDialog'
import { useNavigate } from 'react-router-dom'
import { Jeweler, JewelerInput } from '../utils/types'
import { useAlert } from '../hooks/useAlert'
import { createJeweler, getJeweler, updateJeweler } from '../services/admin/AdminServices'

type SellerAddEditContainerProps = {
  id?: string
}

export default function SellerAddEditContainer({ id }: SellerAddEditContainerProps) {

  const [open, setOpen] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const nav = useNavigate();
  const showSnackbar = useAlert();
  const [jeweler, setJeweler] = React.useState<Jeweler>();

  const handleSubmit = async (values: JewelerInput) => {
    try {
      if (id) {
        delete values.accountHolder;
        delete values.bankName;
        delete values.iban;
        delete values.identity;
        delete values.firstName;
        delete values.lastName;
        const res = await updateJeweler(id, values);
        showSnackbar('Kuyumcu başarıyla güncellendi!', 'success');
        nav('/admin/jewelers');
      } else {
        const res = await createJeweler(values);
        setTitle('Kuyumcu Başarıyla Eklendi!');
        setContent('Kuyumcu ekleme işleminiz başarılı olmuştur. Kullanıcıyı liste sayfasından kontrol edebilirsiniz.');
        setOpen(true);
      }
    } catch (e) {
      if (id) {
        showSnackbar('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
      } else {
        setTitle('Kuyumcu Eklenirken Bir Hata Oluştu!');
        setContent('Kuyumcu eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        setOpen(true);
      }
      console.log(e);
    }
  }

  const fetchJeweler = async (id: string) => {
    try {
      const res = await getJeweler(id);
      setJeweler(res);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      fetchJeweler(id);
    }
  }, [id])

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
          initialValues={jeweler}
          isEdit={Boolean(id)}
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
