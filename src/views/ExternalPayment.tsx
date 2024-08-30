import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import GetPaymentContainer from '../containers/GetPaymentContainer'

export default function ExternalPayment() {
  console.log('ExternalPayment')
  const loc = useLocation()
  const search = new URLSearchParams(loc.search)
  return (
    <div>
      <GetPaymentContainer
        
      />
    </div>
  )
}
