import { NextPage } from 'next';
import React from 'react';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const checkoutSchema = yup.object({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup.string().email("Debe ser un email válido").required("El campo es requerido"),
    direccion: yup.string().required("La dirección es requerida"),
    departamento: yup.string(),
    ciudad: yup.string().required("La ciudad es requerida"),
    provincia: yup.string().required("La provincia es requerida"),
    codigoPostal: yup.number().required("El codigo postal es requerido"),
    nroTarjeta: yup.number().required("Ingrese un número de tarjeta"),
    nombreTarjeta: yup.string().required("El nombre como figura en la tarjeta es requerido"),
    fechaExp: yup.string().required("La fecha de expiración es requerida"),
    codSeguridad: yup.number().required("Código de seguridad requerido"),
})


const steps = ['Datos personales', 'Dirección de entrega', 'Sección de pago'];

const Checkout: NextPage = () => {

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <LayoutCheckout>
            <Box sx={{ width: '80%' }}>
            <Stepper activeStep={activeStep}>
            {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
                optional?: React.ReactNode;
            } = {};
            return (
                <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
                </Step>
            );
            })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleReset}>Reset</Button>
                </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                    >
                    Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
                </React.Fragment>
        )}
        </Box>
    </LayoutCheckout>
  )
}

export default Checkout;