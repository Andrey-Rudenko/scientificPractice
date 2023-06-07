import React from 'react'
import {TextField} from "@mui/material";

const Input = (props) => {
    const {name, label, value, onChange} = props;
    return (
        <TextField
            variant = 'outlined'
            label = {label}
            name = {name}
            value = {value}
            onChange = {onChange}
            error
            helperText="some validation error"
        />
    )
}
export default Input;