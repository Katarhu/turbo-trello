import { Alert } from "@mui/material";

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return <Alert severity="error">{message}</Alert>;
};
