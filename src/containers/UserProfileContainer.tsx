import { Box, Typography } from '@mui/material'
import useSWR from 'swr';
import { baseUrl, fetcher } from '../utils/global';
import { User } from '../utils/types';
import UserProfileForm from '../components/UserProfileForm';
import CustomPaper from '../components/CustomPaper';
import Loading from '../components/Loading';

export default function UserProfileContainer() {

  const { data: user, isLoading, error } = useSWR<User>(
    `${baseUrl}/users/clyvqdyab0000o4o4veyx89la`,
    (url: string) => fetcher(url));


  const handleSubmit = async (values: User) => {
    console.log(values);
  }

  console.log(JSON.stringify(user));

  return (
    <Box>
      <Typography variant='h4'>Profili Düzenle</Typography>
      <CustomPaper>
        {
          isLoading && <Loading />
        }
        {!isLoading && user && (
          <UserProfileForm
            user={user}
            onSubmit={handleSubmit}
          />
        )}
      </CustomPaper>
    </Box>
  )
}
