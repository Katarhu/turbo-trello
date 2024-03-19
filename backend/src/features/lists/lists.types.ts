import { RequestWithToken } from "~core/types/request.types";

import { AccessBoardDto } from "./dto/access.board.dto";

type ListRequestBody = RequestWithToken["body"] & AccessBoardDto;

export interface ListRequest extends RequestWithToken {
  body: ListRequestBody;
}
