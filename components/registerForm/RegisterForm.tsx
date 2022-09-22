import React, { FC, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import ControlledTextInput from '../controlledTextInput/controlledTextInput';
import { FormProvider, useForm } from 'react-hook-form';
import *  as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const registerSchema = yup.object({
    nombre: yup.string().required("El nombre es requerido"),
    apellido: yup.string().required("El apellido es requerido"),
    email: yup.string().email("Debe ser un email válido").required("El campo es requerido"),
})

type RegisterFormData = {
    nombre: string,
    apellido: string,
    email: string,
}

type RegisterFormProps = {
    title: string,
}

const RegisterForm: FC<RegisterFormProps> = ({title}: RegisterFormProps) => {

    const methods = useForm<RegisterFormData>({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            nombre: "Test",
            apellido: "User",
            email: "test@user.com"
        }
    })

    const { setFocus, handleSubmit } = methods;

    const onSubmit = (data: RegisterFormData) => {
        console.log(data)
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
        </form>
    </FormProvider>
  )
}

export default RegisterForm;