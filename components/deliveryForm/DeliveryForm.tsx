import Stack from '@mui/material/Stack'
import React, { FC } from 'react'
import ControlledTextInput from '../controlledTextInput/controlledTextInput'

type DeliveryFormProps = {
    title: string,
}

const DeliveryForm: FC<DeliveryFormProps> = ({title}: DeliveryFormProps) => {

  return (
    <>
        <h4>{title}</h4>
        <Stack>
            <ControlledTextInput name="direccion" label="Dirección " defaultValue="" />
            <ControlledTextInput name="departamento" label="Departamento " defaultValue="" />
            <ControlledTextInput name="ciudad" label="Ciudad " defaultValue="" />
            <ControlledTextInput name="provincia" label="Provincia " defaultValue="" />
            <ControlledTextInput name="codigoPostal" label="Codigo Postal " defaultValue="" />
        </Stack>
    </>
  )
}

export default DeliveryForm