import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Stack } from "@mui/material";
import { observer } from "mobx-react";
import { useTranslation } from "react-i18next";

import { useNotification } from "../context/NotificationContext.tsx";
import { useStore } from "../context/StoreContext.tsx";
import { EditableField, EditableFieldForm } from "~features/EditableField.tsx";
import { IList } from "~types/List.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";

export const List = observer(({ title, id, boardId }: IList) => {
  const { t } = useTranslation();
  const { listStore } = useStore();
  const { createNotification } = useNotification();

  const onSuccessfulListUpdate = () => {
    createNotification(t("LISTS.NOTIFICATION_UPDATED"));
  };

  const onListUpdate = (formData: EditableFieldForm) => {
    if (formData.value === title) return;

    listStore.updateList(
      {
        id,
        title: formData.value,
      },
      onSuccessfulListUpdate
    );
  };

  const onAddTask = () => {};

  const onSuccessfulListDelete = () => {
    createNotification(t("LISTS.NOTIFICATION_DELETED"));
  };

  const onListDelete = () => {
    listStore.deleteList({ id, boardId }, onSuccessfulListDelete);
  };

  return (
    <Box sx={componentSx.container}>
      <Stack direction="row" sx={componentSx.header}>
        <EditableField value={title} onEdit={onListUpdate} />
        <IconButton onClick={onAddTask}>
          <AddIcon color="success" />
        </IconButton>
        <IconButton onClick={onListDelete}>
          <DeleteIcon color="error" />
        </IconButton>
      </Stack>
    </Box>
  );
});

const componentSx = createSxStyles({
  container: {
    width: "100%",
    maxWidth: "30rem",
    flexShrink: 0,
    flexGrow: 0,
    flexBasis: "30rem",
  },
  header: {
    maxWidth: "100%",
    backgroundColor: "#EDEDED",
    paddingInline: "1rem",
    paddingBlock: "0.5rem",
    borderRadius: "0.5rem",
  },
});
