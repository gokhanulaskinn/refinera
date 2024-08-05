import { Checkbox, TableBody, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { TableBodyRowType } from '../utils/types';
import TableActions from './TableActions';
import TableOptions from './TableOptions';
import TableBadge from './TableBadge';

type CustomTableBodyProps = {
  body: TableBodyRowType[];
  selectable?: boolean;
  selectedIds?: string[];
  setSelectedIds?: (ids: string[]) => void;
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

export default function CustomTableBody({
  body,
  selectable = false,
  selectedIds = [],
  setSelectedIds = () => { },
}: CustomTableBodyProps) {
  const handleSelectRow = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <TableBody>
      {body.map((row, rowIndex) => (
        <TableRow
          key={rowIndex}
          selected={selectable && selectedIds.includes(row.id!)}
          onClick={() => selectable && handleSelectRow(row.id!)}
        >
          {selectable && (
            <TableCell padding="checkbox">
              <Checkbox
                checked={selectedIds.includes(row.id!)}
                onChange={() => handleSelectRow(row.id!)}
              />
            </TableCell>
          )}
          {row.rowData.map((cell, cellIndex) => (
            <TableCell key={cellIndex}>{renderCell(cell)}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
