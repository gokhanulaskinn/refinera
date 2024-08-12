import { Menu, MenuItem } from '@mui/material'
import React from 'react'

type BasicMenuProps = {
  anchorEl: null | HTMLElement
  items: string[]
  open: boolean
  onClose: () => void
  onSelected: (item: string) => void
}

export default function BasicMenu({ open, anchorEl, items, onClose, onSelected }: BasicMenuProps) {
  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      {items.map((item) => (
        <MenuItem key={item} onClick={() => onSelected(item)}>
          {item}
        </MenuItem>
      ))}
    </Menu>
  )
}
