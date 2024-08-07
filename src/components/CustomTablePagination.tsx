import * as React from 'react';
import usePagination from '@mui/material/usePagination';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import { ReactComponent as ArrowLeft } from '../assets/icons/arrow-left.svg';
import { ReactComponent as ArrowRight } from '../assets/icons/arrow-right.svg';

const List = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'flex',
});

type CustomTablePaginationProps = {
  total?: number;
  page?: number;
  onPageChange?: (page: number) => void;
};

export default function CustomTablePagination({ total = 10, page = 1, onPageChange }: CustomTablePaginationProps) {
  const theme = useTheme();
  const [currentPage, setCurrentPage] = React.useState(page);

  const { items } = usePagination({
    count: total,
    page: currentPage,
    onChange: (event, newPage) => {
      setCurrentPage(newPage);
      if (onPageChange) {
        onPageChange(newPage);
      }
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'end',
      }}
    >
      <List
        sx={{
          display: 'flex',
          gap: '8px',
        }}
      >
        {items.map(({ page, type, selected, ...item }, index) => {
          let children = null;

          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = (
              <Box
                sx={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  backgroundColor: selected ? 'primary.main' : '#9AA6A71A',
                }}
              >
                ...
              </Box>
            );
          } else if (type === 'page') {
            children = (
              <Box
                {...item}
                sx={{
                  width: '40px',
                  height: '40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  backgroundColor: selected ? 'primary.main' : '#9AA6A71A',
                  cursor: 'pointer',
                  color: selected ? 'white' : theme.palette.text.secondary,
                }}
                onClick={() => {
                  setCurrentPage(page as number);
                  if (onPageChange) {
                    onPageChange(page as number);
                  }
                }}
              >
                {page}
              </Box>
            );
          } else {
            children = (
              <button
                {...item}
                style={{
                  textTransform: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px 8px',
                  height: '40px !important',
                  background: '#9AA6A71A',
                  borderRadius: '10px',
                  color: theme.palette.text.secondary,
                  cursor: 'pointer',
                  userSelect: 'none',
                  border: 'none',
                }}
                onClick={() => {
                  if (type === 'previous') {
                    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
                    if (onPageChange) {
                      onPageChange(Math.max(currentPage - 1, 1));
                    }
                  } else if (type === 'next') {
                    setCurrentPage((prevPage) => Math.min(prevPage + 1, total));
                    if (onPageChange) {
                      onPageChange(Math.min(currentPage + 1, total));
                    }
                  }
                }}
              >
                {type === 'previous' &&
                  <ArrowLeft
                    style={{
                      stroke: theme.palette.text.secondary,
                    }}
                  />
                }
                {type === 'next' ? 'Sonraki' : 'Önceki'}
                {type === 'next' &&
                  <ArrowRight
                    style={{
                      stroke: theme.palette.text.secondary,
                    }}
                  />
                }
              </button>
            );
          }

          return <li key={index}>{children}</li>;
        })}
      </List>
    </Box>
  );
}
