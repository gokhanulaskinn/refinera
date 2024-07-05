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
export default function CustomTablePagination() {

  const theme = useTheme();

  const { items } = usePagination({
    count: 10,
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
            children =
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
              ;
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