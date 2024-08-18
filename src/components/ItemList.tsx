import { Box, Divider, List, Paper, Typography } from '@mui/material'
import React from 'react'
import ProductItem from './ProductItem'
import Clock from './Clock'
import { BucketType } from '../utils/types'

export const items = [
  {
    id: 1,
    label: 'HAS ALTIN',
    buy: 2400.45,
    sell: 2435.47,
    diff: 19.34,
  },
  {
    id: 2,
    label: 'ONS',
    buy: 2219.4,
    sell: 2239.3,
    diff: -9.3,
  },
  {
    id: 3,
    label: 'USD / KG',
    buy: 73990,
    sell: 74380,
    diff: -7.3
  },
  {
    id: 4,
    label: 'EUR / KG',
    buy: 68580,
    sell: 69140,
    diff: 11.74
  },
  {
    id: 5,
    label: '22 AYAR',
    buy: 2188.22,
    sell: 2327.11,
    diff: 12.34
  },
  {
    id: 6,
    label: 'GRAM ALTIN',
    buy: 2394.41,
    sell: 2427.11,
    diff: 12.34
  },
  {
    id: 7,
    label: 'YENİ ÇEYREK',
    buy: 2394.41,
    sell: 2427.11,
    diff: 12.34
  },
  {
    id: 8,
    label: 'HAS ALTIN',
    buy: 2400.45,
    sell: 2435.47,
    diff: 19.34,
  },
  {
    id: 9,
    label: 'ONS',
    buy: 2219.4,
    sell: 2239.3,
    diff: -9.3,
  },
  {
    id: 10,
    label: 'USD / KG',
    buy: 73990,
    sell: 74380,
    diff: -7.3
  },
  {
    id: 11,
    label: 'EUR / KG',
    buy: 68580,
    sell: 69140,
    diff: 11.74
  },
  {
    id: 12,
    label: '22 AYAR',
    buy: 2188.22,
    sell: 2327.11,
    diff: 12.34
  },
  {
    id: 13,
    label: 'GRAM ALTIN',
    buy: 2394.41,
    sell: 2427.11,
    diff: 12.34
  },
  {
    id: 14,
    label: 'YENİ ÇEYREK',
    buy: 2394.41,
    sell: 2427.11,
    diff: 12.34
  },
  {
    id: 15,
    label: 'HAS ALTIN',
    buy: 2400.45,
    sell: 2435.47,
    diff: 19.34,
  },
  {
    id: 16,
    label: 'ONS',
    buy: 2219.4,
    sell: 2239.3,
    diff: -9.3,
  },
  {
    id: 17,
    label: 'USD / KG',
    buy: 73990,
    sell: 74380,
    diff: -7.3
  },
  {
    id: 18,
    label: 'EUR / KG',
    buy: 68580,
    sell: 69140,
    diff: 11.74
  },
  {
    id: 19,
    label: '22 AYAR',
    buy: 2188.22,
    sell: 2327.11,
    diff: 12.34
  },
  {
    id: 20,
    label: 'GRAM ALTIN',
    buy: 2394.41,
    sell: 2427.11,
    diff: 12.34
  },
  {
    id: 21,
    label: 'YENİ ÇEYREK',
    buy: 2394.41,
    sell: 2427.11,
    diff: 12.34
  },
]


type ItemListProps = {
  bucket: BucketType[],
  setBucket: React.Dispatch<React.SetStateAction<BucketType[]>>
}

export default function ItemList({ bucket, setBucket }: ItemListProps) {

  const handleUpdateBucket = (itemId: number, quantity: number) => {
    const bucketItem = bucket.find(bucketItem => bucketItem.itemId === itemId)
    if (bucketItem) {
      setBucket(bucket.map(bucketItem => {
        if (bucketItem.itemId === itemId) {
          return {
            ...bucketItem,
            quantity
          }
        }
        return bucketItem
      }))
    } else {
      setBucket([
        ...bucket,
        {
          itemId,
          quantity
        }
      ])
    }
  }

  console.log('bucket', bucket)

  return (
    <Paper
      sx={{
        borderRadius: '16px',
        p: 2
      }}
    >
      <Box
        sx={{
          maxHeight: 'calc(100vh - 300px)',
          overflowY: 'auto',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            p: 2
          }}
        >
          <Typography
            sx={{
              width: '50%',
            }}
          >
            <Clock />
          </Typography>
          <Typography
            sx={{
              width: '25%',
              textAlign: 'end',
              mr: 2
            }}
          >
            Alış
          </Typography>
          <Typography
            sx={{
              width: '25%',
              textAlign: 'end',
              mr: 2
            }}
          >
            Satış
          </Typography>
        </Box>
        <List>
          {items.map((item, index) => (
            <>
              <ProductItem
                key={index}
                item={item}
                count={bucket.find(bucketItem => bucketItem.itemId === item.id)?.quantity || 0}
                setCount={(count) => handleUpdateBucket(item.id, count)}
              />
              {index !== items.length - 1 && (
                <Divider />
              )}
            </>
          ))}
        </List>
      </Box>
    </Paper>
  )
}
