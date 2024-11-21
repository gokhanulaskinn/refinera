import { Box } from '@mui/material'
import React from 'react'
import BranchAddEditContainer from '../../containers/BranchAddEditContainer'
import { useParams } from 'react-router-dom';

export default function BranchAddEdit() {

  const { id } = useParams();

  return (
    <Box>
      <BranchAddEditContainer id={id} />
    </Box>
  )
}
