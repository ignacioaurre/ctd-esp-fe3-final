import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import React, { FC } from 'react'
import { useController, useFormContext } from "react-hook-form";

type ControlledTextInputProps = {
    name: string,
    label: string,
    defaultValue?: string,
    type?: string,
}

const ControlledTextInput: FC<ControlledTextInputProps> = ({name, label, defaultValue, type = "text"}: ControlledTextInputProps) => {

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
                type={type}
                fullWidth
                error={!errors[name]}
                helperText={`${errors[name]?.message || ""} `}
                data-testid={name}
            />
        </Box>
  )
}

export default ControlledTextInput;