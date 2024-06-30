import { ListItemButton, ListItemIcon, useTheme } from '@mui/material';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

type SidebarListItemProps = {
  Icon: React.ElementType
  label: string
  to: string
  selected?: boolean
}

export default function SidebarListItem({ Icon, label, to, selected }: SidebarListItemProps) {

  const theme = useTheme();

  return (
    <ListItemButton
      component={RouterLink}
      to={to}
      selected={selected}
      sx={{
        color: selected ? theme.palette.primary.main : '#EAECF0',
        borderLeft: selected ? `3px solid ${theme.palette.primary.main}` : '3px solid transparent',
        height: 50,
        pl:1
      }}
    >
      <ListItemIcon
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Icon
          style={{
            stroke: selected ? theme.palette.primary.main : '#EAECF0',
          }}
        />
      </ListItemIcon>
      {label}
    </ListItemButton>
  )
}
