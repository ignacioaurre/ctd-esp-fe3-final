import { Card, CardContent, Stack, Typography } from '@mui/material'
import Grid2 from '@mui/material/Unstable_Grid2'
import useOrder from 'context/useOrder'
import CheckoutCard from 'dh-marvel/components/checkoutCard/CheckoutCard'
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout'
import { NextPage } from 'next'
import React from 'react'

type ConfirmacionCompraProps = {

}

const ConfirmacionCompra: NextPage<ConfirmacionCompraProps> = ({}: ConfirmacionCompraProps) => {

    const { state: {finishedOrder}, dispatch } = useOrder();

  return (
    <LayoutCheckout>
        <Grid2 container width="100%" spacing={3}>
            <Grid2 xs={12} display="flex" justifyContent="center" alignItems="center" bgcolor="green" height= "5%" color="white" fontSize="20px" marginX="5px" >
                ¡Felicitaciones!
            </Grid2>
            <Grid2 xs={5} display="flex" marginX="20px">
                <CheckoutCard title={finishedOrder.order?.name} img={finishedOrder.order?.image} price={finishedOrder.order?.price} />
            </Grid2>
            <Grid2 xs={6}>
                <Card sx={{mb: "40px"}} >
                    <CardContent>
                        <Typography variant='h4'>
                            Datos Personales
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="body1">
                            {finishedOrder.customer?.name} {finishedOrder.customer?.lastname}
                        </Typography>
                        <Typography variant="body1">
                            {finishedOrder.customer?.email}
                        </Typography>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent>
                        <Typography variant='h4'>
                            Datos de envío
                        </Typography>
                    </CardContent>
                    <CardContent>
                        <Typography variant="body1">
                            {finishedOrder.customer?.address.address1}
                        </Typography>
                        <Typography variant="body1">
                            {finishedOrder.customer?.address.city}, {finishedOrder.customer?.address.state} ({finishedOrder.customer?.address.zipCode})
                        </Typography>
                    </CardContent>
                </Card>
            </Grid2>
        </Grid2>
    </LayoutCheckout>
  )
}

export default ConfirmacionCompra