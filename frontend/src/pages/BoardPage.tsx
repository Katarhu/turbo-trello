import AddIcon from "@mui/icons-material/Add";
import { IconButton, Stack, Typography, Box } from "@mui/material";
import { observer } from "mobx-react";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
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
  const { taskStore, listStore } = useStore();
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

  const onDragEnd = (result: DropResult) => {
    console.log("result.type: ", result.type);
    console.log("!result.destination?.droppableId: ", result.destination?.droppableId);
    if (!result.destination?.droppableId) return;
    // if (result.type === "COLUMN") {
    //   listStore.setChangedList(
    //     Number(result.source.droppableId),
    //     Number(result.destination.droppableId),
    //     Number(result.draggableId),
    //     boardId
    //   );
    // }
    if (result.type === "TASK") {
      console.log("oldListId: ", result.source.droppableId);
      console.log("newListId: ", result.destination.droppableId);
      console.log("id: ", result.draggableId);
      taskStore.changeTaskList({
        oldListId: Number(result.source.droppableId),
        id: Number(result.destination.droppableId),
        listId: Number(result.draggableId),
      });
    }
  };

  // const onDragListEnd = (result: DropResult) => {
  //   console.log("result: ", result);
  // };

  return (
    <Stack sx={componentSx.container} gap={4}>
      <Stack direction="row" gap="2rem" alignItems="center">
        <Typography variant="h2">{t("LISTS.TITLE")}</Typography>
        <IconButton onClick={onAddList}>
          <AddIcon />
        </IconButton>
      </Stack>
      <DragDropContext onDragEnd={onDragEnd}>
        {/* <Stack gap={4} direction="row" sx={componentSx.listsContainer}> */}
        <Box sx={{ display: "inline-flex" }}>
          <DragDropContext onDragEnd={onDragEnd}>
            {listStore.getMappableLists(boardId).map((list, index) => (
              // <Droppable
              //   key={list.id}
              //   droppableId={list.id.toString()}
              //   direction="horizontal"
              //   type="COLUMN"
              //   ignoreContainerClipping={true}
              //   isCombineEnabled={true}
              // >
              //   {(provided, snapshot) => (
              //     <div ref={provided.innerRef} {...provided.droppableProps}>
              <List
                {...list}
                key={list.id}
                // isDraggingOver={snapshot.isDraggingOver}
                index={index}
              />
              //   </div>
              // )}
              // </Droppable>
            ))}
          </DragDropContext>
        </Box>
        {/* </Stack> */}
      </DragDropContext>
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
