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
        await updateBank(id, values);
        showSnacbar('Banka başarıyla güncellendi!', 'success');
        nav(`/${role}/banks`);
      } else {
        const bankData = {
          ...values,
          isMain: false,
          ...(role === 'seller' ? { jewelerId: user!.jewelerId } : { supplierId: user!.supplierId })
        };
        await createBank(bankData);
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
      console.error(e);
    }
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
        {id ? 'Banka Düzenle' : 'Banka Ekle'}
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
        title={title}
        content={content}
        onClose={() => setOpen(false)}
        type={id ? 'edit' : 'add'}
        isSuccessful={isSuccess}
        actionText1={isSuccess ? 'Ana Sayfaya Dön' : 'Tekrar Dene'}
        actionText2='Listeyi Görüntüle'
        onAction1={() => isSuccess ? nav('/') : setOpen(false)}
        onAction2={() => nav(`/${role}/banks`)}
      />
    </Box>
  )
}
