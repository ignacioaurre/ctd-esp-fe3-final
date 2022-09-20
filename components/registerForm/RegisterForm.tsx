import Stack from '@mui/material/Stack';
import React, { FC } from 'react'
import ControlledTextInput from '../controlledTextInput/controlledTextInput';

type RegisterFormProps = {
    title: string,
}

const RegisterForm: FC<RegisterFormProps> = ({title}: RegisterFormProps) => {

  return (
    <>
        <h4>{title}</h4>
        <Stack>
            <ControlledTextInput name="nombre" label="Nombre " defaultValue="" />
            <ControlledTextInput name="apellido" label="Apellido " defaultValue="" />
            <ControlledTextInput name="email" label="Email " defaultValue="" />
        </Stack>
    </>
  )
}

export default RegisterForm;