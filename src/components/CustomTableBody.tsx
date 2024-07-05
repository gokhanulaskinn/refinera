import { Button, Menu, MenuItem, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { TableBodyRowType } from '../utils/types';
import TableActions from './TableActions';
import TableOptions from './TableOptions';

type CustomTableBodyProps = {
  body: TableBodyRowType[];
};

const renderCell = (cell: TableBodyRowType['rowData'][0]) => {
  switch (cell.type) {
    case 'text':
      return <span>{cell.value}</span>;
    case 'options':
      return <TableOptions cell={cell} />;
    case 'actions':
      return <TableActions actions={cell.actions!} />;
    default:
      return null;
  }
};

const OptionsMenu = ({ cell }: { cell: TableBodyRowType['rowData'][0] }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const selectedOption = cell.variant?.find(option => option.id === cell.value);
  return (
    <div>
      <Button
        onClick={handleClick}
        style={{
          backgroundColor: selectedOption?.bgColor,
          color: selectedOption?.textColor,
          textTransform: 'none',
          padding: '4px 12px',
          borderRadius: '16px'
        }}
      >
        {selectedOption?.label}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {cell.variant?.map(option => (
          <MenuItem
            key={option.id}
            value={option.id}
            onClick={() => {
              cell.onSelected?.(option.id);
              handleClose();
            }}
            style={{
              backgroundColor: option.bgColor,
              color: option.textColor,
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default function CustomTableBody({ body }: CustomTableBodyProps) {
  return (
    <TableBody>
      {body.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {row.rowData.map((cell, cellIndex) => (
            <TableCell key={cellIndex}>
              {renderCell(cell)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
