import AddIcon from "@mui/icons-material/Add";
import { IconButton, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";

import { useModal } from "../context/ModalContext.tsx";
import { ModalType } from "../context/ModalContextTypes.ts";
import { useStore } from "../context/StoreContext.tsx";
import { List } from "~features/List.tsx";
import { Routes } from "~router/constants.ts";
import { createSxStyles } from "~utils/createSxStyles.ts";

export const BoardPage = observer(() => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { listStore } = useStore();
  const { id } = useParams();
  const { openModal } = useModal();

  const boardId = Number(id);

  const onGetBoardsSuccess = () => {};

  const onGetBoardsFailure = () => {
    navigate(Routes.MAIN_BOARDS);
  };

  useEffect(() => {
    if (!boardId) onGetBoardsFailure();

    listStore.getLists(boardId, onGetBoardsSuccess, onGetBoardsFailure);
  }, []);

  const onAddList = () => {
    openModal({ type: ModalType.CREATE_LIST, props: { boardId } });
  };

  return (
    <Stack sx={componentSx.container} gap={4}>
      <Stack direction="row" gap="2rem" alignItems="center">
        <Typography variant="h2">{t("LISTS.TITLE")}</Typography>
        <IconButton onClick={onAddList}>
          <AddIcon />
        </IconButton>
      </Stack>

      <Stack gap={4} direction="row" sx={componentSx.listsContainer}>
        {listStore.getMappableLists(boardId).map((list) => (
          <List key={list.id} {...list} />
        ))}
      </Stack>
    </Stack>
  );
});

const componentSx = createSxStyles({
  container: {
    paddingBlock: "2rem",
    minHeight: "100%",
  },
  listsContainer: {
    overflowX: "scroll",
    flexGrow: 1,
  },
});
