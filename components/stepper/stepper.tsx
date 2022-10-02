import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import React, { FC } from 'react'

type StepperProps = {
    steps: string[],
    activeStep: number,
    children: React.ReactNode,
}

const StepperCheckout: FC<StepperProps> = ({steps, activeStep, children}: StepperProps) => {

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
                {children}
    </>
  )
}

export default StepperCheckout;