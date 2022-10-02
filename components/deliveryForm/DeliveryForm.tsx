import Stack from '@mui/material/Stack'
import React, { FC, useEffect } from 'react'
import ControlledTextInput from '../controlledTextInput/controlledTextInput'
import { FormProvider, useForm } from 'react-hook-form';
import *  as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import useOrder from 'dh-marvel/context/useOrder';
import { Delivery } from 'dh-marvel/features/Types/state.types';
import { submitDelivery } from 'dh-marvel/context/actions';

export const deliverySchema = yup.object({
    direccion: yup.string().required("La dirección es requerida"),
    departamento: yup.string(),
    ciudad: yup.string().required("La ciudad es requerida"),
    provincia: yup.string().required("La provincia es requerida"),
    codigoPostal: yup.string().required("El codigo postal es requerido"),
})

type DeliveryFormProps = {
    title: string,
    activeStep: number,
    handleBack: () => void,
    handleNext: () => void,
    steps: string[]
}

const DeliveryForm: FC<DeliveryFormProps> = ({title, activeStep, handleBack, handleNext, steps}: DeliveryFormProps) => {

    const { state: {order: {delivery: { direccion, departamento, ciudad, provincia, codigoPostal}}}, dispatch } = useOrder();

    const methods = useForm<Delivery>({
        resolver: yupResolver(deliverySchema),
            defaultValues: {
                direccion,
                departamento,
                ciudad,
                provincia,
                codigoPostal,
            }
    })

    const { setFocus, handleSubmit } = methods;

    const onSubmit = (data: Delivery) => {
        submitDelivery(dispatch, data);
        handleNext();
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

export default DeliveryForm