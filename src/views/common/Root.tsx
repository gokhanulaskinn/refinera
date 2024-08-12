import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';

export default function Root() {

  const { role } = React.useContext(AuthContext);
  const nav = useNavigate();

  useEffect(() => {
    nav(`/${role}`)
  }, [role])

  return (
    <Box>
    </Box>
  )
}
