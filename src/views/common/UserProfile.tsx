import { Box } from '@mui/material'
import React from 'react'
import UserProfileContainer from '../../containers/UserProfileContainer'
import useSWR from 'swr';
import { User } from '../../utils/types';
import { baseUrl, fetcher } from '../../utils/global';

export default function UserProfile() {

  return (
    <Box>
      <UserProfileContainer />
    </Box>
  )
}
