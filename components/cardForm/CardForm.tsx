import Stack from '@mui/material/Stack'
import React, { FC } from 'react'
import ControlledTextInput from '../controlledTextInput/controlledTextInput'

type CardFormProps = {
    title: string,
}

const CardForm: FC<CardFormProps> = ({title}: CardFormProps) => {
  return (
    <>
        <h4>{title}</h4>
        <Stack>
            <ControlledTextInput name="nroTarjeta" label="Numero Tarjeta " defaultValue="" />
            <ControlledTextInput name="nombreTarjeta" label="Nombre Tarjeta " defaultValue="" />
            <ControlledTextInput name="fechaExp" label="Fecha de expiración " defaultValue="" />
            <ControlledTextInput name="codSeguridad" label="Codigo de Seguridad " defaultValue="" />
        </Stack>
    </>
  )
}

export default CardForm