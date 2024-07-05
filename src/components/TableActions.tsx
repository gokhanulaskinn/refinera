import { IconButton, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

type TableActionsType = {
  actions: { name: string, action: any }[];
};

export default function TableActions({ actions }: TableActionsType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {actions?.map(action => (
          <MenuItem
            key={action.name}
            onClick={() => {
              action.action();
              handleClose();
            }}
          >
            {action.name}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};