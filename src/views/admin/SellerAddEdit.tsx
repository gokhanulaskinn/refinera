import { Box } from '@mui/material'
import React from 'react'
import SellerAddEditContainer from '../../containers/SellerAddEditContainer'
import { useParams } from 'react-router-dom';

export default function SellerAddEdit() {

  const { id } = useParams();

  return (
    <Box>
      <SellerAddEditContainer
        id={id}
      />
    </Box>
  )
}
