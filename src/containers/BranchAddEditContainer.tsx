import { Box, Typography } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BranchForm from '../components/BranchForm'
import CustomPaper from '../components/CustomPaper'
import SubmitFormDialog from '../components/SubmitFormDialog'
import { useAlert } from '../hooks/useAlert'
import { createBranch, getBranch, updateBranch } from '../services/seller/SellerServices'
import { Branch, BranchInput } from '../utils/types'
import { AuthContext } from '../contexts/AuthProvider'

type BranchAddEditContainerProps = {
  id?: string
}

export default function BranchAddEditContainer({ id }: BranchAddEditContainerProps) {

  const [open, setOpen] = React.useState(false);
  const [isSuccessful, setIsSuccessful] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const nav = useNavigate();
  const showSnackbar = useAlert();
  const [branch, setBranch] = React.useState<Branch>();
  const { user } = useContext(AuthContext);

  const handleSubmit = async (values: BranchInput) => {
    try {
      if (id) {
        const res = await updateBranch(id, values);
        showSnackbar('Mağaza başarıyla güncellendi!', 'success');
        nav('/seller/branches');
      } else {
        const res = await createBranch({
          ...values,
          isMain: false,
          status: 'ACTIVE',
          jewelerId: user?.jewelerId
        });
        setTitle('Mağaza Başarıyla Eklendi!');
        setContent('Mağaza ekleme işleminiz başarılı olmuştur. Mağazayı liste sayfasından kontrol edebilirsiniz.');
        setOpen(true);
      }
    } catch (e) {
      if (id) {
        showSnackbar('Bir hata oluştu. Lütfen tekrar deneyin.', 'error');
      } else {
        setTitle('Mağaza Eklenirken Bir Hata Oluştu!');
        setContent('Mağaza eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
        setOpen(true);
      }
      console.log(e);
    }
  }

  const fetchBranch = async (id: string) => {
    try {
      const res = await getBranch(id);
      setBranch(res);
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (id) {
      fetchBranch(id);
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
        Mağaza Ekle
      </Typography>
      <CustomPaper
        sx={{
          mt: 3
        }}
      >
        <BranchForm
          onSubmit={handleSubmit}
          initialValues={branch}
        />
      </CustomPaper>
      <SubmitFormDialog
        open={open}
        title={title}
        content={content}
        onClose={() => { setOpen(false) }}
        type='add'
        isSuccessful={isSuccessful}
        actionText1='Ana Sayfaya Dön'
        actionText2='Listeyi Görüntüle'
        onAction1={() => nav('/seller')}
        onAction2={() => nav('/seller/branches')}
      />
    </Box>
  )
}
