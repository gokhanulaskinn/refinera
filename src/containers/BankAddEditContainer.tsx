import { Box, Grid, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import CustomPaper from '../components/CustomPaper'
import SubmitFormDialog from '../components/SubmitFormDialog'
import { useNavigate } from 'react-router-dom'
import BankForm from '../components/BankForm'
import { createBank, getBank, updateBank } from '../services/commonServices'
import { AuthContext } from '../contexts/AuthProvider'
import { BankAccount } from '../utils/types'
import { useAlert } from '../hooks/useAlert'

type BankAddEditContainerProps = {
  id?: string
}

export default function BankAddEditContainer({ id }: BankAddEditContainerProps) {

  const [open, setOpen] = React.useState(false);
  const { user, role } = useContext(AuthContext);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [bank, setBank] = React.useState<BankAccount>();
  const showSnacbar = useAlert();
  const nav = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      if (id) {
        const res = await updateBank(id, values);
        showSnacbar('Banka başarıyla güncellendi!', 'success');
        nav(`/${role}/banks`)
      } else {
        if (role === 'seller') {
          const res = await createBank({
            ...values,
            jewelerId: user!.jewelerId,
            isMain: false,
          });
        } else if (role === 'supplier') {
          const res = await createBank({
            ...values,
            supplierId: user!.supplierId,
            isMain: false,
          });
        }
        setTitle('Banka Başarıyla Eklendi!');
        setContent('Banka ekleme işleminiz başarılı olmuştur. Bankayı liste sayfasından kontrol edebilirsiniz.');
        setIsSuccess(true);
        setOpen(true);
      }
    } catch (e) {
      if (id) {
        showSnacbar('Banka güncellenirken bir hata oluştu!', 'error');
      } else {
        setTitle('Banka Eklenirken Bir Hata Oluştu!');
        setContent('Banka eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        setIsSuccess(false);
        setOpen(true);
      }
      console.log(e);
    }
    console.log(values);
    // setOpen(true);
  }

  const fetchBank = async (id: string) => {
    try {
      const res = await getBank(id);
      setBank(res);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      fetchBank(id)
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
        Banka Ekle
      </Typography>
      <CustomPaper
        sx={{
          mt: 3
        }}
      >
        <BankForm
          onSubmit={handleSubmit}
          initialValues={bank}
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
