import { Box, Grid, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CustomPaper from '../components/CustomPaper'
import SubmitFormDialog from '../components/SubmitFormDialog'
import { useNavigate } from 'react-router-dom'
import UserForm from '../components/UserForm'
import { AuthContext } from '../contexts/AuthProvider'
import { User, UserRole } from '../utils/types'
import { createUser, getUser, updateUser } from '../services/commonServices'
import { useAlert } from '../hooks/useAlert'

type UserAddEditContainerProps = {
  id?: string
}

export default function UserAddEditContainer({ id }: UserAddEditContainerProps) {

  const [open, setOpen] = React.useState(false);
  const { role, user, token } = React.useContext(AuthContext);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [values, setValues] = React.useState<User>();
  const showSnackBar = useAlert();
  const nav = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      if (id) {
        const res = await updateUser(id, values);
        showSnackBar('Kullanıcı başarıyla güncellendi!', 'success');
        nav(`/${role}/users`)
      } else {
        if (role === 'admin') {
          const res = await createUser({
            ...values,
            role: UserRole.SUPERADMIN_EMPLOYEE,
            password: '123456'
          });
        } else if (role === 'seller') {
          const res = await createUser({
            ...values,
            role: UserRole.JEWELER_EMPLOYEE,
            password: '123456',
            jeweler: {
              connect: {
                id: user!.jewelerId // Burada jewelerId ile var olan bir Jeweler kaydına bağlanıyoruz.
              }
            }
          });
        } else if (role === 'supplier') {
          const res = await createUser({
            ...values,
            supplierId: user!.supplierId,
            role: UserRole.SUPPLIER_EMPLOYEE,
            password: '123456'
          });
        }
        setIsSuccess(true);
        setTitle('Kullanıcı Başarıyla Eklendi!');
        setContent('Kullanıcı ekleme işleminiz başarılı olmuştur. Kullanıcıyı liste sayfasından kontrol edebilirsiniz.')
        setOpen(true);
      }
    } catch (e) {
      if (id) {
        showSnackBar('Kullanıcı güncellenirken bir hata oluştu!', 'error');
      } else {
        setIsSuccess(false);
        setTitle('Kullanıcı Eklenirken Bir Hata Oluştu!');
        setContent('Kullanıcı eklenirken bir hata oluştu. Lütfen tekrar deneyiniz.')
        setOpen(true);
      }
      console.log(e)
    }
    // setOpen(true);
  }

  const fetchUser = async (id: string) => {
    try {
      const res = await getUser(token, id);
      setValues(res);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    if (id) {
      fetchUser(id)
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
        Kullanıcı Ekle
      </Typography>
      <CustomPaper
        sx={{
          mt: 3
        }}
      >
        <UserForm
          onSubmit={handleSubmit}
          initialValues={values}
        />
      </CustomPaper>
      <SubmitFormDialog
        open={open}
        title={title}
        content={content}
        onClose={() => setOpen(false)}
        type='add'
        isSuccessful={isSuccess}
        actionText1= {isSuccess ? 'Anasayfaya Dön' : 'Tekrar Dene'}
        actionText2='Listeyi Görüntüle'
        onAction1={() => isSuccess ? nav(`/${role}`) : setOpen(false)}
        onAction2={() => nav(`/${role}/users`)}
      />
    </Box>
  )
}
