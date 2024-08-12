import { Box, Typography } from '@mui/material'
import React from 'react'
import SearchField from './SearchField'
import FilterButton from './FilterButton'
import CommonButton from './CommonButton'
import { Add } from '@mui/icons-material'

type TablePageHeaderProps = {
  title: string;
  handleFilter?: (e: any) => void;
  handleAdd?: () => void;
  addText?: string;
  handleSearch: (searchText: string) => void;
}

export default function TablePageHeader({ title, handleAdd, handleFilter, addText, handleSearch }: TablePageHeaderProps) {

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
        {title}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}
      >
        <SearchField
          handleSearch={handleSearch}
        />
        {handleFilter && (
          <FilterButton
            filterClick={handleFilter}
          />
        )}
        {handleAdd && (
          <CommonButton
            label={addText!}
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
