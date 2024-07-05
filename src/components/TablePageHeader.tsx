import { Box, Typography } from '@mui/material'
import React from 'react'
import SearchField from './SearchField'
import FilterButton from './FilterButton'
import CommonButton from './CommonButton'
import { Add } from '@mui/icons-material'

type TablePageHeaderProps = {
  title: string;
  handleAdd?: () => void;
}

export default function TablePageHeader({ title, handleAdd }: TablePageHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: '30px',
          fontWeight: 400,
        }}
      >
        {title} Listesi
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <SearchField />
        <FilterButton />
        {handleAdd && (
          <CommonButton
            label={`${title} Ekle`}
            onClick={handleAdd}
            variant='contained'
            sx={{
              color: 'white',
              width: '150px',
              whiteSpace: 'nowrap',
            }}
            icon={<Add />}
          />
        )}
      </Box>
    </Box>
  )
}
