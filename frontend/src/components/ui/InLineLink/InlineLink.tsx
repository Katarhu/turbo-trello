import { Typography, TypographyOwnProps, TypographyProps } from "@mui/material";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface InlineLinkProps extends TypographyProps {
  children?: ReactNode;
  to: string;
  sx?: TypographyOwnProps;
}

export const InlineLink = ({ children, to, sx, ...props }: InlineLinkProps) => {
  return (
    <Typography
      component={NavLink}
      to={to}
      sx={{ display: "inline", textDecoration: "underline", color: "#3366CC", ...sx }}
      {...props}
    >
      {children}
    </Typography>
  );
};
