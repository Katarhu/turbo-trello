import { TextField, BaseTextFieldProps } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface ValidatedInputFieldProps extends Omit<BaseTextFieldProps, "error"> {
  error: FieldError;
  register: UseFormRegisterReturn;
  label: string;
}

export const ValidatedInputField = ({ error, register, label, ...props }: ValidatedInputFieldProps) => {
  return (
    <TextField
      error={error ? true : false}
      label={label}
      {...register}
      {...props}
      helperText={error ? error.message : " "}
    />
  );
};
