import { Body, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards } from "@nestjs/common";

import { IUserPayload } from "~common/application/interfaces/IUserPayload";
import { TokenGuard } from "~common/guards/TokenGuard";
import { RequestParams } from "~common/presentation/RequestParams";
import { ICreateListCommand } from "~features/list/application/commands/CreateListCommand/ICreateListCommand";
import { IDeleteListCommand } from "~features/list/application/commands/DeleteListCommand/IDeleteListCommand";
import { IUpdateListCommand } from "~features/list/application/commands/UpdateListCommand/IUpdateListCommand";
import { IGetListQuery } from "~features/list/application/queries/GetListQuery/IGetListQuery";
import { IGetListsQuery } from "~features/list/application/queries/GetListsQuery/IGetListsQuery";
import { CreateListRequest } from "~features/list/application/requests/CreateListRequest";
import { GetListsRequest } from "~features/list/application/requests/GetListsRequest";
import { UpdateListRequest } from "~features/list/application/requests/UpdateListRequest";
import { ListCommandToken, ListQueryToken } from "~features/list/diTokens";
import { TokenPayload } from "~utils/decorators/TokenPayloadDecorator";

@Controller("/lists")
export class ListController {
  @Inject(ListCommandToken.CREATE_LIST_COMMAND)
  private _createListCommand: ICreateListCommand;

  @Inject(ListCommandToken.UPDATE_LIST_COMMAND)
  private _updateListCommand: IUpdateListCommand;

  @Inject(ListCommandToken.DELETE_LIST_COMMAND)
  private _deleteListCommand: IDeleteListCommand;

  @Inject(ListQueryToken.GET_LIST_QUERY)
  private _getListQuery: IGetListQuery;

  @Inject(ListQueryToken.GET_LISTS_QUERY)
  private _getListsQuery: IGetListsQuery;

  @UseGuards(TokenGuard)
  @Post()
  async createList(@Body() createListRequest: CreateListRequest, @TokenPayload() user: IUserPayload) {
    return await this._createListCommand.execute({
      title: createListRequest.title,
      boardId: createListRequest.boardId,
      userId: user.id,
    });
  }

  @UseGuards(TokenGuard)
  @Delete("/:id")
  async deleteList(@Param() params: RequestParams, @TokenPayload() user: IUserPayload) {
    return await this._deleteListCommand.execute({
      id: params.id,
      userId: user.id,
    });
  }

  @UseGuards(TokenGuard)
  @Put("/:id")
  async updateList(
    @Param() params: RequestParams,
    @Body() updateListRequest: UpdateListRequest,
    @TokenPayload() user: IUserPayload
  ) {
    return await this._updateListCommand.execute({
      id: params.id,
      title: updateListRequest.title,
      userId: user.id,
    });
  }

  @UseGuards(TokenGuard)
  @Get("/:id")
  async getList(@Param() params: RequestParams, @TokenPayload() user: IUserPayload) {
    return await this._getListQuery.execute({
      id: params.id,
      userId: user.id,
    });
  }

  @UseGuards(TokenGuard)
  @Post()
  async getLists(@Body() getListsRequest: GetListsRequest, @TokenPayload() user: IUserPayload) {
    return await this._getListsQuery.execute({
      boardId: getListsRequest.boardId,
      userId: user.id,
    });
  }
}
