import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import React, { FC } from 'react'

type CheckoutCardProps = {
    title: string,
    img: string,
    price: number,
}

const CheckoutCard: FC<CheckoutCardProps> = ({ title, img, price}: CheckoutCardProps) => {
  return (
    <Card sx={{ height: "60%", width: "80%" }}>
        <CardMedia
        component="img"
        height="60%"
        image={img}
        alt={title}
        />
        <CardContent>
            <Typography variant="h6" component="div" sx={{md: "20px"}} >
            {title}
            </Typography>
            <Typography variant="h6">
            ${price}
            </Typography>
        </CardContent>    
    </Card>
  )
}

export default CheckoutCard