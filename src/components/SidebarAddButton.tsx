import { Add } from '@mui/icons-material'
import { Button } from '@mui/material'

type SidebarAddButtonProps = {
  label: string
  onClick: () => void
}

export default function SidebarAddButton({ label, onClick }: SidebarAddButtonProps) {
  return (
    <Button
      variant='contained'
      onClick={onClick}
      sx={{
        textTransform: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        color: '#EAECF0',
        borderRadius: '8px',
        background: '#9AA6A74D',
        height: 48,
        '&:hover': {
          background: '#9AA6A7',
        },
      }}
    >
      {label}
      <Add
        sx={{
          color: '#EAECF0',
        }}
      />
    </Button>
  )
}
