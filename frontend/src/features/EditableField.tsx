import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { Box, FormControl, Input, Stack, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import { useForm } from "react-hook-form";

import { useBooleanToggle } from "../hooks/useBooleanToggle.ts";

interface EditableFieldProps {
  value: string;
  onEdit: (data: EditableFieldForm) => void;
}

export interface EditableFieldForm {
  value: string;
}

export const EditableField = ({ value, onEdit }: EditableFieldProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditableFieldForm>({
    values: {
      value,
    },
  });
  const [isEditing, toggleEditing, setIsEditing] = useBooleanToggle();

  const onSubmit = (data: EditableFieldForm) => {
    onEdit(data);

    setIsEditing(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {!isEditing ? (
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>{value}</Typography>
          <IconButton onClick={() => toggleEditing()}>
            <EditIcon color="action" />
          </IconButton>
        </Stack>
      ) : (
        <Stack direction="row" gap={1} component="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl error={!!errors.text} fullWidth>
            <Input {...register("value")} required />
          </FormControl>
          <IconButton onClick={() => setIsEditing(false)}>
            <CloseIcon color="error" />
          </IconButton>
          <IconButton type="submit">
            <CheckIcon color="success" />
          </IconButton>
        </Stack>
      )}
    </Box>
  );
};
