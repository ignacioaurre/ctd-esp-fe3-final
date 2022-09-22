import Stack from '@mui/material/Stack'
import React, { FC, useEffect } from 'react'
import ControlledTextInput from '../controlledTextInput/controlledTextInput'
import { FormProvider, useForm } from 'react-hook-form';
import *  as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

const deliverySchema = yup.object({
    direccion: yup.string().required("La dirección es requerida"),
    departamento: yup.string(),
    ciudad: yup.string().required("La ciudad es requerida"),
    provincia: yup.string().required("La provincia es requerida"),
    codigoPostal: yup.string().required("El codigo postal es requerido"),
})

type DeliveryFormData = {
    direccion: string,
    departamento?: string,
    ciudad: string,
    provincia: string,
    codigoPostal: string,
}

type DeliveryFormProps = {
    title: string,
}

const DeliveryForm: FC<DeliveryFormProps> = ({title}: DeliveryFormProps) => {

    const methods = useForm<DeliveryFormData>({
        resolver: yupResolver(deliverySchema)
    })

    const { setFocus, handleSubmit } = methods;

    const onSubmit = (data: DeliveryFormData) => {
        console.log(data)
    }

    useEffect(() => {
        setFocus("direccion")
    }, [setFocus])

  return (
    <FormProvider {...methods} >
        <form onSubmit={handleSubmit(onSubmit)}>
        <h4>{title}</h4>
        <Stack>
            <ControlledTextInput name="direccion" label="Dirección " defaultValue="" />
            <ControlledTextInput name="departamento" label="Departamento " defaultValue="" />
            <ControlledTextInput name="ciudad" label="Ciudad " defaultValue="" />
            <ControlledTextInput name="provincia" label="Provincia " defaultValue="" />
            <ControlledTextInput name="codigoPostal" label="Codigo Postal " defaultValue="" />
        </Stack>
        </form>
    </FormProvider>
  )
}

export default DeliveryForm