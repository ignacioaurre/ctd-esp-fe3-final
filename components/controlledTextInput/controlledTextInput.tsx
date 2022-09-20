import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import React, { FC, useContext } from 'react'
import {Controller, useController, useFormContext } from "react-hook-form";

type ControlledTextInputProps = {
    name: string,
    label: string,
    defaultValue?: string,
}

const ControlledTextInput: FC<ControlledTextInputProps> = ({name, label, defaultValue}: ControlledTextInputProps) => {

    const {control} = useFormContext();
    const {
        field: { onChange, value, ref},
        formState: {errors}
    } = useController({
        name: name,
        control,
        defaultValue,
    })


  return (
        <Box mb={2}>
            <TextField 
                onChange={onChange}
                value={value}
                label={label}
                inputRef={ref}
                fullWidth
                error={!errors[name]}
                helperText={`${errors[name]?.message || ""} `}
            />
        </Box>
  )
}

export default ControlledTextInput;