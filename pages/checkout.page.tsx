import { NextPage } from 'next';
import React, { useContext } from 'react';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import StepperCheckout from 'dh-marvel/components/stepper/stepper';
import RegisterForm from 'dh-marvel/components/registerForm/RegisterForm';
import DeliveryForm from 'dh-marvel/components/deliveryForm/DeliveryForm';
import CardForm from 'dh-marvel/components/cardForm/CardForm';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, CardMedia } from '@mui/material';
import useOrder from 'context/useOrder';

const steps = ['Datos personales', 'Dirección de entrega', 'Sección de pago'];

const Checkout: NextPage = () => {

    const { state: { order: {comic: {title, img, price} } } } = useOrder();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const onSubmit = () => {
        setActiveStep(0);
    };

    return (
        <LayoutCheckout>
            <Box width="100%" display="flex">
                    <Stack sx={{width: "60%"}} mb={2}>
                    <StepperCheckout 
                        steps={steps}
                        activeStep={activeStep}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        onSubmit={onSubmit}>
                            {activeStep === 0 &&
                                <RegisterForm title={steps[activeStep]}/>
                            }
                            {activeStep === 1 &&
                                <DeliveryForm title={steps[activeStep]}/>
                            }
                            {activeStep === 2 &&
                                <CardForm title={steps[activeStep]}/>
                            }
                    </StepperCheckout>
                    </Stack>
                    <Stack sx={{width: "30%", alignItems: "center"}}>
                        <Card sx={{ height: "60%", width: "80%" }}>
                            <CardMedia
                            component="img"
                            height="60%"
                            image={img}
                            alt={title}
                            />
                            <CardContent>
                                <Typography variant="h6" component="div">
                                {title}
                                </Typography>
                                <Typography variant="body1">
                                ${price}
                                </Typography>
                            </CardContent>    
                        </Card>
                    </Stack>
            </Box>
        </LayoutCheckout>
  )
}

export default Checkout;