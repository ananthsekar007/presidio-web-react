import { OutlinedTextFieldProps } from "@mui/material";
import React from "react";
import { UITextField } from "./UITextField";

interface Props {
  maxLength?: number;
  value?: string;
  onChange?: (event: any) => void;
  disabled?: boolean;
  hideHelperText?: boolean;
}

export function UITextArea(props: Props & OutlinedTextFieldProps) {
  return (
    <UITextField
      disabled={props?.disabled}
      value={props?.value}
      onChange={props?.onChange}
      inputProps={{
        maxLength: props?.maxLength,
      }}
      fullWidth
      //   error={
      //     props.maxLength && (props.maxLength - (props?.value?.length || 0) <= 0)
      //   }
      helperText={
        props.maxLength &&
        `${props.maxLength - (props?.value?.length || 0)} characters remaining`
      }
      {...props}
    />
  );
}
