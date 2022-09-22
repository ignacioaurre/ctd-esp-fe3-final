import React, { FC, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import ControlledTextInput from '../controlledTextInput/controlledTextInput'
import { FormProvider, useForm } from 'react-hook-form';
import *  as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const cardSchema = yup.object({
    nroTarjeta: yup.string().required("Ingrese un número de tarjeta"),
    nombreTarjeta: yup.string().required("El nombre como figura en la tarjeta es requerido"),
    fechaExp: yup.string().required("La fecha de expiración es requerida"),
    codSeguridad: yup.string().required("Código de seguridad requerido"),
})

type CardFormData = {
    nroTarjeta: string,
    nombreTarjeta: string,
    fechaExp: string,
    codSeguridad: string,
}

type CardFormProps = {
    title: string,
}

const CardForm: FC<CardFormProps> = ({title}: CardFormProps) => {

    const methods = useForm<CardFormData>({
        resolver: yupResolver(cardSchema)
    })

    const { setFocus, handleSubmit } = methods;

    const onSubmit = (data: CardFormData) => {
        console.log(data)
    }

    useEffect(() => {
        setFocus("nroTarjeta")
    }, [setFocus])

  return (
    <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)}>
        <h4>{title}</h4>
        <Stack >
            <ControlledTextInput name="nroTarjeta" label="Numero Tarjeta " defaultValue="" />
            <ControlledTextInput name="nombreTarjeta" label="Nombre Tarjeta " defaultValue="" />
            <ControlledTextInput name="fechaExp" label="Fecha de expiración " defaultValue="" />
            <ControlledTextInput name="codSeguridad" label="Codigo de Seguridad " defaultValue="" type="password"/>
        </Stack>
        </form>
    </FormProvider>
  )
}

export default CardForm