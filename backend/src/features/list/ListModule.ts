import { Module } from "@nestjs/common";

import { BoardModule } from "~features/board/BoardModule";
import { CreateListCommand } from "~features/list/application/commands/CreateListCommand/CreateListCommand";
import { DeleteListCommand } from "~features/list/application/commands/DeleteListCommand/DeleteListCommand";
import { UpdateListCommand } from "~features/list/application/commands/UpdateListCommand/UpdateListCommand";
import { GetListQuery } from "~features/list/application/queries/GetListQuery/GetListQuery";
import { GetListsQuery } from "~features/list/application/queries/GetListsQuery/GetListsQuery";
import { ListService } from "~features/list/application/services/ListService";
import { ListCommandToken, ListQueryToken, ListRepositoryToken, ListServiceToken } from "~features/list/diTokens";
import { ListRepository } from "~features/list/infrastructure/ListRepository";
import { ListController } from "~features/list/presentation/ListController";
import { PrismaModule } from "~prisma/PrismaModule";
import { createProvider } from "~utils/functions/createProvider";

@Module({
  imports: [PrismaModule, BoardModule],
  controllers: [ListController],
  providers: [
    createProvider(ListServiceToken.LIST_SERVICE, ListService),
    createProvider(ListRepositoryToken.LISTS_REPOSITORY, ListRepository),
    createProvider(ListCommandToken.CREATE_LIST_COMMAND, CreateListCommand),
    createProvider(ListCommandToken.UPDATE_LIST_COMMAND, UpdateListCommand),
    createProvider(ListCommandToken.DELETE_LIST_COMMAND, DeleteListCommand),
    createProvider(ListQueryToken.GET_LIST_QUERY, GetListQuery),
    createProvider(ListQueryToken.GET_LISTS_QUERY, GetListsQuery),
  ],
})
export class ListModule {}
