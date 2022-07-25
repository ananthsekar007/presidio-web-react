import React from "react";
import { TextField, OutlinedTextFieldProps } from "@mui/material";

interface Props {
  validationError?: any;
  helperText?: any;
  onChangeText?: (text: string) => void;
}
export type UITextFieldProps = Props & Partial<OutlinedTextFieldProps>;

export function UITextField(props: UITextFieldProps) {
  const { validationError, onChangeText, ...rest } = props;
  return (
    <TextField
      // always put the default props above
      variant={"outlined"}
      margin="normal"
      helperText={validationError ? validationError.message : props?.helperText}
      error={validationError ? true : false}
      onChange={(event) => {
        if (onChangeText) onChangeText(event.target.value);
        if (props.onChange) props.onChange(event);
      }}
      {...rest}
    />
  );
}
