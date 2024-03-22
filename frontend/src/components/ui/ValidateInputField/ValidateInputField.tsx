import { TextField, TextFieldProps } from "@mui/material";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface ValidatedInputFieldProps extends Omit<TextFieldProps, "error"> {
  error?: FieldError;
  register: UseFormRegisterReturn;
  label: string;
}

export const ValidatedInputField = ({ error, register, label, ...props }: ValidatedInputFieldProps) => {
  const { t: translate } = useTranslation();
  return (
    <>
      <TextField
        error={error ? true : false}
        label={label}
        {...register}
        {...props}
        helperText={error ? translate(error?.message as string) : " "}
      />
    </>
  );
};
