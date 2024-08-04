import { ArrowForwardIos } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import CommonButton from './CommonButton'

type PaymentFinishProps = {
  handleFinish(): void;
  price: number;
  canFinish: boolean
  comissionFee: number;
  totalPrice: number;
}

export default function PaymentFinish({ handleFinish, price, canFinish, comissionFee, totalPrice }: PaymentFinishProps) {

  const comissionRate = 0.025;

  return (
    <Box>
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: 'text.secondary'
          }}
        >
          Ücret
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 500
          }}
        >
          {price.toFixed(2)} TL
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 14,
            fontWeight: 400,
            color: 'text.secondary'
          }}
        >
          Hizmet Bedeli
        </Typography>
        <Typography
          sx={{
            fontSize: 24,
            fontWeight: 500
          }}
        >
          {comissionFee.toFixed(2)} TL
        </Typography>
      </Box>
      <Box>
        <Typography
          sx={{
            fontSize: 18,
            fontWeight: 400,
            color: 'text.secondary',
            mt: 4
          }}
        >
          Toplam Ücret
        </Typography>
        <Typography
          sx={{
            fontSize: 42,
            fontWeight: 500
          }}
        >
          {totalPrice.toFixed(2)} TL
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mt: 4
        }}
      >
        <CommonButton
          label="Siparişi Tamamla"
          color='white'
          disabled={!canFinish}
          onClick={() => handleFinish()}
          icon={<ArrowForwardIos />}
        />
        <CommonButton
          label="Ödeme Linki Paylaş"
          color='white'
          onClick={() => { }}
          icon={<ArrowForwardIos />}
          sx={{
            background: '#9AA6A7'
          }}
        />
      </Box>
    </Box>
  )
}
