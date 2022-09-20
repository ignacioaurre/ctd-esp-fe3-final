import { NextPage } from 'next';
import React from 'react';
import LayoutCheckout from 'dh-marvel/components/layouts/layout-checkout';
import StepperCheckout from 'dh-marvel/components/stepper/stepper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import BodySingle from 'dh-marvel/components/layouts/body/single/body-single';
import { FormProvider, useForm } from 'react-hook-form';
import RegisterForm from 'dh-marvel/components/registerForm/RegisterForm';
import DeliveryForm from 'dh-marvel/components/deliveryForm/DeliveryForm';
import CardForm from 'dh-marvel/components/cardForm/CardForm';

const checkoutSchema = yup.object({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup.string().email("Debe ser un email válido").required("El campo es requerido"),
    direccion: yup.string().required("La dirección es requerida"),
    departamento: yup.string(),
    ciudad: yup.string().required("La ciudad es requerida"),
    provincia: yup.string().required("La provincia es requerida"),
    codigoPostal: yup.string().required("El codigo postal es requerido"),
    nroTarjeta: yup.string().required("Ingrese un número de tarjeta"),
    nombreTarjeta: yup.string().required("El nombre como figura en la tarjeta es requerido"),
    fechaExp: yup.string().required("La fecha de expiración es requerida"),
    codSeguridad: yup.string().required("Código de seguridad requerido"),
})

type RegisterFormData = {
    nombre: string,
    apellido: string,
    email: string,
    direccion: string,
    departamento?: string,
    ciudad: string,
    provincia: string,
    codigoPostal: string,
    nroTarjeta: string,
    nombreTarjeta: string,
    fechaExp: string,
    codSeguridad: string,
}


const steps = ['Datos personales', 'Dirección de entrega', 'Sección de pago'];

const Checkout: NextPage = () => {

    const methods = useForm<RegisterFormData>({
        resolver: yupResolver(checkoutSchema)
    })

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSubmit = () => {
        setActiveStep(0);
    };

    return (
        <LayoutCheckout>
            <BodySingle>
                <FormProvider {...methods} >
                <form style={{width: "65%", height: "100%", marginLeft: "20px"}}>
                    <StepperCheckout 
                        steps={steps}
                        activeStep={activeStep}
                        handleNext={handleNext}
                        handleBack={handleBack}
                        onSubmit={handleSubmit}>
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
                </form>
                </FormProvider>
            </BodySingle>
        </LayoutCheckout>
  )
}

export default Checkout;