import { Box } from '@mui/material'
import React from 'react'
import BankAddEditContainer from '../../containers/BankAddEditContainer'
import { useParams } from 'react-router-dom';

export default function BankAddEdit() {

  const { id } = useParams();

  return (
    <Box>
      <BankAddEditContainer
        id={id}
      />
    </Box>
  )
}
