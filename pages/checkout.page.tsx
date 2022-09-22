import { NextPage } from 'next';
import React, { useEffect } from 'react';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import StepperCheckout from 'dh-marvel/components/stepper/stepper';
import RegisterForm from 'dh-marvel/components/registerForm/RegisterForm';
import DeliveryForm from 'dh-marvel/components/deliveryForm/DeliveryForm';
import CardForm from 'dh-marvel/components/cardForm/CardForm';
import Stack from '@mui/material/Stack';
import { Alert, Box, Snackbar } from '@mui/material';
import useOrder from 'context/useOrder';
import { useRouter } from 'next/router';
import CheckoutCard from 'dh-marvel/components/checkoutCard/CheckoutCard';
import { setSnackbar } from 'context/actions';

const steps = ['Datos personales', 'Dirección de entrega', 'Sección de pago'];

const Checkout: NextPage = () => {

    const router = useRouter();
    const { state: { order: {comic: {title, img, price} } }, state: {snackbar: { open, message}}, dispatch } = useOrder();

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

    const handleClose = () => {
        setSnackbar(dispatch, "")
    }

    useEffect(() => {
      if (title === "")
        router.push("/")
    }, [])
    

    return (
        <LayoutCheckout>
            <Box width="100%" display="flex" justifyContent="center">
                    <Stack sx={{width: "60%"}} mb={2}>
                    <StepperCheckout 
                        steps={steps}
                        activeStep={activeStep}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        onSubmit={onSubmit}>
                            {activeStep === 0 &&
                                <RegisterForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext} />
                            }
                            {activeStep === 1 &&
                                <DeliveryForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext}/>
                            }
                            {activeStep === 2 &&
                                <CardForm title={steps[activeStep]} activeStep={activeStep} steps={steps} handleBack={handleBack} handleNext={handleNext}/>
                            }
                    </StepperCheckout>
                    </Stack>
                    <Stack sx={{width: "30%", alignItems: "center"}}>
                            <CheckoutCard title={title} img={img} price={price} />
                    </Stack>
            </Box>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert severity='error'>{message}</Alert>
            </Snackbar>
        </LayoutCheckout>
  )
}

export default Checkout;