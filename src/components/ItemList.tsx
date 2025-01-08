import { Box, Divider, List, Paper, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import ProductItem from './ProductItem'
import Clock from './Clock'
import { ApiList, BucketType, CurrencyItem } from '../utils/types'
import useSocket from '../hooks/useCurrency'
import useSWR from 'swr'
import { baseUrl, fetcher } from '../utils/global'
import { time, timeStamp } from 'console'

type ItemListProps = {
  bucket: BucketType[],
  setBucket: React.Dispatch<React.SetStateAction<BucketType[]>>
  items: CurrencyItem[]
}

export default function ItemList({ bucket, setBucket,items }: ItemListProps) {

  const handleUpdateBucket = (itemId: string, quantity: number) => {
    const bucketItem = bucket.find(bucketItem => bucketItem.itemId === itemId)
    if (bucketItem) {
      if (quantity === 0) {
        setBucket(bucket.filter(bucketItem => bucketItem.itemId !== itemId))
      } else {
        setBucket(bucket.map(bucketItem => {
          if (bucketItem.itemId === itemId) {
            return {
              ...bucketItem,
              quantity
            }
          }
          return bucketItem
        }))
      }
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
          {items && items.map((item, index) => (
            <>
              <ProductItem
                key={index}
                item={item}
                count={bucket.find(bucketItem => bucketItem.itemId === item.parity)?.quantity || 0}
                setCount={(count) => handleUpdateBucket(item.parity, count)}
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
