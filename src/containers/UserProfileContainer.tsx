import { Box, Typography } from '@mui/material'
import useSWR from 'swr';
import { baseUrl, fetcher } from '../utils/global';
import { User } from '../utils/types';
import UserProfileForm from '../components/UserProfileForm';
import CustomPaper from '../components/CustomPaper';
import Loading from '../components/Loading';
import { updateUser } from '../services/commonServices';
import { useAlert } from '../hooks/useAlert';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import { changePassword } from '../services/AuthService';

export default function UserProfileContainer() {

  const showSnackBar = useAlert();
  const { user, setUser } = useContext(AuthContext);

  // const { data: user, isLoading, error } = useSWR<User>(
  //   `${baseUrl}/users/clyvqdyab0000o4o4veyx89la`,
  //   (url: string) => fetcher(url));


  const handleSubmit = async (values: any) => {
    try {
      if (user) {
        if (values.password && values.oldPassword) {
          const password = values.password;
          const oldPassword = values.oldPassword;
          const res = await changePassword(user.id, oldPassword, password);
          delete values.oldPassword;
          delete values.password;
        }

        const res = await updateUser(user.id, values);
        setUser && setUser(res);
        showSnackBar('Kullanıcı başarıyla güncellendi!', 'success');
      }
    } catch (error) {
      showSnackBar('Bir hata oluştu!', 'error');
    }
  }

  return (
    <Box>
      <Typography variant='h4'>Profili Düzenle</Typography>
      <CustomPaper>
        {user && (
          <UserProfileForm
            user={user}
            onSubmit={handleSubmit}
          />
        )}
      </CustomPaper>
    </Box>
  )
}
