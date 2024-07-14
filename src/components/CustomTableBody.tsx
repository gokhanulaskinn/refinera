import { Button, Menu, MenuItem, Table, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { TableBodyRowType } from '../utils/types';
import TableActions from './TableActions';
import TableOptions from './TableOptions';
import TableBadge from './TableBadge';

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
    case 'badge':
      return <TableBadge cell={cell} />;
    default:
      return null;
  }
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
