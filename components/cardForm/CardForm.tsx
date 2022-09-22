import React, { FC, useEffect, useState } from 'react'
import ControlledTextInput from '../controlledTextInput/controlledTextInput'
import { FormProvider, useForm } from 'react-hook-form';
import *  as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useOrder from 'context/useOrder';
import { Card } from 'dh-marvel/features/Types/state.types';
import { setSnackbar, submitCard, submitForm } from 'context/actions';
import { useRouter } from 'next/router';
import { CheckoutInput } from 'dh-marvel/features/checkout/checkout.types';

const cardSchema = yup.object({
    nroTarjeta: yup.string().required("Ingrese un número de tarjeta"),
    nombreTarjeta: yup.string().required("El nombre como figura en la tarjeta es requerido"),
    fechaExp: yup.string().required("La fecha de expiración es requerida"),
    codSeguridad: yup.string().required("Código de seguridad requerido"),
})

type CardFormProps = {
    title: string,
    activeStep: number,
    handleBack: () => void,
    handleNext: () => void,
    steps: string[]
}

const CardForm: FC<CardFormProps> = ({title, activeStep, handleBack, handleNext, steps}: CardFormProps) => {

    const router = useRouter();
    const { state: {order: {card: {nroTarjeta, nombreTarjeta, fechaExp, codSeguridad}}}, dispatch, state } = useOrder();

    const methods = useForm<Card>({
        resolver: yupResolver(cardSchema),
        defaultValues: {
            nroTarjeta,
            nombreTarjeta,
            fechaExp,
            codSeguridad,
        }
    })

    const { setFocus, handleSubmit } = methods;

    const onSubmit = async (data: Card) => {
        const body: CheckoutInput = {
            order: { name: state.order.comic.title,
                    image: state.order.comic.img,
                    price: state.order.comic.price,
            },
            card:  {number: data.nroTarjeta,
                    nameOnCard: data.nombreTarjeta,
                    expDate: data.fechaExp,
                    cvc: data.codSeguridad,
            },
            customer: {name: state.order.register.nombre,
                    lastname: state.order.register.apellido,
                    email: state.order.register.email,
                    address: {address1: state.order.delivery.direccion,
                                address2: state.order.delivery.departamento,
                                city: state.order.delivery.ciudad,
                                state: state.order.delivery.provincia,
                                zipCode: state.order.delivery.codigoPostal,
                            }
            }
        };
        submitCard(dispatch, data);
        submitForm(dispatch)
        const JSONbody = JSON.stringify(body)
        const options = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSONbody,
        }
        const response = await fetch("/api/checkout", options)
        const result = await response.json()
        console.log(result)
        if(result.error)
            setSnackbar(dispatch, result.message);
        else 
            router.push("/confirmacion-compra")
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

export default CardForm