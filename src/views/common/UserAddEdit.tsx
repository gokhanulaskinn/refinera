import { Box } from '@mui/material'
import React from 'react'
import UserAddEditContainer from '../../containers/UserAddEditContainer'
import { useParams } from 'react-router-dom';

export default function UserAddEdit() {

  const { id } = useParams();

  return (
    <Box>
      <UserAddEditContainer 
        id={id}
      />
    </Box>
  )
}
