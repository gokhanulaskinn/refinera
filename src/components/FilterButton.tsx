import { Button, useTheme } from '@mui/material'
import { ReactComponent as FilterIcon } from '../assets/icons/filter-square.svg'

type FilterButtonProps = {
  filterClick: (e: any) => void
}

export default function FilterButton({ filterClick }: FilterButtonProps) {

  const theme = useTheme();

  return (
    <Button
      variant='contained'
      onClick={filterClick}
      sx={{
        borderRadius: '55px',
        background: theme.palette.background.paper,
        '&:hover': {
          background: theme.palette.background.paper,
        },
        boxShadow: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        textTransform: 'none',
        color: '#667085',
      }}
    >
      Filtrele
      <FilterIcon style={{ stroke: '#344054' }} />
    </Button>
  )
}
