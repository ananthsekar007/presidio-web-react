import React, { CSSProperties } from "react";
import {
  Button,
  ButtonProps,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { CloseOutlined } from "@mui/icons-material";

interface CustomProps {
  loading?: boolean;
}

export function UIPrimaryButton(props: CustomProps & Partial<ButtonProps>) {
  const { loading, ...rest } = props;
  return (
    <Button
      color={props.color || "primary"}
      variant={props.variant || "contained"}
      startIcon={loading ? <CircularProgress size={15} /> : ""}
      {...rest}
      disabled={loading || props.disabled}
    >
      {props.children}
    </Button>
  );
}

interface HTMLButtonProps {
  className?: string;
  icon?: string;
  buttonStyle?: CSSProperties;
  iconStyle?: CSSProperties;
  name?: string;
  onClick?: (arg0: any) => void;
  id?: string;
  loading?: boolean;
  disabled?: boolean;
}

export function HTMLButton(props: HTMLButtonProps) {
  const className = props.className || "btn btn-primary";
  return (
    <button
      id={props.id}
      className={className}
      style={{
        height: 48,
        marginRight: 14,
        padding: 10,
        marginLeft: 0,
        ...props.buttonStyle,
      }}
      onClick={props?.onClick}
      disabled={props?.disabled}
    >
      {props.icon && (
        <span>
          <i
            className={`${props.icon}`}
            style={{
              fontSize: 18,
              color: "white",
              margin: 5,
              ...props.iconStyle,
            }}
          ></i>
        </span>
      )}
      {props.loading && <CircularProgress size={15} color="inherit" />}
      {props.name && " " + props?.name}
    </button>
  );
}

interface CloseButtonProps {
  key?: number | string;
  onClick?: () => void;
  backgroundColor?: string;
  color?: string;
  disabled?: boolean;
}

export const CloseButton = (props: CloseButtonProps) => {
  return (
    <IconButton
      disabled={props?.disabled}
      key={props?.key || "close-button"}
      onClick={props?.onClick}
      style={{
        backgroundColor: props?.backgroundColor || "#3f51b5",
        color: props?.color || "white",
      }}
    >
      <CloseOutlined />
    </IconButton>
  );
};
