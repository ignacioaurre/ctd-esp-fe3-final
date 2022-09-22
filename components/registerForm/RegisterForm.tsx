import React, { FC, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import ControlledTextInput from '../controlledTextInput/controlledTextInput';
import { FormProvider, useForm } from 'react-hook-form';
import *  as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useOrder from 'context/useOrder';
import { submitRegister } from 'context/actions';
import { Register } from 'dh-marvel/features/Types/state.types';

const registerSchema = yup.object({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup.string().email("Debe ser un email válido").required("El campo es requerido"),
})

type RegisterFormProps = {
    title: string,
    activeStep: number,
    handleBack: () => void,
    handleNext: () => void,
    steps: string[]
}

const RegisterForm: FC<RegisterFormProps> = ({title, activeStep, handleBack, handleNext, steps}: RegisterFormProps) => {

    const { state: {order: {register: {nombre, apellido, email}}}, dispatch } = useOrder();

    const methods = useForm<Register>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            nombre: nombre,
            apellido: apellido,
            email: email
        }
    })

    const { setFocus, handleSubmit } = methods;

    const onSubmit = (data: Register) => {
        submitRegister(dispatch, data);
        handleNext();
    }

    useEffect(() => {
        setFocus("nombre")
    }, [setFocus])

  return (
    <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)}>
        <h4>{title}</h4>
        <Stack>
            <ControlledTextInput name="nombre" label="Nombre " />
            <ControlledTextInput name="apellido" label="Apellido " />
            <ControlledTextInput name="email" label="Email " />
        </Stack>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
            >
            Anterior
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button type="submit">
            {activeStep === steps.length - 1 ? 'Finalizar' : 'Proximo'}
            </Button>
        </Box>
        </form>
    </FormProvider>
  )
}

export default RegisterForm;