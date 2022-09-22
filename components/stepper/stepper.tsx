import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import useOrder from 'context/useOrder';
import React, { FC } from 'react'

type StepperProps = {
    steps: string[],
    activeStep: number,
    handleNext: () => void,
    handleBack: () => void,
    onSubmit: () => void,
    children: React.ReactNode,
}

const StepperCheckout: FC<StepperProps> = ({steps, activeStep, handleNext, handleBack, onSubmit, children}: StepperProps) => {

    const { state } = useOrder();

  return (
    <>
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
            {/* {activeStep === steps.length ? (
                <>
                <Typography sx={{ mt: 2, mb: 1 }}>
                    {state.order.register.nombre}
                    {state.order.delivery.direccion}
                    {state.order.card.nroTarjeta}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Box sx={{ flex: '1 1 auto' }} />
                    <Button onClick={onSubmit}>Comprar</Button>
                </Box>
                </>
            ) : (
                <> */}
                {children}
                {/* </>
            )} */}
    </>
  )
}

export default StepperCheckout;