import { Box, Button, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import { TableBodyRowType, TableRowCellType } from '../utils/types';

type TableOptionsType = {
  cell: TableRowCellType;
};

export default function TableOptions({ cell }: TableOptionsType) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedOption = cell.variant?.find(option => option.id === cell.id);

  return (
    <Box>
      <Box
        onClick={handleClick}
        style={{
          backgroundColor: selectedOption?.bgColor,
          color: selectedOption?.textColor,
          textTransform: 'none',
          padding: '4px 12px',
          borderRadius: '8px',
          width: 'fit-content',
          cursor: 'pointer',
        }}
      >
        {selectedOption?.label}
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        sx={{
          '& .MuiList-padding': {
            padding: 0,
          },
        }}
      >
        {cell.variant?.map((option, index) => (
          <MenuItem
            key={option.id}
            onClick={() => {
              cell.onSelected?.(option.id);
              handleClose();
            }}
            sx={{
              backgroundColor: option.bgColor,
              color: option.textColor,
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
